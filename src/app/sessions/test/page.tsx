"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TextCarousel: React.FC = () => {
  const items = ["23/2", "23rd November 2023"];
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentItemIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [items.length]);

  return (
    <div className="relative flex h-10 flex-col items-center overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={currentItemIndex}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 2 }}
          className="absolute"
        >
          {items[currentItemIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TextCarousel;
