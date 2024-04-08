import Link from "next/link";
import { splitEnglishDefinitions } from "../lib/utils";

export default function DictionaryEntryCard({
  entry,
}: {
  entry: DictionaryEntry;
}) {
  const findSimplifiedClassifierCharacter = (classifier: string) => {
    if (classifier.includes("|")) {
      return classifier.split("|")[0];
    } else {
      return classifier;
    }
  };

  const formatClassifierString = (classifier: string) => {
    const classifiers = classifier.split("/");
    let formattedClassifiers: { text: string; simplified: string }[] = [];
    classifiers.map((classifierString) => {
      formattedClassifiers.push({
        text: classifierString,
        simplified: findSimplifiedClassifierCharacter(classifierString),
      });
    });

    return formattedClassifiers;
  };

  return (
    <div
      key={entry.id}
      id={entry.simplified!}
      className="flex flex-col gap-2 rounded-lg border-2 border-light p-4 md:gap-4"
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex gap-2 text-2xl text-primary">
          <a
            className="underline-offset-4 hover:underline"
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
        {entry.classifier && (
          <div className="flex gap-4">
            <p>CL:</p>
            {formatClassifierString(entry.classifier).map((classifier) => (
              <Link
                className="underline-offset-4 hover:text-secondary hover:underline"
                key={classifier.text}
                href={`/dictionary/${classifier.simplified}`}
              >
                {classifier.text}
              </Link>
            ))}
          </div>
        )}
      </div>
      <ul className="grid list-inside list-disc gap-2 rounded-lg bg-light/10 p-4 text-sm md:text-base">
        {splitEnglishDefinitions(entry)?.map((englishDefinition) => (
          <li key={englishDefinition} className="text-balance">
            {englishDefinition}
          </li>
        ))}
      </ul>
    </div>
  );
}
