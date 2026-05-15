import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import WorkDetailMain from "@/pages/portfolio/work-detail-main";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/contentful";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: "Not Found — Shalom.js" };
  return {
    title: `${project.title} — Shalom.js`,
    description: "tagline" in project ? project.tagline : undefined,
  };
}

export default async function WorkDetailPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();
  return <WorkDetailMain project={project} />;
}
