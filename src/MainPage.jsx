/* eslint-disable react/no-unknown-property */
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, useAnimations, useGLTF } from '@react-three/drei';
import Flamingo from './Flamingo';
import Parrot from './Parrot';
import Boxes from './Boxes';
import './App.css';
import Druid from './Druid';

function MainPage() {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="mainpage">
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
        <Druid />
        <OrbitControls />
        <mesh position={[0, -scrollY / 10, 100]}>
          <boxGeometry args={[10, 10, 10]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </Canvas>
    </div>
  );
}

export default MainPage;
