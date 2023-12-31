import React from "react";
import NewWordForm from "./NewWordForm";

const Hero = () => {
  return (
    <section className="bg-gray-100 py-20 dark:bg-white/[0.02]">
      <div className="py-8 px-4 mx-auto max-w-screen-md text-center lg:py-16">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          Let's create our <br></br>
          Vocabulary together.
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-8 lg:px-20 dark:text-gray-400">
          Here we can add the words that we learn daily, doesn't matter if its
          in any video or book.
        </p>
        <NewWordForm />
      </div>
    </section>
  );
};

export default Hero;
