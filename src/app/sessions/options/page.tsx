"use client";

import { useAnimate, motion } from "framer-motion";
import { PlusIcon, WindowIcon, WindowsIcon, ImportIcon } from "../icons";
import { useEffect, useState } from "react";

const Index = () => {
  const [scope, animate] = useAnimate();
  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);

  const selectedVariants = {
    collapsed: {
      opacity: 0,
    },
    expanded: {
      opacity: 1,
    },
  };

  const enterAnimation = async () => {
    animate(
      "#count",
      {
        display: "flex",
        marginLeft: "8px",
        width: "auto",
      },
      {
        duration: 0.1,
      },
    );
    animate(
      ".margin-right-scope",
      { marginRight: "4px" },
      {
        duration: 0.1,
      },
    );
    await animate("#count", { opacity: 1 }, { duration: 0.15 });
  };

  const exitAnimation = async () => {
    await animate("#count", { opacity: 0 }, { duration: 0.15 });
    await animate("#count", { width: 0, gap: 0, marginLeft: 0 });
    await animate("#count", { display: "none" });
  };

  useEffect(() => {
    if (clicked) {
      enterAnimation();
    } else {
      exitAnimation();
    }
  }, [clicked]);

  return (
    <div
      className="flex h-screen w-screen select-none flex-col items-center justify-center bg-[#151515]"
      ref={scope}
      onClick={() => setClicked(!clicked)}
    >
      <div
        className="flex w-[300px] justify-end gap-2"
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        <div className="flex">
          <motion.div
            className="relative z-10 mr-2 flex h-[34px] cursor-pointer items-center justify-center gap-2 rounded bg-[#202020] px-4 text-[#7D7D7C] opacity-70 hover:bg-[#2F2F2F]"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: hover || clicked ? 1 : 0,
            }}
            id="window"
          >
            <WindowIcon />
          </motion.div>
          <motion.div
            className={`relative z-20 mr-2 flex h-[34px] cursor-pointer items-center justify-center rounded bg-[#202020] px-4 text-[#7D7D7C] hover:bg-[#2F2F2F] ${
              clicked && "bg-[#2f2f2f]"
            }`}
            id="windows"
            variants={selectedVariants}
            initial="collapsed"
            animate={hover || clicked ? "expanded" : "collapsed"}
          >
            <WindowsIcon />
            <motion.div
              className=""
              id="count"
              style={{ opacity: 0, width: 0, gap: 0, marginLeft: 0 }}
            >
              <span className="margin-right-scope text-[#7D7D7C]">46</span>
              <span className="margin-right-scope text-[#525251]">/</span>
              <span className="text-[#7D7D7C]">2</span>
            </motion.div>
          </motion.div>
          <motion.div
            className="relative z-30 flex h-[34px] cursor-pointer items-center justify-center gap-2 rounded bg-[#202020] px-4 opacity-70 hover:bg-[#2F2F2F]"
            id="import"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: hover || clicked ? 1 : 0,
            }}
          >
            <ImportIcon />
          </motion.div>
        </div>
        <div
          className="flex h-[34px] w-[34px] cursor-pointer items-center
          justify-center rounded bg-[#151515] hover:bg-[#202020]"
        >
          <motion.div
            className=""
            initial={{
              rotate: 0,
            }}
            animate={{
              rotate: clicked ? 45 : 0,
            }}
            transition={{
              ease: "anticipate",
            }}
          >
            <PlusIcon />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;
