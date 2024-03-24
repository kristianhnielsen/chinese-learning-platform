import { getMostCommonEntries } from "@/app/lib/database/dictionary";
import { getUniqueCharacters } from "@/app/lib/utils";
import DictionaryEntryCard from "@/app/ui/DictionaryEntryCard";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import {
  AiFillBackward,
  AiFillForward,
  AiFillFastBackward,
  AiFillFastForward,
} from "react-icons/ai";

export default async function MostCommonCharacters(params: {
  searchParams: { page: string };
}) {
  const currentPageNum =
    Number(params.searchParams.page) || redirect("/most-common?page=1");

  const entries = await getMostCommonEntries(currentPageNum);
  const uniqueCharacters = getUniqueCharacters(entries);

  return (
    <>
      <h1 className="text-center">Most Common Characters</h1>
      <MostCommonCharactersPagination
        maxPageNum={100}
        currentPageNum={currentPageNum}
      />
      <details className="w-full max-w-screen-md">
        <summary className="cursor-pointer font-semibold text-accent">
          Character overview
        </summary>
        <ul className="flex flex-wrap gap-x-8 gap-y-2 p-4">
          {uniqueCharacters.map((character) => (
            <li key={character.id}>
              <a
                href={`#${character.simplified}`}
                className="underline-offset-4 hover:text-secondary hover:underline"
              >
                {character.simplified}
              </a>
            </li>
          ))}
        </ul>
      </details>
      <ol className="grid max-w-2xl gap-8">
        {entries.map((entry) => (
          <li key={entry.id}>
            <span>#{entry.frequency}</span>
            <DictionaryEntryCard entry={entry} />
          </li>
        ))}
      </ol>
      <MostCommonCharactersPagination
        maxPageNum={100}
        currentPageNum={currentPageNum}
      />
    </>
  );
}

const MostCommonCharactersPagination = ({
  maxPageNum,
  currentPageNum,
}: {
  maxPageNum: number;
  currentPageNum: number;
}) => {
  const minPageNum = 1;
  const nextPageNum = currentPageNum + 1;
  const prevPageNum = currentPageNum - 1;

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <div className="flex gap-4">
        <a
          href={`/most-common?page=${minPageNum}`}
          title="First"
          className={twMerge(
            "flex items-center gap-2 hover:underline",
            prevPageNum < minPageNum && "pointer-events-none text-light/50",
          )}
        >
          <AiFillFastBackward /> First
        </a>
        |
        <a
          href={`/most-common?page=${prevPageNum}`}
          title="Previous"
          className={twMerge(
            "flex items-center gap-2 hover:underline",
            prevPageNum < minPageNum && "pointer-events-none text-light/50",
          )}
        >
          <AiFillBackward /> Previous
        </a>
      </div>
      <div className="flex gap-4">
        <a
          href={`/most-common?page=${nextPageNum}`}
          title="Next"
          className={twMerge(
            "flex items-center gap-2 hover:underline",
            nextPageNum > maxPageNum && "pointer-events-none text-light/50",
          )}
        >
          Next <AiFillForward />
        </a>
        |
        <a
          href={`/most-common?page=${maxPageNum}`}
          title="Last"
          className={twMerge(
            "flex items-center gap-2 hover:underline",
            nextPageNum > maxPageNum && "pointer-events-none text-light/50",
          )}
        >
          Last <AiFillFastForward />
        </a>
      </div>
    </div>
  );
};
