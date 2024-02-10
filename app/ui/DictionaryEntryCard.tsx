import { splitEnglishDefinitions } from "../lib/utils";

export default function DictionaryEntryCard({
  entry,
}: {
  entry: DictionaryEntry;
}) {
  return (
    <div
      key={entry.id}
      id={entry.simplified!}
      className="grid gap-4 border-2 rounded-lg w-full border-light p-4"
    >
      <div className="flex gap-8 items-center">
        <div className="text-primary flex gap-2 text-2xl">
          <a
            className="hover:underline underline-offset-4"
            href={`/dictionary/${entry.simplified}`}
            title="Simplified"
          >
            {entry.simplified}
          </a>
          | <p title="Traditional">{entry.traditional?.trim()}</p>
        </div>
        <p className="text-secondary">
          {entry.pinyin_diacritic} ({entry.pinyin_numerical})
        </p>
        {entry.categories?.length != 0 && (
          <p className="text-sm italic">
            {entry.categories?.split("/").join(", ")}
          </p>
        )}
      </div>
      <ul className="p-4 list-disc list-inside bg-light/10 rounded-lg grid gap-2">
        {splitEnglishDefinitions(entry)?.map((englishDefinition) => (
          <li key={englishDefinition}>{englishDefinition}</li>
        ))}
      </ul>
    </div>
  );
}
