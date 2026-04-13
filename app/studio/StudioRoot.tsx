"use client";

import { NextStudio } from "next-sanity/studio/client-component";
import config from "@/sanity.config";

export default function StudioRoot() {
  return <NextStudio config={config} />;
}
