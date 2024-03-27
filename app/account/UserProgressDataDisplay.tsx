import Link from "next/link";
import { getUserWords } from "../lib/database/users";

export default async function UserProgressDataDisplay({
  authUserId,
}: {
  authUserId: string;
}) {
  const userWords = await getUserWords(authUserId);

  const userWordsSortedByScore = userWords.sort((a, b) => b.score - a.score);

  return (
    <section className="mt-12 grid w-full max-w-screen-md gap-4">
      <h2 className="text-center">Your Words</h2>
      {userWords.length > 0 ? (
        <>
          <div className="mr-1 grid grid-cols-3 justify-items-center text-xs md:mr-6 md:grid-cols-4 md:text-base">
            <p>Simplified</p>
            <p>Pinyin</p>
            <p className="hidden md:block">HSK Level</p>
            <p>Score</p>
          </div>
          <div className="grid max-h-48 gap-2 overflow-y-scroll text-sm md:text-base">
            {userWordsSortedByScore.map((word) => (
              <div
                key={word.dictionary_id}
                className="grid grid-cols-3 items-center gap-4 rounded-lg bg-light/15 p-2 text-center md:grid-cols-4"
              >
                <Link
                  href={`/dictionary/${word.dictionary?.simplified}`}
                  className="underline-offset-4 hover:underline"
                >
                  {word.dictionary?.simplified}
                </Link>
                <p>{word.dictionary?.pinyin_diacritic}</p>
                <p className="hidden md:block">{word.dictionary?.hsk}</p>
                <p>{word.score}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center">
          <Link href="/learn" className="text-secondary hover:underline">
            Learn
          </Link>{" "}
          to add words to your progress
        </p>
      )}
    </section>
  );
}
