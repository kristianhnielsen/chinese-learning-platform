"use server";

import { getSupabaseClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";
import { getAuthUser } from "../auth";
import { redirect } from "next/navigation";
import { getEntriesByIds } from "./dictionary";

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

export async function updateUserProgress(progressObj: Object[]) {
  const supabase = getSupabaseClient();
  const authUser = (await getAuthUser()) as User;
  const jsonProgress = JSON.stringify(progressObj);

  const { data, error } = await supabase
    .from("users")
    .upsert({ progress: jsonProgress })
    .eq("id", authUser.id)
    .select();

  console.log("Obj: ", progressObj);
  console.log("data: ", data);
}

export async function getUserProgress(userId: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("users")
    .select("progress")
    .eq("id", userId)
    .single();

  if (error) throw error;

  const userProgress = JSON.parse(JSON.stringify(data.progress)) as Progress;

  let progressEntries: DictionaryEntry[] | null = null;
  if (userProgress.length != 0) {
    let entryIds: number[] = [];
    userProgress.forEach((element) => {
      entryIds.push(element.id);
    });
    progressEntries = await getEntriesByIds(entryIds, 3);
  }

  return { userProgress, progressEntries };
}
