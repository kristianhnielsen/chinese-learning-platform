import { getQueryFilteredDictionary } from "../lib/database";
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
    searchParams?.sort
  );

  return (
    <section className="grid justify-items-center gap-4 w-full">
      <div className="grid gap-2 text-light text-sm text-center">
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
        <div className="bg-light text-dark flex flex-col overflow-y-scroll max-w-xl w-full max-h-80 rounded-lg">
          {filteredDictionary.map((dictEntry) => (
            <a
              key={dictEntry.id}
              href={`/dictionary/${dictEntry.simplified}`}
              className="border-b-2 flex flex-col hover:bg-accent/20 p-4 transition-all border-accent"
            >
              <span>
                <span className="text-secondary font-semibold">
                  {dictEntry.simplified}
                </span>
                {" - "}
                <em>{dictEntry.pinyin_diacritic}</em>
              </span>
              <span className="leading-tight text-ellipsis max-w-full overflow-x-clip text-nowrap">
                {splitEnglishDefinitions(dictEntry).join("; ")}
              </span>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
