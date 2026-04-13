-- Run this in the Supabase SQL editor (or via supabase db push) before using /api/orders.
-- Daily order numbers: one sequence per calendar day in ORDER_DAY_TZ (set from the app).

create table if not exists public.order_counters (
  day date primary key,
  last_seq bigint not null default 0
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_day date not null,
  order_number integer not null,
  customer_name text,
  customer_email text,
  pickup_time text,
  items jsonb not null default '[]'::jsonb,
  square_order_id text not null,
  square_payment_id text,
  created_at timestamptz not null default now(),
  unique (square_order_id),
  unique (order_day, order_number)
);

create index if not exists orders_order_day_idx on public.orders (order_day);

alter table public.orders enable row level security;

-- No policies: only the service role (bypasses RLS) may read/write from the app server.

create or replace function public.create_store_order(
  p_square_order_id text,
  p_square_payment_id text,
  p_customer_name text,
  p_customer_email text,
  p_pickup_time text,
  p_items jsonb,
  p_tz text
)
returns table (order_number integer, order_day date, inserted boolean)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_existing integer;
  v_day date;
  v_num integer;
  v_tz text;
begin
  if p_square_order_id is null or length(trim(p_square_order_id)) = 0 then
    raise exception 'square_order_id required';
  end if;

  perform pg_advisory_xact_lock(hashtext(p_square_order_id));

  select o.order_number into v_existing
  from public.orders o
  where o.square_order_id = p_square_order_id;

  if v_existing is not null then
    return query
    select o.order_number, o.order_day, false
    from public.orders o
    where o.square_order_id = p_square_order_id
    limit 1;
    return;
  end if;

  v_tz := coalesce(nullif(trim(p_tz), ''), 'UTC');

  v_day := (now() at time zone v_tz)::date;

  insert into public.order_counters as oc (day, last_seq)
  values (v_day, 1)
  on conflict (day) do update
  set last_seq = public.order_counters.last_seq + 1
  returning oc.last_seq into v_num;

  insert into public.orders (
    order_day,
    order_number,
    customer_name,
    customer_email,
    pickup_time,
    items,
    square_order_id,
    square_payment_id
  )
  values (
    v_day,
    v_num,
    nullif(trim(p_customer_name), ''),
    nullif(trim(p_customer_email), ''),
    nullif(trim(p_pickup_time), ''),
    coalesce(p_items, '[]'::jsonb),
    p_square_order_id,
    nullif(trim(p_square_payment_id), '')
  );

  return query select v_num, v_day, true;
end;
$$;

revoke all on function public.create_store_order(text, text, text, text, text, jsonb, text) from public;
grant execute on function public.create_store_order(text, text, text, text, text, jsonb, text) to service_role;

grant select, insert, update, delete on public.orders to service_role;
grant select, insert, update, delete on public.order_counters to service_role;
revoke all on public.orders from anon, authenticated;
revoke all on public.order_counters from anon, authenticated;
