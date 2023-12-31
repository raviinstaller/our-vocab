import { WordContext } from "@/providers/WordsProvider";
import React, { useContext } from "react";
import toSentenceCase from "../toSentenceCase";

const Filters = () => {
  const {
    searchValue,
    setSearchValue,
    sources,
    selectedSource,
    setSelectedSource,
  } = useContext(WordContext);

  return (
    <>
      <div className="container mt-20 flex flex-col sm:flex-row gap-4">
        <div className="relative sm:w-1/2">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="block w-full p-4 ps-10 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search by word or source here..."
          />
        </div>

        <div className="flex gap-2 items-center grow sm:justify-end">
          <label className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Filter by Source:
          </label>
          <select
            defaultValue={selectedSource ? selectedSource : "default"}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="default">All</option>
            {sources.map((item, _i) => (
              <option key={_i} value={item}>
                {toSentenceCase(item)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default Filters;
