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
    <section className="mt-12 grid w-full gap-4">
      <h2 className="text-center">Your Words</h2>
      {userWords.length > 0 ? (
        <>
          <div className="mr-6 grid grid-cols-4 justify-items-center">
            <p>Simplified</p>
            <p>Pinyin</p>
            <p>HSK Level</p>
            <p>Score</p>
          </div>
          <div className="grid max-h-48 gap-2 overflow-y-scroll">
            {userWordsSortedByScore.map((word) => (
              <div
                key={word.dictionary_id}
                className="grid max-w-screen-md grid-cols-4 gap-4 rounded-lg bg-light/15 p-2"
              >
                <Link
                  href={`/dictionary/${word.dictionary?.simplified}`}
                  className=" text-center underline-offset-4 hover:underline"
                >
                  {word.dictionary?.simplified}
                </Link>
                <p className="border-l-4 border-light/50 text-center">
                  {word.dictionary?.pinyin_diacritic}
                </p>
                <p className="border-l-4 border-light/50 text-center">
                  {word.dictionary?.hsk}
                </p>
                <p className="border-l-4 border-light/50 text-center">
                  {word.score}
                </p>
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
