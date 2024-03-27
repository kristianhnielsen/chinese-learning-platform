import { getAuthUser } from "@/app/lib/auth";
import { User } from "@supabase/supabase-js";
import { getCharacterMatchSettings } from "@/app/lib/database/settings";
import {
  getCharacterMatchData,
  getEntryById,
} from "@/app/lib/database/dictionary";
import { Suspense } from "react";
import ChoiceCard from "./ChoiceCard";
import Loading from "../../../loading";
import { redirect } from "next/navigation";
import { getUserCharacterMatchData } from "@/app/lib/database/charactermatch";

export default async function CharacterMatch() {
  const authUser = (await getAuthUser()) as User;
  if (!authUser) redirect("/learn");
  const userProgressData = await getUserCharacterMatchData(authUser.id);
  const userSettings = await getCharacterMatchSettings(authUser.id);
  let fillerWords: DictionaryEntry[];
  let correctWord: DictionaryEntry;

  if (userProgressData?.length >= 10 && Math.random() <= 0.2) {
    // User has more than 10 words in their previous progress
    // Give the user a 20% chance of getting a word they have had before
    const randomUserProgressIndex = Math.floor(
      Math.random() * userProgressData.length,
    );
    const randomUserProgressEntry = userProgressData[randomUserProgressIndex];

    correctWord = await getEntryById(randomUserProgressEntry.dictionary_id);
    fillerWords = await getCharacterMatchData(userSettings, 3);
  } else {
    // User does not has previous progress OR has less than 10 words in their previous progress
    const randomWords = await getCharacterMatchData(userSettings, 4);
    fillerWords = randomWords.slice(-3);
    correctWord = randomWords[0];
  }

  // Filter the words by id from low to high, to "shuffle" the choices
  const fillerWordsWithCorrectWord = [...fillerWords, correctWord].sort(
    (a, b) => a.id - b.id,
  );

  return (
    <>
      <Suspense fallback={<Loading />}>
        <h1>Character Match</h1>
        <section className="grid max-w-screen-sm gap-8">
          <div className="grid items-center gap-2 rounded-lg border border-light/10 p-4 text-center text-xl">
            <p>{correctWord.simplified}</p>
          </div>
          <form className="grid grid-cols-2 gap-4">
            {fillerWordsWithCorrectWord.map((choice) => (
              <ChoiceCard
                key={choice.id + correctWord.id}
                correctWord={correctWord}
                choice={choice}
              />
            ))}
          </form>
        </section>
      </Suspense>
    </>
  );
}
