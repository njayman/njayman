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
          <li key={idx} className="m-2">
            <Link
              href={route.href}
              className={clsx(
                "flex h-12 w-12 items-center justify-center rounded transition-all duration-300 ease-in-out hover:bg-gray-50 hover:text-emerald-400",
                {
                  "border-2 border-emerald-400": isActive(route.href),
                },
              )}
            >
              {route.icon}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
