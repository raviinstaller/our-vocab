"use client";

import { createContext, useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

export const WordContext = createContext();

export const WordContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [selectedSource, setSelectedSource] = useState("");

  useEffect(() => {
    const q = query(collection(db, "words"), orderBy("word"));
    const q2 = query(collection(db, "sources"));
    const getWords = onSnapshot(q, (querySnapshot) => {
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setData(arr);
      setLoading(false);
    });
    const getSources = onSnapshot(q2, (querySnapshot) => {
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data().source);
      });
      setSources(arr);
    });

    return () => {
      getWords();
      getSources;
    };
  }, []);

  const fData = data.filter((item) => {
    if (
      item.word.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      item.source.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    ) {
      return item;
    }
  });

  const filtedredData = fData.filter((item) => {
    if (selectedSource !== "default" && selectedSource !== "") {
      if (item.source === selectedSource) return item;
    } else {
      return item;
    }
  });

  return (
    <WordContext.Provider
      value={{
        filtedredData,
        loading,
        searchValue,
        setSearchValue,
        sources,
        selectedSource,
        setSelectedSource,
      }}
    >
      {children}
    </WordContext.Provider>
  );
};
