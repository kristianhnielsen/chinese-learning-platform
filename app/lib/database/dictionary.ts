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
  sort?: string
) => {
  const supabase = getSupabaseClient();
  const sortAsc = sort?.split("-")[1] === "asc";
  const sortBy = sort?.split("-")[0] || "frequency";

  const { data: filteredDictionary, error } = await supabase
    .from("dictionary")
    .select()
    .or(
      `english.ilike.%${query}%,simplified.ilike.%${query}%,traditional.ilike.%${query}%,pinyin_numerical.ilike.%${query}%`
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
