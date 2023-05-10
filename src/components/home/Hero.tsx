import React, { FC } from "react";

const Hero: FC = () => {
  return (
    <div
      className="py-12 space-y-12 text-center 
    md:py-16 md:space-y-14 lg:py-20 lg:space-y-16"
    >
      <h1
        className="inline-block text-7xl font-black tracking-wide select-none bg-gradient-to-r from-blue-500 to-violet-400 text-transparent bg-clip-text drop-shadow-lg drop-shadow-blue-200
      md:text-8xl  lg:text-9xl"
      >
        Autolib
      </h1>
      <div
        className="max-w-[500px] mx-auto 
      md:leading-relaxed
      lg:max-w-[700px] lg:text-lg "
      >
        <p className="">Bored of common libraries?</p>
        <p className="">
          Visit our{" "}
          <span className="font-medium text-neutral-950">auto library</span> —
          library with automatic issue & acceptance of books. Here you will be
          able to get any book in our library automatically without any
          conversations
        </p>
      </div>
    </div>
  );
};

export default Hero;
