"use client";

import dynamic from "next/dynamic";

const StudioRoot = dynamic(() => import("./StudioRoot"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[50vh] items-center justify-center bg-sn-base text-white/60">
      Loading Studio…
    </div>
  ),
});

export default function StudioGate() {
  return <StudioRoot />;
}
