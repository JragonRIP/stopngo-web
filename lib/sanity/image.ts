import createImageUrlBuilder from "@sanity/image-url";
const builder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
});

export function urlForImage(
  source: { asset?: { _ref: string } } | undefined
) {
  if (!source?.asset) return null;
  return builder.image(source).width(800).height(800).fit("crop").url();
}
