import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { FaArrowDown19, FaBookOpen, FaLanguage } from "react-icons/fa6";

export default function SideNav() {
  return (
    <nav
      className={twMerge(
        "p-4 min-h-full flex flex-col gap-4 transition-all items-center text-light border-r-4 border-light"
      )}
    >
      <SideNavLink className="flex items-center gap-2" href="/">
        <FaLanguage className="h-full w-full" />
      </SideNavLink>

      <SideNavLink href="/most-common">
        <FaArrowDown19 className="h-full w-full" />
      </SideNavLink>
      <SideNavLink href="/hsk" className="font-bold">
        HSK
      </SideNavLink>
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
        "hover:bg-light/10 p-2 rounded w-12 aspect-square transition-all flex items-center gap-2",
        className
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
