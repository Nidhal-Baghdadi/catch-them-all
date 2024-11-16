"use client";

import React, { useState } from "react";
import { GoUnmute, GoMute } from "react-icons/go";

export default function Model({ onHover, onLeave, onToggle, isPointerLocked }) {
  const [sound, setSound] = useState(true);

  const toggleSound = () => {
    setSound(!sound);
    onToggle(sound);
  };

  const handlePointerEnter = () => {
    onHover();
  };

  const handlePointerLeave = () => {
    onLeave();
  };

  return (
    <>
      {!isPointerLocked && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-[999]">
            <div
              className="bg-white text-black w-[33vw] h-[50vh] p-4 pt-14 flex flex-col items-center shadow-lg rounded-lg bg-opacity-30  backdrop-blur-[100rem] border border-white border-opacity-60"
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            >
              <h1 className="text-4xl text-white">Catch me if you can!</h1>
              <p className="text-xl text-white mt-7 ">
                A fun and interactive hunting game
              </p>
            </div>
          </div>
          <button
            className="fixed top-5 z-[999] right-5 bg-white text-white  w-[3rem] h-[3rem] bg-opacity-30  backdrop-blur-[100rem] border border-black border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all active:border-white "
            onClick={toggleSound}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          >
            {sound === true ? <GoUnmute /> : <GoMute />}
          </button>
        </>
      )}
    </>
  );
}
