import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

export default function SideNav() {
  return (
    <nav className="p-8 min-h-full flex flex-col gap-8 text-light  border-r-4 border-light">
      <SideNavLink href="/">Dictionary</SideNavLink>
      <div className="grid gap-2 text-nowrap">
        <p className="border-b-2 border-light/50">Vocabulary Lists</p>
        <div className="pl-4 grid">
          <SideNavLink href="/most-common">Most Common Characters</SideNavLink>
          <SideNavLink href="/hsk-1">HSK 1</SideNavLink>
          <SideNavLink href="/hsk-2">HSK 2</SideNavLink>
          <SideNavLink href="/hsk-3">HSK 3</SideNavLink>
          <SideNavLink href="/hsk-4">HSK 4</SideNavLink>
          <SideNavLink href="/hsk-5">HSK 5</SideNavLink>
          <SideNavLink href="/hsk-6">HSK 6</SideNavLink>
        </div>
      </div>
    </nav>
  );
}

function SideNavLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: Url;
}) {
  return (
    <Link className="hover:bg-light/10 p-2 rounded transition-all" href={href}>
      {children}
    </Link>
  );
}
