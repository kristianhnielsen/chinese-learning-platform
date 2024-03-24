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
import { getAuthUser, signOut } from "../lib/auth";

export default async function SideNav() {
  const authUser = await getAuthUser();
  return (
    <nav className="sticky top-0 flex max-h-dvh min-h-full flex-col items-center gap-4 border-r-4 border-light p-4 text-light transition-all">
      <SideNavLink
        href="/"
        className="flex w-auto flex-col gap-0 p-1 leading-tight outline-none outline-2 outline-primary"
      >
        <span>易字</span>
        <span>词典</span>
      </SideNavLink>
      <SideNavLink href="/">
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
      <div className="mt-auto grid gap-4">
        <SideNavLink href={"/account"}>
          <FaCircleUser
            className={twMerge(
              "h-full w-full rounded-full border-2 p-0.5",
              authUser ? "border-cyan-800" : "border-yellow-500",
            )}
          />
        </SideNavLink>
        {authUser && (
          <form
            action={signOut}
            className="group flex aspect-square w-12 items-center gap-2 rounded p-2 transition-all hover:bg-light/10"
          >
            <button className="w-full">
              <FaRightFromBracket className="h-full w-full transition-all group-hover:fill-red-400" />
            </button>
          </form>
        )}
      </div>
    </nav>
  );
}

function SideNavLink({
  children,
  href,
  className: extClassName,
}: {
  children: React.ReactNode;
  href: Url;
  className?: string;
}) {
  return (
    <Link
      className={twMerge(
        "flex aspect-square w-12 items-center gap-2 rounded p-2 transition-all hover:bg-light/10",
        extClassName,
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
