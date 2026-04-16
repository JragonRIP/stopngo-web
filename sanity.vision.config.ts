/**
 * Run with: npx sanity dev --config sanity.vision.config.ts
 * Embeddable /studio omits Vision to satisfy Next.js 16 SSR; use this locally for GROQ.
 */
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "edelweiss-coffee-vision",
  title: "Edelweiss Coffee (Vision)",
  projectId: projectId || "missing-project-id",
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
