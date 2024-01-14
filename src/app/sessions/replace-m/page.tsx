"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimate, useTime } from "framer-motion";
import usePressHandlers from "@/hooks/use-press-handlers";

import useStateMachine from "@cassiozen/usestatemachine";

const Auxiliary = ({
  isHovered,
  info,
  date,
}: {
  isHovered: boolean;
  info: string;
  date: string;
}) => {
  return (
    <motion.div className="mr-3 flex text-[12px] text-[#ffffff] opacity-30">
      {isHovered ? (
        <motion.div
          className=""
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          key="replace-msg"
        >
          Hold to replace
        </motion.div>
      ) : (
        <div className="">{info}</div>
      )}
    </motion.div>
  );
};

const Session = ({
  name,
  info,
  date,
  handleHover,
}: {
  name: string;
  info: string;
  date: string;
  handleHover: (name: string | null) => void;
}) => {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      className="relative flex h-[36px] w-[404px] rounded bg-[#151515] hover:bg-[#202020]"
      onMouseEnter={() => {
        setHover(true);
        handleHover(date);
      }}
      onMouseLeave={(e) => {
        setHover(false);
        handleHover(null);
      }}
      layout
    >
      <div className="absolute h-full rounded bg-[#2F2F2F]"></div>
      <div className="relative z-20 flex w-full items-center justify-between rounded">
        <div className="ml-3">{name}</div>
        <Auxiliary isHovered={hover} info={info} date={date} />
      </div>
    </motion.div>
  );
};

const Index = () => {
  const [sessions, setSessions] = useState([
    [
      {
        name: "Book Binding Techniques",
        info: "34 / 2",
        date: "12:03 PM, 4th January",
      },
      {
        name: "Time Tracking Project",
        info: "20 / 1",
        date: "9:06 AM, 4th January",
      },
    ],
    [
      {
        name: "Adlerian Psychology",
        info: "22 / 2",
        date: "11:19 PM, 23rd December, 2023",
      },
      {
        name: "The Hidden Life of Trees",
        info: "31 / 2",
        date: "07:42 PM, 23rd December, 2023",
      },
    ],
  ]);

  const [hoveredDate, setHoveredDate] = useState<string | null>(null);

  return (
    <div className="flex h-screen w-screen select-none flex-col items-center justify-center bg-[#151515]">
      <div className="flex min-h-[400px] flex-col">
        <div className="mx-3 mt-4 flex h-[30px] justify-between text-[12px] text-[#636363]">
          <div className="">
            {hoveredDate ? hoveredDate : "or Replace an exisiting session"}
          </div>
          {/* <div className="">Hover for details</div> */}
        </div>
        {sessions.map((group, index) => (
          <div key={index} className="mb-4">
            {group.map((session) => (
              <Session
                name={session.name}
                info={session.info}
                date={session.date}
                key={session.name}
                handleHover={(date: string | null) => setHoveredDate(date)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
