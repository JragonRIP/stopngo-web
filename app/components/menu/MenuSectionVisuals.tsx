import type { ReactNode } from "react";

const iconClass = "h-6 w-6 text-sn-gold";

function IconCupSizes() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 19h12M8 19V9l1-4h6l1 4v10M9 5h6"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 22h14"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        opacity={0.5}
      />
    </svg>
  );
}

function IconHotCoffee() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 8h8a3 3 0 013 3v1a4 4 0 01-4 4H8a4 4 0 01-4-4V8z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <path
        d="M17 11h1a2 2 0 012 2v0a2 2 0 01-2 2h-1M10 5s0-2 2-2M13 4s1-2 3-1"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconSpecialty() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 10h8v8a2 2 0 01-2 2h-4a2 2 0 01-2-2v-8z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <path
        d="M8 10V8a4 4 0 014-4v0a4 4 0 014 4v2"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <path
        d="M12 6v2"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconAddons() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle
        cx={12}
        cy={12}
        r={9}
        stroke="currentColor"
        strokeWidth={1.5}
        opacity={0.35}
      />
      <path
        d="M12 8v8M8 12h8"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconBeverage() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 4h8l-1 14a2 2 0 01-2 2h-2a2 2 0 01-2-2L8 4z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <path
        d="M6 4h12"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconEnergy() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M13 2L4 14h7l-1 8 10-14h-7l0-6z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconFlavors() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3c2 3 6 4 6 9a6 6 0 11-12 0c0-5 4-6 6-9z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <path
        d="M12 12v4M10 14h4"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconBreakfast() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle
        cx={12}
        cy={12}
        r={4}
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        opacity={0.45}
      />
    </svg>
  );
}

function IconFood() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 11h14v2a4 4 0 01-4 4H9a4 4 0 01-4-4v-2z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <path
        d="M8 11V7a2 2 0 114 0v4M7 7h10"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ICONS: Record<string, () => ReactNode> = {
  "cup-sizes": IconCupSizes,
  "hot-drinks": IconHotCoffee,
  "specialty-lattes": IconSpecialty,
  "drink-add-ons": IconAddons,
  "general-beverages": IconBeverage,
  "energy-drinks": IconEnergy,
  "flavor-list": IconFlavors,
  breakfast: IconBreakfast,
  food: IconFood,
};

/** Left border accent per section (Tailwind classes) */
export function sectionAccentClass(id: string): string {
  switch (id) {
    case "energy-drinks":
      return "border-l-sn-red/70";
    case "food":
      return "border-l-sn-red/50";
    case "flavor-list":
      return "border-l-sn-gold/50";
    case "drink-add-ons":
      return "border-l-sn-silver/40";
    case "cup-sizes":
    case "general-beverages":
      return "border-l-sn-silver/50";
    default:
      return "border-l-sn-gold/55";
  }
}

export function MenuSectionIcon({ sectionId }: { sectionId: string }) {
  const Icon = ICONS[sectionId] ?? IconBeverage;
  return (
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sn-gold/[0.18] via-sn-gold/[0.06] to-transparent shadow-inner shadow-black/20 ring-1 ring-sn-gold/25"
      aria-hidden
    >
      <Icon />
    </span>
  );
}
