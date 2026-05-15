import React from "react";
import { Metadata } from "next";
import BlogListMain from "@/pages/blog/blog-list";

export const metadata: Metadata = {
  title: "Shalom.js - Blog List page",
};

const BlogListPage = () => {
  return (
    <BlogListMain/>
  );
};

export default BlogListPage;
