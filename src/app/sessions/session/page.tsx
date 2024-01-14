"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, useAnimate, useTime } from "framer-motion";
import usePressHandlers from "@/hooks/use-press-handlers";

const Auxiliary = ({
  isReplaced,
  isHovered,
  info,
}: {
  isReplaced: boolean;
  isHovered: boolean;
  info: string;
}) => {
  return (
    <motion.div className="mr-3 flex text-[12px] text-[#ffffff] opacity-30">
      {isHovered || isReplaced ? (
        <AnimatePresence mode="wait">
          {!isReplaced && (
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
          )}
          {isReplaced && (
            <motion.div
              className=""
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              key="replace-msg-2"
            >
              Replaced
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <div className="">{info}</div>
      )}
    </motion.div>
  );
};

const Session = ({
  name,
  info,
  handleReorder,
}: {
  name: string;
  info: string;
  handleReorder: (name: string) => void;
}) => {
  const [isReplaced, setIsReplaced] = useState(false);
  const [replaceScope, animateReplace] = useAnimate();

  const pressCallbacks = {
    onPressStart: () => {
      console.log("Press started!");
      animateReplace(
        replaceScope.current,
        { width: "100%" },
        {
          duration: 1 - replaceScope.current.offsetWidth / 404,
          ease: "easeOut",
          onComplete: () => {
            console.log("Replaced");
            setIsReplaced(true);
            setTimeout(() => {
              handleReorder(name);
              animateReplace(
                replaceScope.current,
                { width: "0%" },
                {
                  duration: 0,
                },
              );
              setIsReplaced(false);
            }, 1000);
          },
        },
      );
    },
    onPressEnd: () => {
      console.log("Press ended!", isReplaced);
      if (!isReplaced) {
        animateReplace(
          replaceScope.current,
          { width: "0%" },
          {
            // duration: 1.5,
            duration: replaceScope.current.offsetWidth / 404,
            ease: "easeOut",
            onComplete: () => {
              console.log("Replace cancelled");
            },
          },
        );
      }
    },
    onLeaveElement: () => {
      console.log("Left element!");
      if (!isReplaced) {
        animateReplace(
          replaceScope.current,
          { width: "0%" },
          {
            duration: 1,
            ease: "easeOut",
            onComplete: () => {
              console.log("Replace cancelled");
            },
          },
        );
      }
    },
  };

  const { onPressStart, onPressEnd, onLeaveElement } =
    usePressHandlers(pressCallbacks);

  const [hover, setHover] = useState(false);

  return (
    <motion.div
      className="relative flex h-[36px] w-[404px] rounded bg-[#151515] hover:bg-[#202020]"
      onMouseDown={onPressStart}
      onMouseUp={onPressEnd}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={(e) => {
        onLeaveElement(e);
        setHover(false);
      }}
      onTouchStart={onPressStart}
      onTouchEnd={onPressEnd}
      layout
    >
      <div
        className="absolute h-full rounded bg-[#2F2F2F]"
        ref={replaceScope}
      ></div>
      <div className="relative z-20 flex w-full items-center justify-between rounded">
        <div className="ml-3">{name}</div>
        <Auxiliary isReplaced={isReplaced} isHovered={hover} info={info} />
      </div>
    </motion.div>
  );
};

const Index = () => {
  const [sessions, setSessions] = useState([
    [
      { name: "Book Binding Techniques", info: "34 / 2" },
      { name: "Time Tracking Project", info: "20 / 1" },
    ],
    [
      { name: "Courage to be disliked", info: "22 / 2" },
      { name: "The Hidden Life of Trees", info: "31 / 2" },
    ],
  ]);

  const handleReorder = (name: string) => {
    const session = sessions.flat().find((s) => s.name === name);
    if (!session) return;
    const newSessions = sessions.map((group) =>
      group.filter((s) => s.name !== name),
    );
    newSessions[0].unshift(session);
    setSessions(newSessions);
  };

  return (
    <div className="flex h-screen w-screen select-none flex-col items-center justify-center bg-[#151515]">
      <div className="flex min-h-[400px] flex-col">
        {sessions.map((group, index) => (
          <div key={index}>
            <div
              className="ml-3 mt-4 h-[30px]
          text-[12px] text-[#636363]"
            >
              {index + 4}th January
            </div>
            {group.map((session) => (
              <Session
                name={session.name}
                info={session.info}
                key={session.name}
                handleReorder={handleReorder}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
