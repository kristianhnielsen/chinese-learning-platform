import { getHskEntries } from "@/app/lib/database";
import { getUniqueCharacters } from "@/app/lib/utils";
import DictionaryEntryCard from "@/app/ui/DictionaryEntryCard";
import { redirect } from "next/navigation";

export default async function Level({ params }: { params: { level: string } }) {
  const hskLevel = Number(params.level);
  if (hskLevel > 6 || isNaN(hskLevel)) {
    redirect("/hsk");
  }

  const entries = await getHskEntries(hskLevel);

  const uniqueCharacters = getUniqueCharacters(entries);

  return (
    <>
      <h1 className=" text-primary font-semibold text-2xl">HSK {hskLevel}</h1>
      <p>
        HSK {hskLevel} has {uniqueCharacters.length} words
      </p>
      <details open className="max-w-screen-md w-full">
        <summary className="text-accent font-semibold cursor-pointer">
          Character overview
        </summary>
        <ul className="flex flex-wrap p-4 gap-x-8 gap-y-2">
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
      <section className="grid gap-8 max-w-2xl w-full">
        {entries.map((entry) => (
          <DictionaryEntryCard entry={entry} key={entry.id} />
        ))}
      </section>
    </>
  );
}
