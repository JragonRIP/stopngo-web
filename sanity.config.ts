import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "stop-n-go",
  title: "Stop 'N Go 2.0",
  projectId: projectId || "missing-project-id",
  dataset,
  basePath: "/studio",
  // Vision runs in `sanity dev` (sanity.cli.ts); omitting here avoids SSR bundling issues with Next.js 16.
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
