/* eslint-disable react/no-unknown-property */
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, useAnimations, useGLTF } from '@react-three/drei';

function Flamingo({ flamingoRadius, flamingoSpeed }) {
  const { scene, animations } = useGLTF('/Flamingo.glb');
  const flamingoRef = useRef();
  const { actions, names } = useAnimations(animations, flamingoRef);

  useEffect(() => {
    actions[names[0]].play();
    const radius = flamingoRadius; // adjust as needed
    const speed = flamingoSpeed; // adjust as needed
    const orbitCenter = new THREE.Vector3(0, 5, 0); // adjust as needed
    const orbit = new THREE.Vector3(radius, 0, 0);
    let angle = 0;

    const animate = () => {
      requestAnimationFrame(animate);
      angle += speed; // multiply by -1 to change direction
      if (angle < -Math.PI * 2) angle += Math.PI * 2;
      orbit.x = radius * Math.cos(angle);
      orbit.z = radius * Math.sin(angle);
      flamingoRef.current.position.copy(orbit).add(orbitCenter);
      flamingoRef.current.rotation.y = -angle; // rotate around Y axis
    };

    animate();
  });

  return (
    <mesh ref={flamingoRef}>
      <primitive object={scene} scale={1} />
    </mesh>
  );
}

function Parrot({ parrotSpeed, parrotRadius }) {
  const { scene, animations } = useGLTF('/Parrot.glb');
  const parrotRef = useRef();
  const { actions, names } = useAnimations(animations, parrotRef);

  useEffect(() => {
    actions[names[0]].play();
    const radius = parrotRadius; // circumference of flight path
    const speed = parrotSpeed; // flight speed
    const orbitCenter = new THREE.Vector3(0, 5, 0);
    const orbit = new THREE.Vector3(radius, 0, 0);
    let angle = 0;

    const animate = () => {
      requestAnimationFrame(animate);
      angle += speed; // multiply by -1 to change direction
      if (angle < -Math.PI * 2) angle += Math.PI * 2;
      orbit.x = radius * Math.cos(angle);
      orbit.z = radius * Math.sin(angle);
      parrotRef.current.position.copy(orbit).add(orbitCenter);
      parrotRef.current.rotation.y = -angle; // rotate around Y axis
    };

    animate();
  });

  return (
    <mesh ref={parrotRef}>
      <primitive object={scene} scale={1} />
    </mesh>
  );
}

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
      <mesh onClick={addBox} position={[0, 0, -5]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </>
  );
}

function App() {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <Canvas
        camera={{ position: [0, 0, 5] }}
        className="canvas"
        onCreated={({ gl }) => {
          gl.outputEncoding = THREE.sRGBEncoding;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
        }}
        // style={{ height: '200vh', width: '100vw' }}
        style={{ height: '100vh', width: '100vw' }}
      >
        <Flamingo flamingoSpeed={0.009} flamingoRadius={20} />
        <Parrot parrotSpeed={0.0092} parrotRadius={10} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Boxes />
        <OrbitControls />
        <mesh position={[0, -scrollY / 10, 100]}>
          <boxGeometry args={[10, 10, 10]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
