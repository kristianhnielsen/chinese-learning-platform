"use server";

import { getSupabaseClient } from "@/utils/supabase/server";

export async function getDictionary() {
  const supabase = getSupabaseClient();

  const { data: dictionary, error } = await supabase
    .from("dictionary")
    .select("*");

  if (error) throw error;

  return dictionary;
}

export const getQueryFilteredDictionary = async (
  query: string,
  sort?: string,
) => {
  const supabase = getSupabaseClient();
  const sortAsc = sort?.split("-")[1] === "asc";
  const sortBy = sort?.split("-")[0] || "frequency";

  const { data: filteredDictionary, error } = await supabase
    .from("dictionary")
    .select()
    .or(
      `english.ilike.%${query}%,simplified.ilike.%${query}%,traditional.ilike.%${query}%,pinyin_numerical.ilike.%${query}%`,
    )
    .limit(1001)
    .order(sortBy, { ascending: sortAsc, nullsFirst: false });

  if (error) throw error;

  return filteredDictionary;
};

export const getDictionaryEntry = async (entry: string) => {
  const supabase = getSupabaseClient();

  const { data: entryData, error } = await supabase
    .from("dictionary")
    .select()
    .eq("simplified", decodeURI(entry));

  if (error) throw error;
  return entryData;
};

export const getHskEntries = async (hskLevel: number) => {
  const supabase = getSupabaseClient();

  const { data: entryData, error } = await supabase
    .from("dictionary")
    .select()
    .eq("hsk", hskLevel.toString())
    .order("frequency");

  if (error) throw error;
  return entryData;
};

export const getCharacterMatchData = async (
  userSettings: CharacterMatchSettings,
  limit: number,
) => {
  const supabase = getSupabaseClient();

  let hskLevels = [];
  if (userSettings.hsk1) {
    hskLevels.push(1);
  }
  if (userSettings.hsk2) {
    hskLevels.push(2);
  }
  if (userSettings.hsk3) {
    hskLevels.push(3);
  }
  if (userSettings.hsk4) {
    hskLevels.push(4);
  }
  if (userSettings.hsk5) {
    hskLevels.push(5);
  }
  if (userSettings.hsk6) {
    hskLevels.push(6);
  }

  const { data: entryData, error } = await supabase
    .from("dictionary")
    .select()
    .in("hsk", hskLevels);

  if (error) throw error;

  let randEntries = [];
  for (let i = 0; i < limit; i++) {
    const randEntry = entryData[Math.floor(Math.random() * entryData.length)];
    randEntries.push(randEntry);
  }

  return randEntries;
};

export const getMostCommonEntries = async (pageNumber: number) => {
  const supabase = getSupabaseClient();
  const maxPageEntries = 50;

  const { data: entryData, error } = await supabase
    .from("dictionary")
    .select()
    .not("frequency", "is", null)
    .gt("frequency", maxPageEntries * pageNumber - maxPageEntries)
    .lte("frequency", maxPageEntries * pageNumber)
    .order("frequency");

  if (error) throw error;
  return entryData;
};

export async function getEntriesByIds(entryIds: number[], limit: number) {
  const supabase = getSupabaseClient();

  const { data: entryData, error } = await supabase
    .from("dictionary")
    .select()
    .in("id", entryIds)
    .limit(limit);

  if (error) throw error;

  return entryData;
}
