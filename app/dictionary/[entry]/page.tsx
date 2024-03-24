import { getDictionaryEntry } from "@/app/lib/database/dictionary";
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
    <main className="flex min-h-screen w-full flex-col gap-2 p-8 text-light">
      <div className="grid w-full justify-center gap-8">
        <h1 className="justify-self-center text-9xl text-primary">
          {firstEntry.simplified}
        </h1>
        {firstEntry.simplified?.length! > 1 && (
          <div className="flex w-full items-center justify-center gap-4">
            <p>Contains:</p>
            {firstEntry.simplified?.split("").map((character) => (
              <a
                href={`/dictionary/${character}`}
                key={character}
                className="text-lg underline-offset-4 hover:underline"
              >
                {character}
              </a>
            ))}
          </div>
        )}
        <div className="flex justify-center gap-8 text-sm">
          {firstEntry.hsk && <p>HSK: {firstEntry.hsk}</p>}
          {firstEntry.frequency && <p>Frequency: {firstEntry.frequency}</p>}
          {firstEntry.radical && <p>Radical: {firstEntry.radical}</p>}
          {firstEntry.strokes && <p>Strokes: {firstEntry.strokes}</p>}
        </div>

        <section className="grid max-w-2xl grid-cols-2 gap-8">
          {entries.map((entry) => (
            <DictionaryEntryCard entry={entry} key={entry.id} />
          ))}
        </section>
      </div>
    </main>
  );
}
