import type { StoredOrderLine } from "@/lib/order-confirmation-storage";

function formatSize(s?: string) {
  if (!s) return null;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

type Props = {
  lines: StoredOrderLine[];
  className?: string;
  /** Omit outer borders (e.g. when nested inside a bordered card). */
  plain?: boolean;
};

export default function OrderReceiptLines({
  lines,
  className = "",
  plain = false,
}: Props) {
  if (!lines.length) return null;

  const frame = plain
    ? "divide-y divide-white/10 text-left"
    : "divide-y divide-white/10 border-y border-white/10 text-left";

  return (
    <ul className={`${frame} ${className}`}>
      {lines.map((line, idx) => (
        <li key={`${line.name}-${idx}`} className="py-4 first:pt-0 last:pb-0">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-semibold text-white">
              {line.name}
              {line.quantity > 1 ? (
                <span className="ml-2 font-normal text-white/50">
                  × {line.quantity}
                </span>
              ) : null}
            </p>
            <p className="text-sm font-semibold text-sn-gold">
              ${line.lineTotal.toFixed(2)}
            </p>
          </div>
          <ul className="mt-2 space-y-0.5 text-sm text-white/55">
            {formatSize(line.selectedSize) ? (
              <li>Size: {formatSize(line.selectedSize)}</li>
            ) : null}
            {line.selectedFlavor ? (
              <li>Flavor: {line.selectedFlavor}</li>
            ) : null}
            {line.selectedModifiers.map((m) => (
              <li key={m.name}>
                {m.name} (+${m.price.toFixed(2)})
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
