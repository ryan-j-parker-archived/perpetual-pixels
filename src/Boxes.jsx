/* eslint-disable react/no-unknown-property */
import React, { useState } from 'react';
import { useFrame } from '@react-three/fiber';

function Box({ position }) {
  const meshRef = React.useRef();
  const [color, setColor] = useState(randomColor());

  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  function randomColor() {
    return `hsl(${Math.random() * 360}, 90%, 55%)`;
  }

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Boxes() {
  const [boxes, setBoxes] = useState([{ id: 0, position: randomCoordinates() }]);

  const addBox = () => {
    setBoxes((prevState) => [
      ...prevState,
      { id: prevState.length, position: randomCoordinates() },
    ]);
  };

  function randomCoordinates() {
    const min = -6.5;
    const max = 6.5;

    return [
      Math.random() * (max - min) + min,
      Math.random() * (max - min) + min,
      Math.random() * (max - min) + min,
    ];
  }

  return (
    <>
      {boxes.map((box) => (
        <Box key={box.id} position={box.position} />
      ))}
      {/* <pointLight position={[2.5, 3, -5.5]} intensity={0.5} /> */}
      <spotLight position={[0, 6, -6]} intensity={5} />
      <mesh onClick={addBox} position={[0, 0, -5]}>
        <icosahedronGeometry args={[2, 7]} />
        <meshStandardMaterial color="white" metalness={0.9} roughness={0} flatShading />
      </mesh>
    </>
  );
}

export default Boxes;
