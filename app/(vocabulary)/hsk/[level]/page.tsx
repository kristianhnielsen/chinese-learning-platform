import { getHskEntries } from "@/app/lib/database/dictionary";
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
      <h1>HSK {hskLevel}</h1>
      <p>
        HSK {hskLevel} has {uniqueCharacters.length} words
      </p>
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
      <section className="grid w-full max-w-2xl gap-8">
        {entries.map((entry) => (
          <DictionaryEntryCard entry={entry} key={entry.id} />
        ))}
      </section>
    </>
  );
}
