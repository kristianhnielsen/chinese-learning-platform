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
      className="grid md:gap-4 gap-2 border-2 rounded-lg border-light p-4"
    >
      <div className="flex gap-x-4 gap-y-2 items-center flex-wrap">
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
      <ul className="p-4 list-disc list-inside bg-light/10 text-sm md:text-base rounded-lg grid gap-2">
        {splitEnglishDefinitions(entry)?.map((englishDefinition) => (
          <li key={englishDefinition} className="text-balance">
            {englishDefinition}
          </li>
        ))}
      </ul>
    </div>
  );
}
