"use server";

import { getSupabaseClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";
import { getAuthUser } from "../auth";
import { redirect } from "next/navigation";

export async function getUser(authUser: User) {
  const supabase = getSupabaseClient();

  const { data: userData, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", authUser.id)
    .single();

  if (error) throw error;

  return userData;
}

export async function updateUser(formData: FormData) {
  const supabase = getSupabaseClient();
  const name = formData.get("name") as string;
  const authUser = (await getAuthUser()) as User;

  const { data, error } = await supabase
    .from("users")
    .update({ name: name })
    .eq("id", authUser.id);

  if (error) {
    return redirect("/account?message=Something went wrong, try again");
  }

  return redirect("/account?message=Changes saved");
}

export async function getUserWords(authUserId: string) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("character-match")
    .select(
      `
      score,
      dictionary_id, 
      dictionary ( id, simplified, pinyin_diacritic, pinyin_numerical, hsk)
    `,
    )
    .eq("user_id", authUserId);

  if (error) throw error;

  return data;
}
