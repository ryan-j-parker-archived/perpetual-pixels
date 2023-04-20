/* eslint-disable react/no-unknown-property */
import { useGLTF, useAnimations } from '@react-three/drei';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function Druid({ props }) {
  const { scene, animations } = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/druid/model.gltf'
  );
  const druidRef = useRef();

  const { actions, names } = useAnimations(animations, druidRef);

  useEffect(() => {
    actions[names[2]].play();

    const animate = () => {
      requestAnimationFrame(animate);
      //   druidRef.current.rotation.y += 0.01;
    };

    animate();
  });
  console.log(animations);

  return (
    <mesh ref={druidRef}>
      <primitive object={scene} {...props} scale={1} />
    </mesh>
  );
}

export default Druid;
