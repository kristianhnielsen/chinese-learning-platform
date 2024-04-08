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
    <section className="flex flex-col gap-2 text-light">
      <div className="grid w-full justify-center gap-8">
        <h1 className="justify-self-center">{firstEntry.simplified}</h1>
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
        <div className="flex flex-wrap justify-center gap-4 text-sm md:gap-8">
          <p>Definitions: {entries.length}</p>
          {firstEntry.hsk && <p>HSK: {firstEntry.hsk}</p>}
          {firstEntry.frequency && <p>Frequency: {firstEntry.frequency}</p>}
          {firstEntry.radical && (
            <p>
              Radical:{" "}
              <Link
                href={`/dictionary/${firstEntry.radical}`}
                className="underline-offset-4 hover:text-secondary hover:underline"
              >
                {firstEntry.radical}
              </Link>
            </p>
          )}
          {firstEntry.strokes && <p>Strokes: {firstEntry.strokes}</p>}
        </div>

        <section className="grid gap-8 px-8 md:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry) => (
            <DictionaryEntryCard entry={entry} key={entry.id} />
          ))}
        </section>
      </div>
    </section>
  );
}
