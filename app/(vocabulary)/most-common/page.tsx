import { getMostCommonEntries } from "@/app/lib/database";
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
      <h1 className=" text-primary font-semibold text-2xl text-center">
        Most Common Characters
      </h1>
      <MostCommonCharactersPagination
        maxPageNum={100}
        currentPageNum={currentPageNum}
      />
      <details open className="place-self-start w-full">
        <summary className="text-accent font-semibold cursor-pointer">
          Character overview
        </summary>
        <ul className="p-4 flex flex-wrap gap-x-8 gap-y-2">
          {uniqueCharacters.map((character) => (
            <li key={character.id}>
              <a
                href={`#${character.simplified}`}
                className="hover:text-secondary hover:underline underline-offset-4"
              >
                {character.simplified}
              </a>
            </li>
          ))}
        </ul>
      </details>
      <ol className="grid gap-8 max-w-2xl">
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
    <div className="flex gap-2 items-center flex-col w-full">
      <div className="flex gap-4">
        <a
          href={`/most-common?page=${minPageNum}`}
          title="First"
          className={twMerge(
            "hover:underline flex gap-2 items-center",
            prevPageNum < minPageNum && "pointer-events-none text-light/50"
          )}
        >
          <AiFillFastBackward /> First
        </a>
        |
        <a
          href={`/most-common?page=${prevPageNum}`}
          title="Previous"
          className={twMerge(
            "hover:underline flex gap-2 items-center",
            prevPageNum < minPageNum && "pointer-events-none text-light/50"
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
            "hover:underline flex gap-2 items-center",
            nextPageNum > maxPageNum && "pointer-events-none text-light/50"
          )}
        >
          Next <AiFillForward />
        </a>
        |
        <a
          href={`/most-common?page=${maxPageNum}`}
          title="Last"
          className={twMerge(
            "hover:underline flex gap-2 items-center",
            nextPageNum > maxPageNum && "pointer-events-none text-light/50"
          )}
        >
          Last <AiFillFastForward />
        </a>
      </div>
    </div>
  );
};
