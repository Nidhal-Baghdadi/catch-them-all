import React from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/models/plane.glb");
  return (
    <>
      <RigidBody
        colliders="trimesh"
        type="fixed"
        enabledRotations={[false, false, false]}
      >
        <group {...props} dispose={null} scale={10} name="plane">
          <mesh
            geometry={nodes.Plane.geometry}
            material={materials["Material.001"]}
            position={[-4.23, 95.093, -431.599]}
            scale={320.698}
          />
          <instancedMesh
            args={[
              nodes.mesh1406566609.geometry,
              materials.PaletteMaterial001,
              200,
            ]}
            instanceMatrix={nodes.mesh1406566609.instanceMatrix}
          />
          <instancedMesh
            args={[
              nodes.mesh1406566609_1.geometry,
              materials.PaletteMaterial001,
              200,
            ]}
            instanceMatrix={nodes.mesh1406566609_1.instanceMatrix}
          />
          <instancedMesh
            args={[
              nodes.mesh1406566609_2.geometry,
              materials.PaletteMaterial001,
              200,
            ]}
            instanceMatrix={nodes.mesh1406566609_2.instanceMatrix}
          />
          <instancedMesh
            args={[
              nodes.mesh1406566609_3.geometry,
              materials.PaletteMaterial001,
              200,
            ]}
            instanceMatrix={nodes.mesh1406566609_3.instanceMatrix}
          />
          <instancedMesh
            args={[
              nodes["Tree_green01_Cube007-Mesh"].geometry,
              materials.PaletteMaterial001,
              999,
            ]}
            instanceMatrix={nodes["Tree_green01_Cube007-Mesh"].instanceMatrix}
          />
          <instancedMesh
            args={[
              nodes["Tree_green01_Cube007-Mesh_1"].geometry,
              materials.GreenLeaf_Tree01,
              999,
            ]}
            instanceMatrix={nodes["Tree_green01_Cube007-Mesh_1"].instanceMatrix}
          />
        </group>
      </RigidBody>
    </>
  );
}

useGLTF.preload("/models/plane.glb");
