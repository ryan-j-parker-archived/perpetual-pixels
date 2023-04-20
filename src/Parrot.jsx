/* eslint-disable react/no-unknown-property */
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useAnimations, useGLTF } from '@react-three/drei';

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

export default Parrot;
