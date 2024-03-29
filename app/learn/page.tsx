import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { getAuthUser } from "../lib/auth";
import { FaGear, FaPlay } from "react-icons/fa6";

export default async function Learn() {
  const authUser = await getAuthUser();

  return (
    <>
      <h1>Learn</h1>
      {!authUser && (
        <div className="">
          <p className="flex gap-1">
            You need to
            <Link href={"/login"} className="text-accent hover:underline">
              log in
            </Link>
            to learn
          </p>
        </div>
      )}
      <section className="grid gap-4 md:grid-cols-2">
        <GameCard
          href="/learn/character-match"
          title="Character Match"
          description="Match the English definitions with its character and pinyin"
        />
      </section>
    </>
  );
}

function GameCard({
  href,
  title,
  description,
}: {
  href: Url;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-light/30 bg-light/0 p-2">
      <div className="grid gap-2">
        <h2 className="text-center capitalize text-secondary">{title}</h2>
        <p className="text-sm">{description}</p>
      </div>
      <div className="grid grid-cols-2 gap-1">
        <Link
          href={href}
          className="grid justify-items-center rounded-lg p-4 transition-all duration-200 hover:bg-light/5"
        >
          <FaPlay className="h-6 w-6" />
        </Link>
        <Link
          href={`${href}/settings`}
          className="grid justify-items-center rounded-lg p-4 transition-all duration-200 hover:bg-light/5 "
        >
          <FaGear className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
}
