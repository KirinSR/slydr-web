"use client";

import { motion } from "framer-motion";
import { pageContent, type SlydrPage } from "@/lib/page-content";

export function RawPage({ page }: { page: SlydrPage }) {
  return (
    <motion.div
      key={page}
      className="page active"
      id={`page-${page}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
      dangerouslySetInnerHTML={{ __html: pageContent[page] }}
    />
  );
}
