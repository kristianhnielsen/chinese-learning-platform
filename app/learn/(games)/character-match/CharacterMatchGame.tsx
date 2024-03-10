"use client";

import { Suspense, useEffect, useState } from "react";
import CharacterMatchRoundCard from "./CharacterMatchRoundCard";
import { updateUserProgress } from "@/app/lib/database/users";
import {
  getCharacterMatchData,
  getEntryById,
} from "@/app/lib/database/dictionary";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaRotate } from "react-icons/fa6";

export default function CharacterMatchGame({
  userProgress,
  userSettings,
}: {
  userProgress: Progress[];
  userSettings: CharacterMatchSettings;
}) {
  const [roundNumber, setRoundNumber] = useState(0);
  const maxRoundNumber = 9;
  const [isLoading, setIsLoading] = useState(true);
  const [gameProgress, setGameProgress] = useState<Progress[]>([]);
  const [correctWord, setCorrectWord] = useState<DictionaryEntry>();
  const [fillerWords, setFillerWords] = useState<DictionaryEntry[]>();

  const handleChoiceClick = (choice: DictionaryEntry) => {
    setIsLoading(true);

    if (roundNumber < maxRoundNumber) {
      const choiceFoundIndex = gameProgress.findIndex(
        (item) => item.id === choice.id,
      );
      const isInGameProgress = choiceFoundIndex !== -1;
      const isCorrectWord = choice.id === correctWord!.id;
      const decrementToMinZero = (value: number) => {
        // decrements a value but not lower than zero
        const decrementedValue = value - 1;
        return decrementedValue < 0 ? 0 : decrementedValue;
      };

      if (isCorrectWord && !isInGameProgress) {
        setGameProgress((previousState) => [
          ...previousState,
          {
            ...correctWord!,
            score: 1,
          },
        ]);
      } else if (isCorrectWord && isInGameProgress) {
        setGameProgress((previousState) => [
          ...previousState,
          {
            ...previousState[choiceFoundIndex],
            score: previousState[choiceFoundIndex].score + 1,
          },
        ]);
      } else if (!isCorrectWord && isInGameProgress) {
        setGameProgress((previousState) => [
          ...previousState,
          {
            ...previousState[choiceFoundIndex],
            score: decrementToMinZero(previousState[choiceFoundIndex].score),
          },
        ]);
      } else if (!isCorrectWord && !isInGameProgress) {
        setGameProgress((previousState) => [
          ...previousState,
          {
            ...correctWord!,
            score: 0,
          },
        ]);
      }

      setRoundNumber((currentRoundNumber) => currentRoundNumber + 1);
    } else {
      // if last round
      updateUserProgress(gameProgress);
    }
  };

  useEffect(() => {
    const hasUserProgress = async () => {
      const randIndex = Math.floor(Math.random() * userProgress.length);
      const randomUserProgressEntry = userProgress[randIndex];

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

    if (userProgress.length !== 0) {
      hasUserProgress();
    } else {
      noUserProgress();
    }

    setIsLoading(false);
  }, [
    gameProgress,
    roundNumber,
    userProgress,
    userProgress.length,
    userSettings,
  ]);

  const handleGameRestart = () => {
    setRoundNumber(0);
    setGameProgress([]);
    redirect("/learn/character-match");
  };
  return (
    <>
      {isLoading && <FaRotate className="h-24 w-24 animate-spin" />}
      {roundNumber < maxRoundNumber && !isLoading && (
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
      )}
      {roundNumber === maxRoundNumber && (
        <section className="grid max-h-full gap-4">
          <h2 className="text-center">Game Over</h2>
          <div className="grid grid-cols-3 gap-4">
            {gameProgress.map((word, index) => (
              <div
                key={word.id}
                className="grid grid-cols-2 items-center rounded-lg border-2 border-light/20 px-2 py-1"
              >
                <div>
                  <p>{word.simplified}</p>
                  <p>{word.pinyin_diacritic}</p>
                </div>
                <p className={`animate-fadeInDown text-right transition-all`}>
                  + {word.score}
                </p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-8">
            <button
              onClick={() => handleGameRestart()}
              className="rounded-lg bg-primary/30 p-4 hover:bg-primary/50"
            >
              Restart
            </button>
            <Link
              href="/learn"
              className="rounded-lg bg-accent/30 p-4 text-center hover:bg-accent/50"
            >
              Select Game
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
