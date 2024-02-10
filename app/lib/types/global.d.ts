import type { Database as DB } from "@/app/lib/types/database.types";

declare global {
  type Database = DB;
  type DictionaryEntry = DB["public"]["Tables"]["dictionary"]["Row"];
}
