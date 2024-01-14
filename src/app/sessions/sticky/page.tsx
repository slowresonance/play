"use client";

import React from "react";
import { motion, useAnimate } from "framer-motion";

import "overlayscrollbars/styles/overlayscrollbars.css";
import Scroll from "./scroll";

const Index = () => {
  const sessions = [
    [
      { name: "Book Binding Techniques", info: "34 / 2" },
      { name: "Time Tracking Project", info: "20 / 1" },
      { name: "Blot example templates", info: "22 / 2" },
      { name: "New Demos Toronto", info: "22 / 2" },
    ],
    [{ name: "Cargo design philosophy", info: "31 / 2" }],
    [
      { name: "Adlerian Psychology", info: "22 / 2" },
      { name: "The Hidden Life of Trees", info: "31 / 2" },
    ],
    [
      { name: "New Computer Manifesto", info: "22 / 2" },
      { name: "Motion Inspiration", info: "31 / 2" },
    ],
    [
      { name: "Pinterest Spaces", info: "22 / 2" },
      { name: "State Machines for Interfaces", info: "31 / 2" },
      { name: "Arc's link sharing", info: "31 / 2" },
    ],
    [
      { name: "New Computer Manifesto", info: "22 / 2" },
      { name: "Motion Inspiration", info: "31 / 2" },
    ],
    [
      { name: "Pinterest Spaces", info: "22 / 2" },
      { name: "State Machines for Interfaces", info: "31 / 2" },
      { name: "Arc's link sharing", info: "31 / 2" },
    ],
  ];

  return (
    <div className="flex h-screen w-screen select-none flex-col items-center justify-center bg-[#151515]">
      <Scroll>
        <div className="flex max-h-[400px] w-[434px] flex-col">
          {sessions.map((group, index) => (
            <div key={index}>
              <div className="sticky top-0 z-50 text-[12px] text-[#636363]">
                <div className="title-bg pl-3 pt-4">{index + 4}th January</div>
                <div className="overflow-gradient-top h-[16px]"></div>
              </div>
              <div className="">
                {group.map((session) => (
                  <motion.div
                    className="relative flex h-[36px] w-[404px] rounded bg-[#151515] last-of-type:sticky last-of-type:top-0 hover:bg-[#202020]"
                    layout
                    key={session.name}
                  >
                    <div className="absolute h-full rounded bg-[#2F2F2F]"></div>
                    <div className="relative z-20 flex w-full items-center justify-between rounded">
                      <div className="ml-3">{session.name}</div>
                      <motion.div className="mr-3 flex text-[12px] text-[#ffffff] opacity-30">
                        <div className="">{session.info}</div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Scroll>
    </div>
  );
};

export default Index;
