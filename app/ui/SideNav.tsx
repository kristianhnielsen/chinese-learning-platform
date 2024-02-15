import type { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import {
  FaArrowDown19,
  FaBookOpen,
  FaCircleUser,
  FaLanguage,
  FaRightFromBracket,
  FaUser,
} from "react-icons/fa6";
import { signOut } from "../lib/auth";

export default function SideNav() {
  return (
    <nav
      className={twMerge(
        "p-4 min-h-full flex flex-col gap-4 transition-all items-center text-light border-r-4 border-light"
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
      <form
        action={signOut}
        className="hover:bg-light/10 p-2 mt-auto rounded w-12 group aspect-square transition-all flex items-center gap-2"
      >
        <button className="w-full">
          <FaRightFromBracket className="h-full w-full group-hover:fill-red-500/50 transition-all" />
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
        "hover:bg-light/10 p-2 rounded w-12 aspect-square transition-all flex items-center gap-2",
        className
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
