"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, usePresence } from "framer-motion";

const data = [
  { name: "Blot example templates", group: "Group 1" },
  { name: "New Demos Toronto", group: "Group 1" },

  { name: "Book Binding Techniques", group: "Group 2" },
  { name: "Time Tracking Project", group: "Group 2" },

  { name: "Pinterest Spaces", group: "Group 3" },
  { name: "State Machines for Interfaces", group: "Group 3" },
  { name: "Arc's link sharing", group: "Group 3" },
  { name: "Arc's link sharling", group: "Group 3" },
];

const Session = ({ name, handleRemove, isGroupPresent, safeToRemove }) => {
  return (
    <motion.div
      className=""
      key={name}
      initial={{ backgroundColor: "#00ff00" }}
      animate={
        isGroupPresent
          ? { backgroundColor: "#0000ff" }
          : {
              backgroundColor: "#ff0000",
            }
      }
      exit={{ backgroundColor: "#ff0000" }}
      onAnimationComplete={() => {
        if (!isGroupPresent) {
          safeToRemove();
        }
      }}
      onClick={handleRemove(name)}
      transition={{ duration: 0.4 }}
    >
      <div className="">{name}</div>
    </motion.div>
  );
};

const Group = ({ title, sessions, handleRemove }) => {
  const [isPresent, safeToRemove] = usePresence();

  console.log("isPresent", isPresent);

  useEffect(() => {
    handleRemove(sessions[0].name);
  }, [isPresent]);

  return (
    <div
      key={title}
      style={{
        marginBottom: "20px",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ backgroundColor: "#ff0000" }}
        transition={{ duration: 0.4 }}
        style={{
          marginBottom: "10px",
        }}
      >
        {title} : {sessions.length}
      </motion.div>
      <AnimatePresence>
        {sessions.map((session) => (
          <Session
            key={session.name}
            name={session.name}
            handleRemove={handleRemove}
            isGroupPresent={isPresent}
            safeToRemove={safeToRemove}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const Page = () => {
  const [sessions, setSessions] = useState(data);
  const [isPresent, safeToRemove] = usePresence();

  function groupData(data) {
    const groups = {};

    // First, group data by 'group' property
    data.forEach((item) => {
      const group = item.group;
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(item);
    });

    // Convert groups object to an array of objects with 'title' and 'sessions'
    return Object.keys(groups).map((groupTitle) => ({
      title: groupTitle,
      sessions: groups[groupTitle],
    }));
  }
  const [groups, setGroups] = useState(groupData(sessions));

  function removeSession(name) {
    return () => {
      const newSessions = sessions.filter((s) => s.name !== name);
      setSessions(newSessions);
      setGroups(groupData(newSessions));
    };
  }

  console.log(groups);

  return (
    <div className="">
      <AnimatePresence>
        {groups.map((group) => (
          <Group
            key={group.title}
            title={group.title}
            sessions={group.sessions}
            handleRemove={removeSession}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Page;
