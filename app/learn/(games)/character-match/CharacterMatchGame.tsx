"use client";

import { useState } from "react";
import CharacterMatchRoundCard from "./CharacterMatchRoundCard";

interface GameProgress {
  simplified: string;
  english: string;
  id: number;
  correct: false;
  incorrect: false;
}

export default function CharacterMatchGame({
  userProgress,
  progressEntries,
  dictionaryData,
}: {
  userProgress: Progress;
  progressEntries: DictionaryEntry[] | null;
  dictionaryData: DictionaryEntry[];
}) {
  const [roundNumber, setRoundNumber] = useState(0);

  const [gameProgress, setGameProgress] = useState<GameProgress[]>([
    {
      simplified: "你",
      english: "You",
      id: 34,
      correct: false,
      incorrect: false,
    },
    {
      simplified: "我",
      english: "Me",
      id: 67,
      correct: false,
      incorrect: false,
    },
  ]);

  const handleNextClick = () => {};

  // Get Correct words
  let correctWords: DictionaryEntry[];
  if (progressEntries && progressEntries.length > 5) {
    // Get 5 known words
    let knownWords = [];
    for (let i = 0; i < 5; i++) {
      const element =
        progressEntries[Math.floor(Math.random() * progressEntries.length)];
      knownWords.push(element);
    }
    // Get 5 random words
    let randomWords = [];
    for (let i = 0; i < 5; i++) {
      const element =
        dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
      randomWords.push(element);
    }

    // Combine known words and random words into one array
    correctWords = [...knownWords, ...randomWords];
  } else {
    // Get 10 random words
    let randomWords = [];
    for (let i = 0; i < 10; i++) {
      const element =
        dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
      randomWords.push(element);
    }

    correctWords = randomWords;
  }

  const getRandomEntries = () => {
    let randomWords = [];
    for (let i = 0; i < 3; i++) {
      const element =
        dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
      randomWords.push(element);
    }
    return randomWords;
  };

  return (
    <section className="grid gap-8">
      {(() => {
        switch (roundNumber) {
          case 0:
            return (
              <CharacterMatchRoundCard
                correctWord={correctWords[0]}
                fillerWords={getRandomEntries()}
              />
            );
          case 1:
            return (
              <CharacterMatchRoundCard
                correctWord={correctWords[1]}
                fillerWords={getRandomEntries()}
              />
            );
          case 2:
            return (
              <CharacterMatchRoundCard
                correctWord={correctWords[2]}
                fillerWords={getRandomEntries()}
              />
            );
          case 3:
            return (
              <CharacterMatchRoundCard
                correctWord={correctWords[3]}
                fillerWords={getRandomEntries()}
              />
            );
          case 4:
            return (
              <CharacterMatchRoundCard
                correctWord={correctWords[4]}
                fillerWords={getRandomEntries()}
              />
            );
          case 5:
            return (
              <CharacterMatchRoundCard
                correctWord={correctWords[5]}
                fillerWords={getRandomEntries()}
              />
            );
          case 6:
            return (
              <CharacterMatchRoundCard
                correctWord={correctWords[6]}
                fillerWords={getRandomEntries()}
              />
            );
          case 7:
            return (
              <CharacterMatchRoundCard
                correctWord={correctWords[7]}
                fillerWords={getRandomEntries()}
              />
            );
          case 8:
            return (
              <CharacterMatchRoundCard
                correctWord={correctWords[8]}
                fillerWords={getRandomEntries()}
              />
            );
          case 9:
            return (
              <CharacterMatchRoundCard
                correctWord={correctWords[9]}
                fillerWords={getRandomEntries()}
              />
            );
        }
      })()}
      <button
        onClick={() => {
          setGameProgress((previousState) => [
            ...previousState,
            gameProgress[roundNumber - 1],
          ]);
          setRoundNumber((currentRoundNumber) => currentRoundNumber + 1);
        }}
        className="items-center rounded-lg border border-light/10 p-4 hover:bg-light/10"
      >
        Next
      </button>

      <button onClick={() => handleNextClick()}>send</button>
    </section>
  );
}
