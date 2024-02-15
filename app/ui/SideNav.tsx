import type { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import {
  FaArrowDown19,
  FaBookOpenReader,
  FaCircleUser,
  FaLanguage,
  FaRightFromBracket,
} from "react-icons/fa6";
import { signOut } from "../lib/auth";

export default function SideNav() {
  return (
    <nav
      className={twMerge(
        "flex min-h-full flex-col items-center gap-4 border-r-4 border-light p-4 text-light transition-all",
      )}
    >
      <SideNavLink href={"/login"}>
        <FaCircleUser className="h-full w-full" />
      </SideNavLink>
      <SideNavLink className="flex items-center gap-2" href="/">
        <FaLanguage className="h-full w-full" />
      </SideNavLink>
      <SideNavLink href="/most-common">
        <FaArrowDown19 className="h-full w-full" />
      </SideNavLink>
      <SideNavLink href="/hsk" className="font-bold">
        HSK
      </SideNavLink>
      <SideNavLink href="/learn">
        <FaBookOpenReader className="h-full w-full" />
      </SideNavLink>
      <form
        action={signOut}
        className="group mt-auto flex aspect-square w-12 items-center gap-2 rounded p-2 transition-all hover:bg-light/10"
      >
        <button className="w-full">
          <FaRightFromBracket className="h-full w-full transition-all group-hover:fill-red-500/50" />
        </button>
      </form>
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
        "flex aspect-square w-12 items-center gap-2 rounded p-2 transition-all hover:bg-light/10",
        className,
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
