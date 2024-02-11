"use client";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  Fa1,
  Fa2,
  Fa3,
  Fa4,
  Fa5,
  Fa6,
  FaA,
  FaArrowDown19,
  FaBookOpen,
  FaLanguage,
} from "react-icons/fa6";

export default function SideNav() {
  const [menuVisible, setMenuVisible] = useState(true);
  return (
    <nav
      data-visible={menuVisible}
      className={twMerge(
        "p-4 min-h-full flex flex-col gap-4 transition-all items-center text-light border-r-4 border-light",
        !menuVisible && "w-4"
      )}
    >
      <SideNavLink className="flex items-center gap-2" href="/">
        <FaLanguage className="h-8 w-8" />
      </SideNavLink>
      <div className="grid gap-2">
        <p className="flex gap-1 border-b-2 border-light/50">
          <FaA className="h-8 w-8" />
        </p>
        <div className="grid gap-4 justify-center">
          <SideNavLink href="/most-common">
            <FaArrowDown19 />
          </SideNavLink>
          <SideNavLink href="/hsk-1">
            <Fa1 />
          </SideNavLink>
          <SideNavLink href="/hsk-2">
            <Fa2 />
          </SideNavLink>
          <SideNavLink href="/hsk-3">
            <Fa3 />
          </SideNavLink>
          <SideNavLink href="/hsk-4">
            <Fa4 />
          </SideNavLink>
          <SideNavLink href="/hsk-5">
            <Fa5 />
          </SideNavLink>
          <SideNavLink href="/hsk-6">
            <Fa6 />
          </SideNavLink>
        </div>
      </div>
    </nav>
  );
}

function SideNavLink({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: Url;
  className?: string;
}) {
  return (
    <Link
      className={twMerge(
        "hover:bg-light/10 rounded transition-all flex items-center gap-2",
        className
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
