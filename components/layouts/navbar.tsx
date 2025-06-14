"use client";
import React from "react";
import { Briefcase, Code, HomeIcon, NotebookPen, Wrench } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return (
      pathname.endsWith(href) || (href.includes(pathname) && pathname !== "/")
    );
  };

  const liclassnames = (href: string) => {
    return clsx(
      "m-2 transition-all duration-300 ease-in-out hover:bg-gray-50 rounded p-2 hover:text-emerald-400",
      { border: isActive(href) },
    );
  };
  const routes = [
    { href: "/", icon: <HomeIcon /> },
    { href: "/projects", icon: <Code /> },
    { href: "/experiences", icon: <Briefcase /> },
    { href: "/toolbox", icon: <Wrench /> },
    { href: "/thoughts", icon: <NotebookPen /> },
  ];

  return (
    <nav className="flex justify-center m-3">
      <ul className="flex flex-row flex-nowrap mx-auto">
        {routes.map((route, idx) => (
          <Link href={route.href} key={idx}>
            <li key={idx} className={liclassnames(route.href)}>
              {route.icon}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
