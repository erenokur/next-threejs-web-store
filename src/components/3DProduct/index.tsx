import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import React, { useRef } from "react";

const ProductThreeD = () => {
  const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
  const boxMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const boxMesh = useRef();
  useFrame(() => {
    boxMesh.current.rotation.x += 0.01;
    boxMesh.current.rotation.y += 0.01;
  });
  return (
    <mesh
      geometry={boxGeometry}
      material={boxMaterial}
      position={[0, 0, 0]}
      ref={boxMesh}
    />
  );
};

const App = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <ProductThreeD />
      </Canvas>
    </div>
  );
};

export default App;
