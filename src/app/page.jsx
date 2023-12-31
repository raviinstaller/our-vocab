"use client";

import Card from "@/components/Card";
import Navbar from "@/components/common/Navbar";
import Filters from "@/components/home/Filters";
import Footer from "@/components/common/Footer";
import Hero from "@/components/home/Hero";
import { WordContext } from "@/providers/WordsProvider";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const { filtedredData, loading, searchValue } = useContext(WordContext);

  return (
    <>
      <Navbar />
      <Hero />
      <Filters />
      {!loading && filtedredData.length > 0 && (
        <div className="container mt-10 mb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {filtedredData.map((item, _i) => (
            <Card key={_i} {...item} />
          ))}
        </div>
      )}
      {!loading && filtedredData.length < 1 && (
        <Placeholder title={"No words found."} emoji={"😔"} />
      )}
      {loading && filtedredData.length < 1 && (
        <Placeholder title={"Loading words..."} emoji={"🙂"} />
      )}
      <Footer />
    </>
  );
}

const Placeholder = ({ title, emoji }) => {
  return (
    <div className="container mt-10 mb-20 py-20 flex flex-col items-center justify-center gap-4 bg-gray-100 dark:bg-white/[0.02] rounded-lg">
      <p className="text-5xl">{emoji}</p>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h2>
    </div>
  );
};
