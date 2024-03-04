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

export async function updateUserProgress(gameProgress: Progress[]) {
  const supabase = getSupabaseClient();
  const authUser = (await getAuthUser()) as User;
  const updateUserProgressScore = (gameProgress: Progress) => {
    return userProgress.map((item) =>
      item.id === gameProgress.id
        ? { ...item, score: (item.score += gameProgress.score) }
        : item,
    );
  };

  const { data, error } = await supabase
    .from("users")
    .select("progress")
    .eq("id", authUser.id)
    .single();

  if (error) throw error;

  // const userProgress = JSON.parse(JSON.stringify(data.progress)) as Progress;

  // test\
  gameProgress = [
    { id: 693539, score: 1 },
    { id: 693532, score: 1 },
  ] as Progress[];
  const userProgress = [
    { id: 693539, score: 1 },
    { id: 693532, score: 5 },
    { id: 693533, score: 50 },
  ] as Progress[];

  if (userProgress.length == 0) {
    const jsonProgress = JSON.stringify(gameProgress);
    const { data, error } = await supabase
      .from("users")
      .upsert({ progress: jsonProgress })
      .eq("id", authUser.id)
      .select();

    if (error) throw error;
  } else {
    gameProgress.forEach((gameProgressItem) =>
      updateUserProgressScore(gameProgressItem),
    );
  }

  console.log("updated user progress: ", userProgress);
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

  const userProgress = JSON.parse(JSON.stringify(data.progress)) as Progress[];

  return userProgress;
}
