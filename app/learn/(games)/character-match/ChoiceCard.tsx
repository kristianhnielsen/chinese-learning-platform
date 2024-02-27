import { splitEnglishDefinitions } from "@/app/lib/utils";

export default function ChoiceCard({ entry }: { entry: DictionaryEntry }) {
  return (
    <div className="grid cursor-pointer items-center gap-2 rounded-lg border border-light/20 p-4 text-center hover:bg-light/10">
      <ul className="grid list-inside list-disc justify-items-start gap-2 text-sm md:text-base">
        {splitEnglishDefinitions(entry)?.map((englishDefinition) => (
          <li key={englishDefinition} className="text-balance">
            {englishDefinition}
          </li>
        ))}
      </ul>
    </div>
  );
}
