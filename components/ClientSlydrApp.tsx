"use client";

import dynamic from "next/dynamic";

const SlydrApp = dynamic(
  () => import("@/components/SlydrApp").then((module) => module.SlydrApp),
  {
    ssr: false,
  },
);

export function ClientSlydrApp() {
  return <SlydrApp />;
}
