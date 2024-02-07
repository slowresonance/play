"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimate } from "framer-motion";
import useStateMachine from "@cassiozen/usestatemachine";

const Page = () => {
  const [title, setTitle] = useState("or Replace an exisiting session");
  const [scope, animate] = useAnimate();
  const [current, setCurrent] = useState("");

  const [state, send] = useStateMachine({
    initial: "changed",
    states: {
      changing: {
        on: {
          CHANGE: "changed",
        },
        effect() {
          animate([["#title", { opacity: 0 }, { duration: 0.2 }]]).then(() => {
            send("CHANGE");
          });
          return () => {
            setTitle(current);
          };
        },
      },
      changed: {
        on: {
          CHANGE: "changing",
        },
        effect() {
          animate([["#title", { opacity: 1 }, { duration: 0.2 }]]);
        },
      },
    },
  });

  const handleChange = (text: string) => {
    setCurrent(text);
    send("CHANGE");
  };

  return (
    <div
      className="flex h-screen w-screen select-none flex-col items-center justify-center bg-[#151515]"
      ref={scope}
    >
      <div
        className={
          "text-noir-500 ml-[42px] w-fit cursor-pointer select-none text-[12px] text-[#737373]"
        }
      >
        <div className="w-[400px]">
          <motion.div
            id="title"
            className=""
            style={{
              height: 18,
              y: 0,
              opacity: 1,
            }}
          >
            {title}
          </motion.div>
        </div>
      </div>
      <div className="mt-10 flex w-[400px] gap-2">
        <div
          className="h-10 w-10 rounded bg-[#202020] hover:bg-[#343434]"
          onMouseEnter={() => handleChange("12:03 PM, 14th January")}
          //   onMouseLeave={() => handleChange("or Replace an exisiting session")}
          onClick={() => handleChange("12:03 PM, 12th January")}
        ></div>
        <div
          className="h-10 w-10 rounded bg-[#202020] hover:bg-[#343434]"
          onMouseEnter={() => handleChange("4:01 PM, 11th January")}
          //   onMouseLeave={() => handleChange("or Replace an exisiting session")}
        ></div>
        <div
          className="h-10 w-10 rounded bg-[#202020] hover:bg-[#343434]"
          onMouseEnter={() => handleChange("7:07 AM, 7th January")}
          //   onMouseLeave={() => handleChange("or Replace an exisiting session")}
        ></div>
        <div
          className="h-10 w-10 rounded bg-[#202020] hover:bg-[#343434]"
          onMouseEnter={() => handleChange("8:03 PM, 8th January")}
          //   onMouseLeave={() => handleChange("or Replace an exisiting session")}
        ></div>
        <div
          className="h-10 w-10 rounded bg-[#202020] hover:bg-[#343434]"
          onMouseEnter={() => handleChange("1:03 AM, 19th January")}
          //   onMouseLeave={() => handleChange("or Replace an exisiting session")}
        ></div>
      </div>
    </div>
  );
};

export default Page;
