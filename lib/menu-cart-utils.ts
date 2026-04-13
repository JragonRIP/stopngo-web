/** Stable cart line id for text-menu items (not Sanity slugs). */
export function slugifyMenuName(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 56);
}

export function textMenuCartId(
  sectionId: string,
  name: string,
  variant?: string
) {
  const base = `${sectionId}::${slugifyMenuName(name)}`;
  return variant ? `${base}::${variant}` : base;
}
