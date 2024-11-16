"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useShotsFired } from "@/context/ShotsFiredContext";
export default function Model({ isPointerLocked }) {
  const { camera, scene } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const { shotsFired } = useShotsFired();

  useEffect(() => {
    if (isPointerLocked) return;

    const checkIntersections = () => {
      raycaster.current.setFromCamera({ x: 0, y: 0 }, camera);
      const intersects = raycaster.current.intersectObjects(
        scene.children,
        true
      );

      const filteredIntersections = intersects
        .map((intersect) =>
          intersect.object.name.length > 0 ? intersect.object.name : null
        )
        .filter((name) => name != null);

      if (filteredIntersections.length > 0) {
        console.log("Intersected objects:", filteredIntersections);

        if (shotsFired) {
          console.log("Rabbit caught! Good job! :)");
        }
      }
    };

    const animate = () => {
      checkIntersections();
      requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animate);
  }, [camera.position, scene, shotsFired]);

  return null;
}
