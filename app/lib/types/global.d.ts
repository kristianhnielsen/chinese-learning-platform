import type { Database as DB } from "@/app/lib/types/database.types";

declare global {
  type Database = DB;
  type DictionaryEntry = DB["public"]["Tables"]["dictionary"]["Row"];
  type CharacterMatchEntry = DB["public"]["Tables"]["character-match"]["Row"];
  type CharacterMatchSettings = {
    hsk1: boolean;
    hsk2: boolean;
    hsk3: boolean;
    hsk4: boolean;
    hsk5: boolean;
    hsk6: boolean;
    nonhsk: boolean;
  };
}
