/* eslint-disable react/no-unknown-property */
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useAnimations, useGLTF } from '@react-three/drei';

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

export default Flamingo;
