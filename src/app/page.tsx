'use client'

import React, { useState, useCallback, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, OrbitControls, Stats, Html } from '@react-three/drei';
import Totem from './Totem';
import H from './h';
import * as THREE from 'three';
import './globals.css';

const SceneController: React.FC = () => {
  const [currentModel, setCurrentModel] = useState<'totem' | 'h'>('totem');
  const [isSwitching, setIsSwitching] = useState(false);
  const [showClouds, setShowClouds] = useState(false);
  const { scene, camera, mouse } = useThree();

  const handleCanvasClick = useCallback(() => {
    if (isSwitching) return; // Prevent further clicks if already switching

    setIsSwitching(true);
    setShowClouds(true);

    // Schedule cloud hiding and model switch after animation
    setTimeout(() => {
      setShowClouds(false);
    }, 1500); // Cloud animation time
  }, [isSwitching]);

  // Listen to changes in showClouds to switch models at the right time
  useEffect(() => {
    if (!showClouds && isSwitching) {
      setCurrentModel(current => current === 'totem' ? 'h' : 'totem');
      setIsSwitching(false);
    }
  }, [showClouds, isSwitching]);

  return (
    <>
      <Html fullscreen>
        <div className="clouds-container">
          <div className={`cloud-left ${showClouds ? 'in' : 'out'}`} />
          <div className={`cloud-right ${showClouds ? 'in' : 'out'}`} />
        </div>
      </Html>
     
      <OrbitControls target={[0, 7, 0]} autoRotate minPolarAngle={0} maxPolarAngle={Math.PI / 2} minDistance={2} maxDistance={20} enablePan={false} />
      <mesh onClick={handleCanvasClick}>
        {currentModel === 'totem' ? <Totem /> : <H />}
      </mesh>
    </>
  );
};

const My3DScene: React.FC = () => {
  return (
    <Canvas style={{ width: '100vw', height: '100vh' }} camera={{ position: [5, 7, 0] }}>
      <Environment background={true} backgroundBlurriness={0.5} path="/" files="sun.hdr" />
      <directionalLight position={[3.3, 1.0, 4.4]} intensity={4} />
      <directionalLight position={[-3.3, 1.0, -4.4]} intensity={1} />
      <Stats />
      <SceneController />
    </Canvas>
  );
};

export default My3DScene;
