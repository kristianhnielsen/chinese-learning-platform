export const splitEnglishDefinitions = (entry: DictionaryEntry): string[] => {
  const englishArray = entry.english?.split("/");

  return removeDuplicates(englishArray!);
};

export const limitArray = (array: any[], limit: number) => {
  if (array.length >= 3) return array.slice(0, limit);
  else return array;
};

export const removeDuplicates = (array: string[]): string[] => {
  let uniqueStrings: string[] = [];
  array?.forEach((element) => {
    if (!uniqueStrings.includes(element.trim())) {
      uniqueStrings.push(element.trim());
    }
  });

  return uniqueStrings;
};

export const getUniqueCharacters = (
  entries: DictionaryEntry[],
): DictionaryEntry[] => {
  return entries.filter(
    (element, index) =>
      entries.findIndex((obj) => obj.simplified === element.simplified) ===
      index,
  );
};
