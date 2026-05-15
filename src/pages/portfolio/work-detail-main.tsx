"use client";
import React from "react";
import { PortfolioProject, DetailPageLayout } from "@/data";

// Detail layout templates
import DetailTreeMain from "./detail-layouts/detail-tree-main";
import ShowcaseDetailMain from "./detail-layouts/showcase-detail-main";
import DetailVideoMain from "./detail-layouts/detail-video-main";
import DetailOneMain from "./detail-layouts/detail-one-main";
import DetailTwoMain from "./detail-layouts/detail-two-main";

type Props = { project: PortfolioProject };

/**
 * Routes each project to the correct detail page layout
 * based on project.detailPageLayout.
 *
 * Layout map:
 *   "detail-tree"     → Deep narrative case study (branding, app)
 *   "showcase-detail" → Visual-strong, mid-depth (social, product)
 *   "detail-video"    → Video-primary (film, motion campaign)
 *   "detail-one"      → Many images, no carousel (events, multi-edition)
 *   "detail-two"      → Many images + carousel (app screens)
 */
export default function WorkDetailMain({ project }: Props) {
  const layout: DetailPageLayout =
    project.detailPageLayout ?? (project.detailLevel === "deep" ? "detail-tree" : "showcase-detail");

  switch (layout) {
    case "detail-tree":     return <DetailTreeMain     project={project} />;
    case "showcase-detail": return <ShowcaseDetailMain project={project} />;
    case "detail-video":    return <DetailVideoMain    project={project} />;
    case "detail-one":      return <DetailOneMain      project={project} />;
    case "detail-two":      return <DetailTwoMain      project={project} />;
    default:                return <ShowcaseDetailMain project={project} />;
  }
}
