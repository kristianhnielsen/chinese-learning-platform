"use client";

import { limitArray, splitEnglishDefinitions } from "@/app/lib/utils";

export default function CharacterMatchRoundCard({
  correctWord,
  fillerWords,
  handleChoiceClick,
}: {
  correctWord: DictionaryEntry;
  fillerWords: DictionaryEntry[];
  handleChoiceClick: (choice: DictionaryEntry) => void;
}) {
  const fillerWordsWithCorrectWord = [...fillerWords, correctWord].sort(
    (a, b) => a.id - b.id,
  );

  return (
    <>
      <div className="grid items-center gap-2 rounded-lg border border-light/10 p-4 text-center">
        <p>{correctWord.simplified}</p>
        <p>{correctWord.pinyin_diacritic}</p>
      </div>
      <section className="grid grid-cols-2 gap-4">
        {fillerWordsWithCorrectWord.map((choice) => (
          <div
            className="grid cursor-pointer items-center gap-2 rounded-lg border border-light/20 p-4 hover:bg-light/10"
            key={choice.english}
            onClick={() => handleChoiceClick(choice)}
          >
            <ul className="list-inside list-disc text-sm md:text-base">
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
          </div>
        ))}
      </section>
    </>
  );
}
