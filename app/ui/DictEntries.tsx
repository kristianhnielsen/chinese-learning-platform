import { getQueryFilteredDictionary } from "../lib/database/dictionary";
import { splitEnglishDefinitions } from "../lib/utils";

export default async function DictEntries({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    sort?: string;
  };
}) {
  const filteredDictionary = await getQueryFilteredDictionary(
    searchParams?.query || "",
    searchParams?.sort,
  );

  return (
    <section className="grid w-full justify-items-center gap-4">
      <div className="grid gap-2 text-center text-sm text-light">
        <p>
          Showing results for <em>{searchParams?.query}</em>
        </p>

        {filteredDictionary.length === 1001 ? (
          <p>Showing the first 1000 results. Try to specify your search.</p>
        ) : filteredDictionary.length === 1 ? (
          <p>{filteredDictionary.length} result</p>
        ) : (
          <p>{filteredDictionary.length} results</p>
        )}
      </div>
      {filteredDictionary.length != 0 && (
        <div className="flex max-h-80 w-full max-w-xl flex-col overflow-y-scroll rounded-lg bg-light text-dark">
          {filteredDictionary.map((dictEntry) => (
            <a
              key={dictEntry.id}
              href={`/dictionary/${dictEntry.simplified}`}
              className="flex flex-col border-b-2 border-accent p-4 transition-all hover:bg-accent/20"
            >
              <span>
                <span className="font-semibold text-secondary">
                  {dictEntry.simplified}
                </span>
                {" - "}
                <em>{dictEntry.pinyin_diacritic}</em>
              </span>
              <span className="max-w-full overflow-x-clip text-ellipsis text-nowrap leading-tight">
                {splitEnglishDefinitions(dictEntry).join("; ")}
              </span>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
