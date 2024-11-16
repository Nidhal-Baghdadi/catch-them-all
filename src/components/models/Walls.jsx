import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/models/walls-transformed.glb");

  useEffect(() => {
    if (materials) {
      materials["Material.003"].opacity = 0.02;
    }
  });

  return (
    <RigidBody
      colliders="trimesh"
      type="fixed"
      enabledRotations={[false, false, false]}
    >
      <group {...props} dispose={null}>
        <mesh
          geometry={nodes.Cube.geometry}
          material={materials["Material.003"]}
          position={[0, 0, 0]}
          scale={2500}
        />
      </group>
    </RigidBody>
  );
}

useGLTF.preload("/models/walls-transformed.glb");
