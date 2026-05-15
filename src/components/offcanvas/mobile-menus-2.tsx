'use client';
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mobile_menu_data } from "@/data/menu-data";

export default function MobileMenusTwo() {
  const pathname = usePathname();
  return (
    <nav className="tp-main-menu-content">
      <ul>
        {mobile_menu_data.map((item) => {
          const isActive = pathname === item.link || (item.link !== "/" && pathname?.startsWith(item.link));
          return (
            <li key={item.id} className={isActive ? "active" : ""}>
              <Link href={item.link}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
