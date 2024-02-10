import { getDictionaryEntry } from "@/app/lib/database";
import { getUniqueCharacters, splitEnglishDefinitions } from "@/app/lib/utils";
import DictionaryEntryCard from "@/app/ui/DictionaryEntryCard";
import Link from "next/link";

export default async function EntryPage({
  params,
}: {
  params: { entry: string };
}) {
  const entries = await getDictionaryEntry(params.entry);
  const firstEntry = entries[0];

  return (
    <main className="text-light flex min-h-screen flex-col gap-2 p-8 w-full">
      <Link
        href={"/"}
        className="bg-light text-dark p-4 rounded-full w-fit hover:bg-light/80 transition-all"
      >
        &larr; Back
      </Link>

      <div className="grid gap-8 justify-center w-full">
        <h1 className="text-primary text-9xl justify-self-center">
          {firstEntry.simplified}
        </h1>
        {firstEntry.simplified?.length! > 1 && (
          <div className="w-full flex justify-center gap-4 items-center">
            <p>Contains:</p>
            {firstEntry.simplified?.split("").map((character) => (
              <a
                href={`/dictionary/${character}`}
                key={character}
                className="text-lg hover:underline underline-offset-4"
              >
                {character}
              </a>
            ))}
          </div>
        )}
        <div className="text-sm flex gap-8 justify-center">
          {firstEntry.hsk && <p>HSK: {firstEntry.hsk}</p>}
          {firstEntry.frequency && <p>Frequency: {firstEntry.frequency}</p>}
          {firstEntry.radical && <p>Radical: {firstEntry.radical}</p>}
          {firstEntry.strokes && <p>Strokes: {firstEntry.strokes}</p>}
        </div>

        <section className="flex gap-8 flex-wrap max-w-2xl">
          {entries.map((entry) => (
            <DictionaryEntryCard entry={entry} key={entry.id} />
          ))}
        </section>
      </div>
    </main>
  );
}
