/* eslint-disable react/no-unknown-property */
// /* eslint-disable react/no-unknown-property */
// import './App.css';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import { ACESFilmicToneMapping, sRGBEncoding } from 'three';
// import * as THREE from 'three';
// import { useRef, useState } from 'react';

// function Box({ position }) {
//   const meshRef = React.useRef();

//   useFrame(() => {
//     meshRef.current.rotation.x += 0.01;
//     meshRef.current.rotation.y += 0.01;
//   });

//   return (
//     <mesh ref={meshRef} position={position}>
//       <boxBufferGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color="orange" />
//     </mesh>
//   );
// }

// function Box() {
//   return (
//     <mesh onClick={CreateBox}>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color="hotpink" />
//     </mesh>
//   );
// }

// function randomCoordinates() {
//   const min = -10;
//   const max = 10;

//   return [
//     Math.random() * (max - min) + min,
//     Math.random() * (max - min) + min,
//     Math.random() * (max - min) + min,
//   ];
// }

// function App() {
//   const [boxes, setBoxes] = useState([{ id: 0, position: randomCoordinates() }]);

//   const addBox = () => {
//     setBoxes((prevState) => [
//       ...prevState,
//       { id: prevState.length, position: randomCoordinates() },
//     ]);
//   };

//   return (
//     <div className="App">
//       <Canvas
//         camera={{ position: [0, 0, 5] }}
//         onCreated={({ gl }) => {
//           gl.setClearColor('lightblue');
//           gl.outputEncoding = sRGBEncoding;
//           gl.toneMapping = ACESFilmicToneMapping;
//         }}
//         style={{ height: '100%', width: '100%' }}
//       >
//         {boxes.map((box) => (
//           <Box key={box.id} position={box.position} />
//         ))}
//         <ambientLight />
//         <pointLight position={[10, 10, 10]} />
//         <Box onClick={addBox}/>
//         <OrbitControls makeDefault />
//       </Canvas>
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { BoxBufferGeometry, MeshStandardMaterial } from 'three';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

function Box({ position }) {
  const meshRef = React.useRef();

  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  const randomColor = () => {
    return `#${Math.floor(Math.random() * 1000000).toString()}`;
  };

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshNormalMaterial color={randomColor} />
    </mesh>
  );
}

function randomCoordinates() {
  const min = -10;
  const max = 10;

  return [
    Math.random() * (max - min) + min,
    Math.random() * (max - min) + min,
    Math.random() * (max - min) + min,
  ];
}

function App() {
  const [boxes, setBoxes] = useState([{ id: 0, position: randomCoordinates() }]);

  const addBox = () => {
    setBoxes((prevState) => [
      ...prevState,
      { id: prevState.length, position: randomCoordinates() },
    ]);
  };

  return (
    <div className="App">
      <Canvas
        camera={{ position: [0, 0, 5] }}
        className="canvas"
        onCreated={({ gl }) => {
          gl.setClearColor('lightblue');
          gl.outputEncoding = THREE.sRGBEncoding;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
        }}
        style={{ height: '100vh', width: '100vw' }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {boxes.map((box) => (
          <Box key={box.id} position={box.position} />
        ))}
        <mesh onClick={addBox} position={[0, 0, -5]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="blue" />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
