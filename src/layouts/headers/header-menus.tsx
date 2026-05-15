'use client';
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import menu_data from "@/data/menu-data";

const HeaderMenus = () => {
  const pathname = usePathname();

  return (
    <ul>
      {menu_data.map((item) => {
        const isActive = pathname === item.link || (item.link !== "/" && pathname?.startsWith(item.link));
        return (
          <li key={item.id} className={isActive ? "active" : ""}>
            <Link href={item.link}>{item.title}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default HeaderMenus;
