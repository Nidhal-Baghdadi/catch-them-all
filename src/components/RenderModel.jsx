"use client";
import { Canvas } from "@react-three/fiber";
import clsx from "clsx";
import { Environment } from "@react-three/drei";
import React, { Suspense, useEffect, useState, useRef } from "react";
import Loader from "@/components/models/Loader";

import { useCatPosition } from "@/context/CatPositionContext";
import { useShotsFired } from "@/context/ShotsFiredContext";
import CrosshairRaycast from "@/components/models/CrosshairRaycast";

import {
  Stars,
  Sparkles,
  KeyboardControls,
  PointerLockControls,
} from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Cat from "@/components/models/Cat";
import Mouse from "@/components/models/Mouse";

const RenderModel = ({ children, className, lockControls, onData }) => {
  const [isPointerLocked, setIsPointerLocked] = useState(false);
  const [aspect, setAspect] = useState(1);
  const { catPosition } = useCatPosition();
  const { shotsFired, setShotsFired } = useShotsFired();
  useEffect(() => {
    if (window) {
      setAspect(window.innerWidth / window.innerHeight);
    }

    const handlePointerLockChange = () => {
      const isLocked = document.pointerLockElement !== null;
      setIsPointerLocked(isLocked);
    };

    document.addEventListener("pointerlockchange", handlePointerLockChange);
    onData(isPointerLocked);

    return () =>
      document.removeEventListener(
        "pointerlockchange",
        handlePointerLockChange
      );
  }, [catPosition, isPointerLocked, shotsFired]);

  const handlePoinreDown = (e) => {
    if (lockControls && e.button === 0) {
      console.log("Pointer down: setting shotsFired to true");
      setShotsFired(true);
    }
  };

  const handlePointerUp = (e) => {
    if (lockControls && e.button === 0) {
      console.log("Pointer up: setting shotsFired to false");
      setShotsFired(false);
    }
  };

  return (
    <Canvas
      className={clsx("w-screen h-screen z-10 relative", className)}
      camera={{
        fov: 65,
        aspect: aspect,
        far: 7000,
        near: 0.1,
      }}
      onPointerDown={handlePoinreDown}
      onPointerUp={handlePointerUp}
    >
      <Environment
        files="/light/preller_drive_1k.hdr"
        background
        backgroundBlurriness={0.35}
      />

      <ambientLight intensity={0.35} />

      <Stars
        radius={3000}
        depth={300}
        count={16000}
        factor={4}
        saturation={1.5}
        fade
        speed={0.3}
      />
      <Sparkles
        count={7300}
        size={73}
        speed={2}
        opacity={0.8}
        scale={3000}
        color="white"
        blendMode="screen"
      />

      <Suspense fallback={<Loader />} scale={0.7}>
        <Physics>
          {isPointerLocked && (
            <KeyboardControls
              map={[
                { name: "forward", keys: ["ArrowUp", "z", "Z"] },
                { name: "backward", keys: ["ArrowDown", "s", "S"] },
                { name: "left", keys: ["ArrowLeft", "q", "Q"] },
                { name: "right", keys: ["ArrowRight", "d", "D"] },
                { name: "jump", keys: ["Space"] },
                { name: "speed", keys: ["Shift"] },
              ]}
            >
              <Cat initialPosition={catPosition} />
            </KeyboardControls>
          )}
          <CrosshairRaycast isPointerLocked={isPointerLocked} />
          <Mouse />
          {children}
        </Physics>
      </Suspense>

      {lockControls && <PointerLockControls />}
    </Canvas>
  );
};

export default RenderModel;
