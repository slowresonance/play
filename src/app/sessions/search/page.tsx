"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

const Page = () => {
  const [mode, setMode] = useState("duration");
  const [isExpanded, setIsExpanded] = useState(false);
  const [duration, setDuration] = useState(0.1);
  const [bounce, setBounce] = useState(0);
  const [damping, setDamping] = useState(10);
  const [mass, setMass] = useState(1);
  const [stiffness, setStiffness] = useState(100);
  const [velocity, setVelocity] = useState(2);
  const [restSpeed, setRestSpeed] = useState(0.01);
  const [restDelta, setRestDelta] = useState(0.01);

  const getTransition = () => {
    if (mode === "duration") {
      return {
        type: "spring",
        duration: duration,
        bounce: bounce,
      };
    } else {
      return {
        type: "spring",
        damping: damping,
        mass: mass,
        stiffness: stiffness,
      };
    }
  };

  return (
    <div className="flex h-[1000px] w-screen cursor-pointer select-none flex-col items-center justify-center gap-2 bg-[#151515]">
      <div className="flex flex-wrap justify-center md:gap-10">
        <div
          className="mt-4 flex w-[360px] items-center justify-between gap-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex gap-2">
            <div className="h-[34px] w-[34px] rounded bg-[#292929]"></div>
            <motion.div
              className="h-[34px] rounded bg-[#292929]"
              initial={{ width: 34 }}
              animate={isExpanded ? { width: 276 } : { width: 34 }}
              whileTap={{ scale: 0.95 }}
              transition={getTransition()}
            ></motion.div>
          </div>
          <div className="h-[34px] w-[34px] cursor-pointer rounded bg-[#292929] hover:bg-[#292929]"></div>
        </div>
        <div className="text-[#ededed]">
          <div
            className={cn(
              "mt-10 w-[360px] border border-dashed border-[#292929] p-4 text-[14px] text-[#ededed]",
              {
                "border-[#676767]": mode === "duration",
              },
            )}
            onClick={() => setMode("duration")}
          >
            <div className="mb-2 mt-8 first-of-type:mt-0">
              duration: {duration}
            </div>
            <Slider
              defaultValue={[duration]}
              max={0.8}
              step={0.05}
              onValueChange={([value]) => setDuration(value)}
            />
            <div className="mb-2 mt-8">bounce: {bounce}</div>
            <Slider
              defaultValue={[bounce]}
              max={1}
              step={0.05}
              onValueChange={([value]) => setBounce(value)}
            />
          </div>

          <div
            className={cn(
              "mt-10 w-[360px] border border-dashed border-[#292929] p-4 text-[14px] text-[#ededed]",
              {
                "border-[#676767]": mode === "damping",
              },
            )}
            onClick={() => setMode("damping")}
          >
            <div className="mb-2 mt-8 first-of-type:mt-0">
              damping: {damping}
            </div>
            <Slider
              defaultValue={[damping]}
              max={100}
              step={2}
              onValueChange={([value]) => setDamping(value)}
            />
            <div className="mb-2 mt-8">mass: {mass}</div>
            <Slider
              defaultValue={[mass]}
              max={5}
              step={0.2}
              onValueChange={([value]) => setMass(value)}
            />
            <div className="mb-2 mt-8">stiffness: {stiffness}</div>
            <Slider
              defaultValue={[stiffness]}
              max={300}
              step={10}
              onValueChange={([value]) => setStiffness(value)}
            />
          </div>

          <div className="mt-10 w-[360px] border border-[#292929] p-4 text-[14px] text-[#ededed]">
            <div className="mb-2 mt-8 first-of-type:mt-0">
              velocity: {velocity}
            </div>
            <Slider
              defaultValue={[velocity]}
              max={10}
              step={0.5}
              onValueChange={([value]) => setVelocity(value)}
            />
            <div className="mb-2 mt-8">restSpeed: {restSpeed}</div>
            <Slider
              defaultValue={[restSpeed]}
              max={1}
              step={0.1}
              onValueChange={([value]) => setRestSpeed(value)}
            />
            <div className="mb-2 mt-8">restDelta: {restDelta}</div>
            <Slider
              defaultValue={[restDelta]}
              max={1}
              step={0.1}
              onValueChange={([value]) => setRestDelta(value)}
            />
          </div>
          <div className="mt-10 w-[360px] p-4">
            <RadioGroup value={mode}>
              <div
                className="mb-2 flex items-center gap-2"
                onClick={() => {
                  setMode("duration");
                }}
              >
                <RadioGroupItem value="duration" id="duration" />
                <Label htmlFor="duration">Duration and Bounce</Label>
              </div>
              <div
                className="mb-2 flex items-center gap-2"
                onClick={() => {
                  setMode("damping");
                }}
              >
                <RadioGroupItem value="damping" id="damping" />
                <Label htmlFor="damping">Damping, mass and stiffness</Label>
              </div>
            </RadioGroup>
            <div className="mt-2 text-[13px]">
              Note: duration and bounce will be overridden if stiffness, damping
              or mass are set.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
