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
    <nav className="sticky top-0 flex h-screen max-h-dvh flex-col items-center gap-4 border-r-4 border-light p-2 py-6 text-light transition-all md:p-4">
      <p className="flex aspect-square w-auto flex-col items-center gap-0 rounded p-0 text-xs leading-tight outline-none outline-2 outline-primary md:w-12 md:text-base">
        <span>易字</span>
        <span>词典</span>
      </p>
      <SideNavLink href="/">
        <FaLanguage className="h-full w-full" />
      </SideNavLink>
      <SideNavLink href="/most-common">
        <FaArrowDown19 className="h-full w-full" />
      </SideNavLink>
      <SideNavLink href="/hsk">HSK</SideNavLink>
      <SideNavLink href="/learn">
        <FaBookOpenReader className="h-full w-full" />
      </SideNavLink>
      <div className="mt-auto grid justify-items-center gap-4">
        <SideNavLink href={"/account"}>
          <FaCircleUser
            className={twMerge(
              "h-full w-full rounded-full border-[1px] p-0.5 md:border-2",
              authUser ? "border-cyan-800" : "border-yellow-500",
            )}
          />
        </SideNavLink>
        {authUser && (
          <button
            className="group flex aspect-square w-10 items-center gap-2 rounded p-2 transition-all hover:bg-light/10 md:w-12"
            formAction={signOut}
          >
            <FaRightFromBracket className="h-full w-full transition-all group-hover:fill-red-400" />
          </button>
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
        "flex aspect-square w-8 items-center gap-2 rounded p-1 text-center text-xs font-bold transition-all hover:bg-light/10 md:w-12 md:p-2 md:text-base",
        extClassName,
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
