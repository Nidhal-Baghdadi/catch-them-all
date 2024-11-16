import * as THREE from "three";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useGLTF, useAnimations } from "@react-three/drei";

const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

export default function Model(props) {
  const group = useRef();

  const { nodes, materials, animations } = useGLTF("/models/Rabbit.glb");

  const { actions } = useAnimations(animations, group);

  useFrame(() => {
    actions[
      "CharacterArmature|CharacterArmature|CharacterArmature|Walk_Holding"
    ].play();
  });
  return (
    <RigidBody
      colliders={"ball"}
      mass={8}
      type="dynamic"
      enabledRotations={[false, true, false]}
      position={[30, 35, 0]}
      restitution={3}
    >
      <group
        ref={group}
        {...props}
        dispose={null}
        position={[0, 0, 0]}
        name="mouse"
      >
        <group name="Root_Scene">
          <group name="RootNode">
            <group
              name="CharacterArmature"
              rotation={[-Math.PI / 2, 0, 0]}
              scale={350}
            >
              <primitive object={nodes.Root} />
            </group>
            <skinnedMesh
              name="Rabbit"
              geometry={nodes.Rabbit.geometry}
              material={materials.AtlasMaterial}
              skeleton={nodes.Rabbit.skeleton}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={140}
            />
            <skinnedMesh
              name="Eyes"
              geometry={nodes.Eyes.geometry}
              material={materials.AtlasMaterial}
              skeleton={nodes.Eyes.skeleton}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={140}
            />
          </group>
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload("/models/Animated_Robot.glb");
