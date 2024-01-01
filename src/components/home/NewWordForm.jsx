"use client";

import { doc, setDoc } from "firebase/firestore";
import React, { useContext, useRef, useState } from "react";
import { db } from "../../../firebase";
import { v4 as uuidv4 } from "uuid";
import { WordContext } from "@/providers/WordsProvider";
import { AuthContext } from "@/providers/AuthContext";

const NewWordForm = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isUpdatingSource, setIsUpdatingSource] = useState(false);
  const [word, setWord] = useState("");
  const [source, setSource] = useState("");
  const [meaning, setMeaning] = useState("");

  const meaningRef = useRef();

  const { sources } = useContext(WordContext);

  const { user, status, googleSignIn } = useContext(AuthContext);

  const resetForm = () => {
    setWord("");
    setMeaning("");
    setSource("");
    setIsDrawerVisible(false);
  };

  const handleWordSubmit = async (e) => {
    e.preventDefault();
    if (status === "unauthenticated") {
      await googleSignIn();
    }

    if (status === "authenticated") {
      setIsDrawerVisible(true);
      meaningRef?.current?.focus();
    }
  };

  const addToFirestore = async () => {
    if (word === "" || meaning === "" || source === "") return;
    if (status === "unauthenticated") return;
    resetForm();
    setDoc(doc(db, "words", uuidv4()), {
      word,
      meaning,
      source,
      user: {
        name: user.displayName,
        id: user.uid,
        image: user.photoURL,
      },
    }).catch((err) => console.log(err));

    if (!sources.includes(source)) {
      setDoc(doc(db, "sources", uuidv4()), {
        source,
      }).catch((err) => console.log(err));
    }
  };

  const addNewWord = (e) => {
    e.preventDefault();
    addToFirestore();
  };

  const handleMeaningInput = (e) => {
    if (e.nativeEvent.inputType === "insertLineBreak") {
      addToFirestore();
      return;
    }
    setMeaning(e.target.value);
  };

  const handleSourceUpdate = (e) => {
    setIsUpdatingSource(true);
    setSource(e.target.value);
    if (e.target.value === "") {
      setIsUpdatingSource(false);
    }
  };

  const filteredSources = sources.filter((i) =>
    i.toLowerCase().includes(source.toLowerCase())
  );

  return (
    <>
      <form
        onSubmit={handleWordSubmit}
        className="flex flex-col mx-auto sm:flex-row sm:justify-center sm:items-center max-w-md sm:mx-auto gap-2"
      >
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter new word here..."
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />

        <button
          type="submit"
          className="whitespace-nowrap inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          Add Word
        </button>
      </form>

      <div
        onClick={() => {
          setIsDrawerVisible(false);
          resetForm();
        }}
        className={`fixed bg-black/10 backdrop-blur-sm inset-0 h-full w-full z-[39] transition-opacity cursor-pointer ${
          isDrawerVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>
      <div
        className={`w-full max-w-lg fixed rounded-xl text-start top-1/2 left-1/2 z-40 p-10 overflow-y-auto -translate-x-1/2 transition-all bg-white  dark:bg-gray-800 ${
          isDrawerVisible
            ? "-translate-y-1/2 opacity-100"
            : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <h5 className="mb-4 text-3xl font-semibold text-gray-900 dark:text-white">
          Add new word
        </h5>
        <form className="w-full" onSubmit={addNewWord}>
          <div className="mb-5">
            <label
              htmlFor="word"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Word
            </label>
            <input
              type="text"
              ref={meaningRef}
              id="word"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Add your word"
              value={word}
              onFocus={() => setIsUpdatingSource(false)}
              onChange={(e) => setWord(e.target.value)}
            />
          </div>
          <div className="mb-5 relative">
            <label
              htmlFor="source"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Source
            </label>
            <input
              type="text"
              id="source"
              onFocus={() => setIsUpdatingSource(true)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select or add book/movie name"
              value={source}
              onChange={handleSourceUpdate}
            />
            {isUpdatingSource && sources.length > 0 && (
              <div className="absolute max-h-48 overflow-y-scroll top-20 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-xl">
                {filteredSources.map((item, _i) => (
                  <span
                    onClick={() => {
                      console.log("hii");
                      setSource(item);
                      setIsUpdatingSource(false);
                    }}
                    key={_i}
                    className="w-full block cursor-pointer text-start py-2 px-4 hover:bg-slate-200 dark:hover:bg-gray-800/50"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="meaning"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              tabIndex={1}
            >
              Meaning
            </label>
            <textarea
              type="meaning"
              onFocus={() => setIsUpdatingSource(false)}
              id="meaning"
              rows={5}
              value={meaning}
              onChange={handleMeaningInput}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default NewWordForm;
