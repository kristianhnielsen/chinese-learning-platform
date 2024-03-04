import { getUserProgress } from "@/app/lib/database/users";
import { getAuthUser } from "@/app/lib/auth";
import { User } from "@supabase/supabase-js";
import CharacterMatchGame from "./CharacterMatchGame";
import { getCharacterMatchSettings } from "@/app/lib/database/settings";

export default async function CharacterMatch() {
  const authUser = (await getAuthUser()) as User;
  const userProgress = await getUserProgress(authUser.id);
  const userSettings = await getCharacterMatchSettings(authUser.id);

  return (
    <>
      <h1>Character Match</h1>
      <CharacterMatchGame
        userProgress={userProgress}
        userSettings={userSettings}
      />
    </>
  );
}
