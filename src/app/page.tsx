import { Metadata } from "next";
import HomeTwoPage from "./(homes)/home-2/page";

export const metadata: Metadata = {
  title: "Shalom.js — Designed to move. Built to last.",
};

export default function Home() {
  return (
    <>
      <HomeTwoPage />
    </>
  );
}
