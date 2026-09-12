'use client';

import { Environment } from "@react-three/drei";

export default function Lights() {
    return (
        <>
            <ambientLight intensity={0.8} />
            <directionalLight position={[5,5,5]} intensity={1.5} />
            <Environment preset="city" />
        </>
    )
}