"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { AiOutlineSearch } from "react-icons/ai";
import { useDebouncedCallback } from "use-debounce";

export default function DictSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
      if (!params.get("sort")) {
        params.set("sort", "frequency-asc");
      }
    } else {
      params.delete("query");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 50);

  const handleSort = useDebouncedCallback((sortby: string) => {
    const params = new URLSearchParams(searchParams);
    if (sortby) {
      params.set("sort", sortby);
    } else {
      params.delete("sort");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 50);

  return (
    <search className="flex items-center flex-col gap-4 w-full">
      <div className="flex p-4 bg-light gap-2 items-center rounded-full w-full">
        <AiOutlineSearch className="fill-dark w-8 h-8" />
        <input
          type="text"
          placeholder="Search..."
          className="text-dark text-xl indent-2 h-full w-full bg-light"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get("query")?.toString()}
        />
      </div>
      {searchParams.get("query") && (
        <label
          htmlFor="sort"
          className="text-light text-sm flex gap-4 items-center"
        >
          Sort By:{" "}
          <select
            name="sort"
            id="sort"
            defaultValue={searchParams.get("sort") || "frequency-asc"}
            className="text-dark rounded-full px-4 py-2 bg-light"
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="frequency-asc">Frequency Low To High</option>
            <option value="frequency-desc">Frequency High To Low</option>
            <option value="hsk-asc">HSK Low To High</option>
            <option value="hsk-desc">HSK High To Low</option>
          </select>
        </label>
      )}
    </search>
  );
}
