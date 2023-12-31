import Link from "next/link";
import React from "react";
import toSentenceCase from "./toSentenceCase";

const Card = ({ word, meaning, source = "unknown" }) => {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl transition-shadow">
      <p className="text-sm text-gray-400">{toSentenceCase(source)}</p>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {toSentenceCase(word)}
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {toSentenceCase(meaning)}
      </p>
      <Link
        href={`https://www.dictionary.com/browse/${word}`}
        target="_blank"
        className="text-blue-700 dark:text-blue-500 hover:underline"
      >
        See in dictionary
      </Link>
    </div>
  );
};

export default Card;
