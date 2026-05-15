import React from "react";
import { Metadata } from "next";
import PortfolioRandomMain from "@/pages/portfolio/portfolio-random-main";

export const metadata: Metadata = {
  title: "Shalom.js - Portfolio Random page",
};

const PortfolioRandomPage = () => {
  return (
    <PortfolioRandomMain/>
  );
};

export default PortfolioRandomPage;
