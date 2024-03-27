"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { AiOutlineSearch } from "react-icons/ai";

export default function DictSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (term: string) => {
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
  };

  const handleSort = (sortby: string) => {
    const params = new URLSearchParams(searchParams);
    if (sortby) {
      params.set("sort", sortby);
    } else {
      params.delete("sort");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <search className="flex w-full max-w-xl flex-col items-center gap-4">
      <div className="flex w-full items-center gap-2 rounded-full bg-light p-4">
        <AiOutlineSearch className="h-8 w-8 fill-dark" />
        <input
          type="text"
          placeholder="Search..."
          className="h-full w-full bg-light indent-2 text-xl text-dark"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get("query")?.toString()}
        />
      </div>
      {searchParams.get("query") && (
        <label htmlFor="sort" className="flex items-center text-sm text-light">
          <select
            name="sort"
            id="sort"
            defaultValue={searchParams.get("sort") || "frequency-asc"}
            className="rounded-full bg-light px-4 py-2 text-dark"
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
