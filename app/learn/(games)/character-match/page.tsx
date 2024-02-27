import { getUserProgress } from "@/app/lib/database/users";
import { getAuthUser } from "@/app/lib/auth";
import { User } from "@supabase/supabase-js";
import CharacterMatchGame from "./CharacterMatchGame";
import { getCharacterMatchSettings } from "@/app/lib/database/settings";
import { getCharacterMatchData } from "@/app/lib/database/dictionary";

export default async function CharacterMatch() {
  const authUser = (await getAuthUser()) as User;
  const { userProgress, progressEntries } = await getUserProgress(authUser.id);
  const userSettings = await getCharacterMatchSettings(authUser.id);
  const dictionaryData = await getCharacterMatchData(userSettings, 50);

  return (
    <>
      <h1>Character Match</h1>
      <CharacterMatchGame
        userProgress={userProgress}
        progressEntries={progressEntries}
        dictionaryData={dictionaryData}
      />
    </>
  );
}
