import React from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';

const H: React.FC = () => {
    const glb = useLoader(GLTFLoader, 'h3.glb');
    const scale = [0.2, 0.2, 0.2];  // Scale factors for x, y, and z
    const position = [0, 5, 0];  // Position coordinates x, y, z

    // Apply both scale and position to the primitive component
    return <primitive object={glb.scene} scale={scale} position={position} />;
};

export default H;
