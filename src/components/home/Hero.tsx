import React, { FC } from "react";

const Hero: FC = () => {
  return (
    <div className="py-14 space-y-12 text-center md:py-24 md:space-y-14 lg:py-28 lg:space-y-16">
      <h1 className="inline-block text-7xl font-black tracking-wide select-none bg-gradient-to-r from-blue-500 to-violet-400 text-transparent bg-clip-text drop-shadow-lg drop-shadow-blue-200 md:text-8xl  lg:text-9xl">
        Autolib
      </h1>
      <div className="max-w-[500px] pb-1 mx-auto  md:pb-3 md:leading-relaxed lg:max-w-[700px]  lg:pb-8 lg:text-lg">
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
