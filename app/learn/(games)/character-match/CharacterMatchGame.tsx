"use client";

import { useEffect, useState } from "react";
import CharacterMatchRoundCard from "./CharacterMatchRoundCard";
import { updateUserProgress } from "@/app/lib/database/users";
import {
  getCharacterMatchData,
  getEntryById,
} from "@/app/lib/database/dictionary";

export default function CharacterMatchGame({
  userProgress,
  userSettings,
}: {
  userProgress: Progress[];
  userSettings: CharacterMatchSettings;
}) {
  const [roundNumber, setRoundNumber] = useState(0);
  const [gameProgress, setGameProgress] = useState<Progress[]>([]);
  const [correctWord, setCorrectWord] = useState<DictionaryEntry>();
  const [fillerWords, setFillerWords] = useState<DictionaryEntry[]>();

  const handleChoiceClick = (choice: DictionaryEntry) => {
    if (roundNumber < 10) {
      if (choice.id === correctWord!.id) {
        setGameProgress((previousState) => [
          ...previousState,
          { id: correctWord!.id, score: 1 },
        ]);
      } else {
        setGameProgress((previousState) => [
          ...previousState,
          { id: correctWord!.id, score: 0 },
        ]);
      }
      setRoundNumber((currentRoundNumber) => currentRoundNumber + 1);
    } else {
      updateUserProgress(gameProgress);
    }
  };

  const hasUserProgress = async () => {
    const randomUserProgressEntry =
      userProgress[Math.floor(Math.random() * userProgress.length)];
    const correctWord = await getEntryById(randomUserProgressEntry.id);
    const randFillerWords = await getCharacterMatchData(userSettings, 3);

    setCorrectWord(correctWord);
    setFillerWords(randFillerWords);
  };

  const noUserProgress = async () => {
    const randomWords = await getCharacterMatchData(userSettings, 4);
    const randFillerWords = randomWords.slice(-3);
    const correctWord = randomWords[0];

    setFillerWords(randFillerWords);
    setCorrectWord(correctWord);
  };

  useEffect(() => {
    if (userProgress.length !== 0) {
      hasUserProgress();
    } else {
      noUserProgress();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundNumber]);
  return (
    <section className="grid gap-8">
      <h2 className="justify-self-center">Round {roundNumber + 1}</h2>
      {correctWord && fillerWords && (
        <CharacterMatchRoundCard
          key={roundNumber + correctWord.id}
          correctWord={correctWord}
          fillerWords={fillerWords}
          handleChoiceClick={handleChoiceClick}
        />
      )}
    </section>
  );
}
