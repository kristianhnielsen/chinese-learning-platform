import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { getAuthUser } from "../lib/auth";
import { FaGear } from "react-icons/fa6";

export default async function Learn() {
  const authUser = await getAuthUser();

  return (
    <>
      <h1 className="text-2xl text-primary">Learn</h1>
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
      <section className="grid grid-cols-2 gap-4">
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
    <Link
      href={href}
      className="flex flex-col items-center gap-2 rounded-lg border border-light/30 bg-light/0 p-4 transition-all duration-200 hover:bg-light/5"
    >
      <h2 className="font-semibold capitalize text-secondary">{title}</h2>
      <p className="text-sm">{description}</p>
      <Link
        href={`${href}/settings`}
        className="self-end rounded-lg p-2 hover:bg-light/5"
      >
        <FaGear />
      </Link>
    </Link>
  );
}
