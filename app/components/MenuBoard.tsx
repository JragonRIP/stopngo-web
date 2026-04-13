import {
  formatPrice,
  textMenuSections,
  type DualRow,
  type SingleRow,
  type SizedRow,
  type TextMenuSection,
} from "@/lib/menu-data";
import FadeInView from "./FadeInView";
import {
  MenuDualRowCart,
  MenuSingleRowCart,
  MenuSizedRowCart,
} from "./menu/MenuTextAddToCart";
import { MenuSectionIcon, sectionAccentClass } from "./menu/MenuSectionVisuals";

function SizedRows({
  rows,
  sectionId,
}: {
  rows: SizedRow[];
  sectionId: string;
}) {
  return (
    <>
      <div className="mt-4 hidden md:block">
        <div className="grid grid-cols-[1fr_4.5rem_4.5rem_4.5rem] gap-x-4 rounded-t-lg border border-white/10 border-b-0 bg-gradient-to-r from-white/[0.06] via-white/[0.03] to-transparent px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-sn-silver">
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-sn-gold/60" aria-hidden />
            Item
          </span>
          <span className="text-right">Small</span>
          <span className="text-right">Med</span>
          <span className="text-right">Large</span>
        </div>
        <ul className="divide-y divide-white/10 rounded-b-lg border border-white/10 border-t-0 bg-black/15">
          {rows.map((row) => (
            <li
              key={row.name}
              className="px-3 py-3.5 text-sm transition-colors hover:bg-white/[0.03]"
            >
              <div className="grid grid-cols-[1fr_4.5rem_4.5rem_4.5rem] gap-x-4">
                <div className="min-w-0 pr-2">
                  <p className="font-medium text-white">{row.name}</p>
                  {row.description ? (
                    <p className="mt-0.5 text-xs leading-relaxed text-white/55">
                      {row.description}
                    </p>
                  ) : null}
                  {row.notes?.map((n) => (
                    <p key={n} className="mt-1 flex items-start gap-1.5 text-xs text-sn-gold/90">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sn-gold/70" aria-hidden />
                      <span>{n}</span>
                    </p>
                  ))}
                </div>
                <span className="text-right font-medium tabular-nums text-white/95">
                  {formatPrice(row.small)}
                </span>
                <span className="text-right font-medium tabular-nums text-white/95">
                  {formatPrice(row.medium)}
                </span>
                <span className="text-right font-semibold tabular-nums text-sn-gold">
                  {formatPrice(row.large)}
                </span>
              </div>
              <MenuSizedRowCart
                sectionId={sectionId}
                row={row}
                layout="desktop"
              />
            </li>
          ))}
        </ul>
      </div>
      <ul className="mt-4 space-y-4 md:hidden">
        {rows.map((row) => (
          <li
            key={row.name}
            className="rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-black/25 px-4 py-3 shadow-sm shadow-black/20 ring-1 ring-sn-gold/10"
          >
            <div className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sn-gold/50" aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-white">{row.name}</p>
                {row.description ? (
                  <p className="mt-1 text-xs text-white/55">{row.description}</p>
                ) : null}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg border border-sn-gold/15 bg-black/30 py-2">
                <p className="text-[10px] font-medium uppercase tracking-wide text-sn-silver">
                  Small
                </p>
                <p className="mt-0.5 text-sm font-semibold tabular-nums text-sn-gold">
                  {formatPrice(row.small)}
                </p>
              </div>
              <div className="rounded-lg border border-sn-gold/15 bg-black/30 py-2">
                <p className="text-[10px] font-medium uppercase tracking-wide text-sn-silver">
                  Med
                </p>
                <p className="mt-0.5 text-sm font-semibold tabular-nums text-sn-gold">
                  {formatPrice(row.medium)}
                </p>
              </div>
              <div className="rounded-lg border border-sn-gold/20 bg-sn-gold/5 py-2">
                <p className="text-[10px] font-medium uppercase tracking-wide text-sn-silver">
                  Large
                </p>
                <p className="mt-0.5 text-sm font-semibold tabular-nums text-sn-gold">
                  {formatPrice(row.large)}
                </p>
              </div>
            </div>
            {row.notes?.map((n) => (
              <p key={n} className="mt-2 border-t border-white/10 pt-2 text-xs text-sn-gold/90">
                {n}
              </p>
            ))}
            <MenuSizedRowCart
              sectionId={sectionId}
              row={row}
              layout="mobile"
            />
          </li>
        ))}
      </ul>
    </>
  );
}

function SingleRows({
  rows,
  sectionId,
}: {
  rows: SingleRow[];
  sectionId: string;
}) {
  return (
    <ul className="mt-4 divide-y divide-white/10 border-t border-white/10">
      {rows.map((row) => (
        <li
          key={row.name}
          className="flex flex-col gap-3 py-4 transition-colors hover:bg-white/[0.02] sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:px-1"
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sn-gold/45" aria-hidden />
              <div>
                <p className="font-medium text-white">{row.name}</p>
                {row.description ? (
                  <p className="mt-1 text-sm leading-relaxed text-white/55">
                    {row.description}
                  </p>
                ) : null}
                {row.notes?.map((n) => (
                  <p key={n} className="mt-2 text-xs text-white/50">
                    {n}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
            <p className="self-start rounded-lg border border-sn-gold/20 bg-sn-gold/10 px-3 py-1.5 text-lg font-semibold tabular-nums text-sn-gold sm:self-end sm:py-1 sm:text-base">
              {formatPrice(row.price)}
            </p>
            <MenuSingleRowCart sectionId={sectionId} row={row} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function DualRows({
  rows,
  sectionId,
}: {
  rows: DualRow[];
  sectionId: string;
}) {
  return (
    <ul className="mt-4 divide-y divide-white/10 border-t border-white/10">
      {rows.map((row) => (
        <li key={row.name} className="py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 flex-1 items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sn-red/50" aria-hidden />
              <div>
                <p className="font-medium text-white">{row.name}</p>
                {row.description ? (
                  <p className="mt-1 text-sm leading-relaxed text-white/55">
                    {row.description}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:min-w-[14rem]">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 sm:justify-end sm:gap-6">
                  <span className="text-xs text-white/60">{row.leftLabel}</span>
                  <span className="font-semibold tabular-nums text-sn-gold">
                    {formatPrice(row.leftPrice)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 rounded-lg border border-sn-gold/15 bg-sn-gold/5 px-3 py-2 sm:justify-end sm:gap-6">
                  <span className="text-xs text-white/60">{row.rightLabel}</span>
                  <span className="font-semibold tabular-nums text-sn-gold">
                    {formatPrice(row.rightPrice)}
                  </span>
                </div>
              </div>
              <MenuDualRowCart sectionId={sectionId} row={row} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function SectionBlock({ section, index }: { section: TextMenuSection; index: number }) {
  const hasSized = section.sized && section.sized.length > 0;
  const hasSingles = section.singles && section.singles.length > 0;
  const hasDuals = section.duals && section.duals.length > 0;
  const accent = sectionAccentClass(section.id);

  return (
    <FadeInView delayMs={index * 45}>
      <section
        id={`menu-${section.id}`}
        className={`relative scroll-mt-28 overflow-hidden rounded-2xl border border-white/10 border-l-4 bg-black/30 p-5 shadow-lg shadow-black/25 sm:p-7 ${accent}`}
      >
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-sn-gold/[0.04] blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-sn-red/[0.05] blur-3xl"
          aria-hidden
        />

        <div className="relative flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="flex items-center gap-4">
            <MenuSectionIcon sectionId={section.id} />
            <div>
              <h2 className="text-lg font-semibold tracking-wide text-white sm:text-xl">
                {section.title}
              </h2>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.2em] text-sn-silver/90">
                Stop &apos;N Go 2.0
              </p>
            </div>
          </div>
          <div className="hidden h-px flex-1 max-w-[8rem] bg-gradient-to-r from-sn-gold/40 to-transparent sm:block" aria-hidden />
        </div>

        {section.intro ? (
          <p className="relative mt-4 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2.5 text-sm leading-relaxed text-white/70">
            {section.intro}
          </p>
        ) : null}

        {hasSized ? (
          <SizedRows rows={section.sized!} sectionId={section.id} />
        ) : null}

        {section.afterSized ? (
          <p className="relative mt-4 border-t border-white/10 pt-4 text-sm leading-relaxed text-white/65">
            {section.afterSized}
          </p>
        ) : null}

        {section.subitems && section.subitems.length > 0 ? (
          <ul className="relative mt-4 space-y-2.5 border-t border-white/10 pt-4">
            {section.subitems.map((s) => (
              <li key={s.name} className="flex gap-2 text-sm">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sn-red/60" aria-hidden />
                <span>
                  <span className="font-medium text-white">{s.name}</span>
                  {s.detail ? (
                    <span className="text-white/55">: {s.detail}</span>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        {hasSingles ? (
          <SingleRows rows={section.singles!} sectionId={section.id} />
        ) : null}
        {hasDuals ? (
          <DualRows rows={section.duals!} sectionId={section.id} />
        ) : null}

        {section.bullets && section.bullets.length > 0 ? (
          <ul className="relative mt-4 list-none space-y-2 border-t border-white/10 pt-4 text-sm text-white/65">
            {section.bullets.map((b) => (
              <li key={b} className="flex gap-2 leading-relaxed">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sn-silver/60" aria-hidden />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {section.flavors && section.flavors.length > 0 ? (
          <div className="relative mt-4 rounded-xl border border-white/10 bg-gradient-to-b from-black/40 to-black/20 p-4 ring-1 ring-inset ring-white/5 sm:p-5">
            <div className="mb-3 border-b border-white/10 pb-3">
              <span className="rounded-md bg-sn-gold/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-sn-gold">
                Flavors
              </span>
              <p className="mt-2 max-w-xl text-xs leading-relaxed text-white/55">
                <span className="font-medium text-sn-silver">SF</span> means
                sugar free is available for that flavor.
              </p>
            </div>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
              {section.flavors.map((f) => (
                <li
                  key={f.name}
                  className="flex items-baseline gap-2 border-b border-white/[0.04] pb-2 text-white/85 last:border-0 sm:border-0 sm:pb-0"
                >
                  <span className="h-1 w-1 shrink-0 rounded-full bg-sn-gold/35" aria-hidden />
                  <span>{f.name}</span>
                  {f.sugarFree ? (
                    <span className="ml-auto shrink-0 rounded bg-white/10 px-1.5 py-px text-[10px] font-medium uppercase tracking-wide text-sn-silver sm:ml-0">
                      SF
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
    </FadeInView>
  );
}

export default function MenuBoard() {
  return (
    <div className="relative mt-10 flex flex-col gap-8 sm:mt-12 sm:gap-10">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(100%,28rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-sn-gold/25 to-transparent"
        aria-hidden
      />
      {textMenuSections.map((section, i) => (
        <SectionBlock key={section.id} section={section} index={i} />
      ))}
    </div>
  );
}
