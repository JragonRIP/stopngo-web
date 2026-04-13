import { menuJumpLinks } from "@/lib/menu-data";

export default function MenuJumpNav() {
  return (
    <nav
      className="mt-10 -mx-4 mb-8 rounded-none border-y border-white/10 bg-black/35 py-3 backdrop-blur-sm sm:mt-12 md:mx-0 md:mb-10 md:rounded-xl md:border md:shadow-md md:shadow-black/15"
      aria-label="Jump to menu section"
    >
      <p className="mb-2.5 px-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-sn-silver md:px-4">
        Jump to section
      </p>
      <div className="flex flex-wrap gap-2 px-4 md:px-3">
        {menuJumpLinks.map(({ id, label }) => (
          <a
            key={id}
            href={`#menu-${id}`}
            className="rounded-full border border-white/15 bg-sn-base/80 px-3.5 py-2 text-xs font-medium text-white/90 shadow-sm shadow-black/20 transition hover:border-sn-gold/45 hover:bg-sn-gold/10 hover:text-white"
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
