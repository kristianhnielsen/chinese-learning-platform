"use client";

import { updateWordScore } from "@/app/lib/database/charactermatch";
import { limitArray, splitEnglishDefinitions } from "@/app/lib/utils";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { useDebouncedCallback } from "use-debounce";

export default function ChoiceCard({
  choice,
  correctWord,
}: {
  choice: DictionaryEntry;
  correctWord: DictionaryEntry;
}) {
  const updateWordScoreWithData = useDebouncedCallback(
    updateWordScore.bind(null, choice, correctWord),
    1000,
  );
  const isChoiceCorrect = choice.id === correctWord.id;

  return (
    <button
      formAction={updateWordScoreWithData}
      className={twMerge(
        "grid cursor-pointer gap-2 rounded-lg border border-light/20 p-4 hover:bg-light/10",
        isChoiceCorrect
          ? "focus:focus:bg-green-500/30"
          : "focus:focus:bg-red-500/30",
      )}
    >
      <ul className="list-inside list-disc text-left text-sm md:text-base">
        {limitArray(
          splitEnglishDefinitions(choice)?.map((englishDefinition) => {
            return (
              <li key={englishDefinition} className="text-balance">
                {englishDefinition}
              </li>
            );
          }),
          3,
        )}
      </ul>
    </button>
  );
}
