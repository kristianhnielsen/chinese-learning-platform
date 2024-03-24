"use server";

import { getSupabaseClient } from "@/utils/supabase/server";
import { getAuthUser } from "../auth";
import { redirect } from "next/navigation";
import { User } from "@supabase/supabase-js";

export async function getSettings() {
  const supabase = getSupabaseClient();

  const { data: settings, error } = await supabase.from("settings").select();

  if (error) throw error;

  return settings;
}

export async function getCharacterMatchSettings(authUserId: string) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("settings")
    .select("character_match")
    .eq("id", authUserId)
    .single();

  if (error) throw error;

  return JSON.parse(
    JSON.stringify(data.character_match),
  ) as CharacterMatchSettings;
}

export async function updateCharacterMatchSettings(formData: FormData) {
  const supabase = getSupabaseClient();
  const authUser = (await getAuthUser()) as User;

  const hsk1 = Boolean(formData.get("hsk1"));
  const hsk2 = Boolean(formData.get("hsk2"));
  const hsk3 = Boolean(formData.get("hsk3"));
  const hsk4 = Boolean(formData.get("hsk4"));
  const hsk5 = Boolean(formData.get("hsk5"));
  const hsk6 = Boolean(formData.get("hsk6"));
  const nonhsk = Boolean(formData.get("nonhsk"));

  if (!hsk1 && !hsk2 && !hsk3 && !hsk4 && !hsk5 && !hsk6) {
    // Must have at least one checked
    return redirect(
      "/learn/character-match/settings?message=Please select at least one",
    );
  }

  const { error } = await supabase
    .from("settings")
    .upsert({
      character_match: {
        hsk1: hsk1,
        hsk2: hsk2,
        hsk3: hsk3,
        hsk4: hsk4,
        hsk5: hsk5,
        hsk6: hsk6,
        nonhsk: nonhsk,
      },
    })
    .eq("id", authUser.id);

  if (error) {
    return redirect(
      "/learn/character-match/settings?message=Something went wrong, try again",
    );
  }

  return redirect("/learn/character-match/settings?message=Changes saved");
}
