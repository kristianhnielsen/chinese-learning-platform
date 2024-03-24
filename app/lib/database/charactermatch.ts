"use server";

import { getSupabaseClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";
import { getAuthUser } from "../auth";
import { redirect } from "next/navigation";

export async function getUserCharacterMatchData(authUserId: string) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("character-match")
    .select("*")
    .eq("user_id", authUserId);

  if (error) throw error;

  return data;
}

export async function updateWordScore(
  chosenWord: DictionaryEntry,
  correctWord: DictionaryEntry,
) {
  if (chosenWord.id === correctWord.id) {
    // User chose correctly
    const supabase = getSupabaseClient();
    const authUser = (await getAuthUser()) as User;

    const { data: existingDataEntry, error: existingDataEntryError } =
      await supabase
        .from("character-match")
        .select()
        .eq("dictionary_id", chosenWord.id)
        .eq("user_id", authUser.id)
        .single();

    if (!existingDataEntry) {
      // there's no found data on this word for this user
      // insert a new row
      const { error: insertError } = await supabase
        .from("character-match")
        .insert({ dictionary_id: correctWord.id });

      if (insertError) throw insertError;
    } else if (existingDataEntry) {
      // no error, word already exist for this user
      // update score by +1
      const { error: updateError } = await supabase
        .from("character-match")
        .update({
          score: existingDataEntry.score + 1,
        })
        .eq("user_id", authUser.id)
        .eq("dictionary_id", correctWord.id);

      if (updateError) throw updateError;
    }

    console.log("New Progress Data uploaded successfully!");
  }

  return redirect("/learn/character-match");
}
