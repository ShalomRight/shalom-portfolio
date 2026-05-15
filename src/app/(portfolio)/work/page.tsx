import React from "react";
import { Metadata } from "next";
import WorkMain from "@/pages/portfolio/work-main";
import { getAllProjects } from "@/lib/contentful";

export const metadata: Metadata = {
  title: "Work — Shalom.js",
  description: "Selected projects across brand identity, motion, UI/UX, and front-end development.",
};

export default async function WorkPage() {
  const projects = await getAllProjects();
  return <WorkMain projects={projects} />;
}
