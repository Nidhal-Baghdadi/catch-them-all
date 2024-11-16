import * as THREE from "three";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useCatPosition } from "@/context/CatPositionContext";

const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

export default function Model(props) {
  const ref = useRef();
  const { initialPosition } = props;
  const [, get] = useKeyboardControls();
  const [playerSpeed, setPlayerSpeed] = useState(17);

  // Get the context setter for cat position
  const { setCatPosition } = useCatPosition();

  useFrame((state) => {
    const { forward, backward, left, right, jump, speed } = get();

    if (ref.current != null) {
      const velocity = ref.current.linvel();

      // update camera

      state.camera.position.y = 115;
      state.camera.position.x = ref.current.translation().x;
      state.camera.position.z = ref.current.translation().z;
      state.camera.position.y = ref.current.translation().y;

      // movement
      frontVector.set(0, 0, backward - forward);
      sideVector.set(left - right, 0, 0);
      direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(playerSpeed)
        .applyEuler(state.camera.rotation);

      ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });

      // jumping
      if (jump) {
        ref.current.setLinvel({
          x: direction.x,
          y: 35,
          z: direction.z,
        });
      }

      speed ? setPlayerSpeed(65) : setPlayerSpeed(35);

      setCatPosition([
        ref.current.translation().x,
        ref.current.translation().y,
        ref.current.translation().z,
      ]);
    }
  });
  return (
    <>
      <RigidBody
        ref={ref}
        colliders={"ball"}
        type="dynamic"
        enabledRotations={[false, false, false]}
        position={initialPosition}
        gravityScale={4}
        restitution={1.5}
      >
        <CapsuleCollider args={[0.75, 0.5]} />
      </RigidBody>
    </>
  );
}
