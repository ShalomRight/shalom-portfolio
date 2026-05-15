import React from "react";
import { Metadata } from "next";
import WorkLogosMain from "@/pages/portfolio/work-logos-main";
import { getGalleryPage } from "@/lib/contentful";

export const metadata: Metadata = {
  title: "Logos — Shalom.js",
  description: "Logo and mark-making work across clients and industries.",
};

export default async function WorkLogosPage() {
  const gallery = await getGalleryPage("logos");
  return <WorkLogosMain gallery={gallery} />;
}
