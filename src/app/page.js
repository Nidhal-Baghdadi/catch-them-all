"use client"
import { useState, useRef, useEffect } from "react";
import RenderModel from "@/components/RenderModel"
import Plane from "@/components/models/Plane"
import Walls from "@/components/models/Walls";




import Menu from "@/components/models/Menu";

import Crosshair from "@/components/models/Crosshair";
import CrosshairRaycast from "@/components/models/CrosshairRaycast";


import { CatPositionProvider } from "@/context/CatPositionContext";
import { ShotsFiredProvider } from "@/context/ShotsFiredContext";


export default function Home() {

  const [lockControls, setLockControls] = useState(true);
  const [isPointerLocked, setIsPointerLocked] = useState(false);

  const audioRef = useRef(null);
  const onLoad = useRef(true)


  useEffect(() => {
    if (onLoad.current) {
      onLoad.current = false;
      audioRef.current.play().catch((error) => {
        console.log("Autoplay was prevented by the browser");
      });
    }


  });

  const handleData = (data) => {

    setIsPointerLocked(data);
  };

  const handleOnHover = () => {
    setLockControls(false);

  };

  const handleOnLeave = () => {
    setLockControls(true);

  };

  const handleOnClick = (sound) => {

    if (!sound) {
      audioRef.current.play();
    }
    else {
      audioRef.current.pause();

    }

  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative bg-gradient-to-b from-[#20213b] to-[#28292b]">
      <div className="w-full h-screen">

        <audio ref={audioRef} src="/sound/ambient_music.mp3" loop autoPlay />
        <Menu onHover={handleOnHover} onLeave={handleOnLeave} onToggle={handleOnClick} isPointerLocked={isPointerLocked} />
        <Crosshair sPointerLocked={isPointerLocked} />
        <CatPositionProvider>
          <ShotsFiredProvider>
            <RenderModel lockControls={lockControls} onData={handleData} >
              <Plane />
              <Walls />
              <CrosshairRaycast isPointerLocked={isPointerLocked} />

            </RenderModel>
          </ShotsFiredProvider>
        </CatPositionProvider>

      </div>
    </main>
  );
}
