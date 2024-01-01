"use client";

import Link from "next/link";
import React, { useContext } from "react";
import toSentenceCase from "./toSentenceCase";
import { AuthContext } from "@/providers/AuthContext";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Card = ({ word, meaning, source, id }) => {
  const { user } = useContext(AuthContext);
  const admin = "lXmPnOxbTXgXVSx06Az7q7gXOXn1";

  const removeWord = async () => {
    await deleteDoc(doc(db, "words", id));
  };

  return (
    <div className="relative p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl transition-shadow">
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
      {user.uid === admin && (
        <button
          onClick={removeWord}
          className="absolute top-2 right-2 p-2 bg-gray-200 dark:bg-white/5 h-8 w-8 rounded-full flex items-center justify-center"
        >
          🗑️
        </button>
      )}
    </div>
  );
};

export default Card;
