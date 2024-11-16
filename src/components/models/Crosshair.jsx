"use client";

import React from "react";

export default function Model({ isPointerLocked }) {
  return (
    <>
      {!isPointerLocked && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-[888]">
            <div className="bg-transparent w-4 h-4  flex flex-col items-center shadow-lg rounded-lg bg-opacity-30  backdrop-blur-[100rem] border-2 border-white"></div>
          </div>
        </>
      )}
    </>
  );
}
