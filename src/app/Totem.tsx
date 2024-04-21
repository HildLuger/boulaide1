import React, { useEffect, useState } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';
import { MeshPhysicalMaterial, Mesh, TextureLoader, RepeatWrapping, SRGBColorSpace } from 'three';

const Totem: React.FC = () => {
    const glb = useLoader(GLTFLoader, 'totem3.glb');
    const scale = [2, 2, 2];

    return <primitive object={glb.scene} />;
};
  
export default Totem;
