import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useMemo, useRef } from "react"
import { Mesh, MeshStandardMaterial, Object3D, Vector3, type Group } from "three"
import { getGlobalPointer } from "../../hooks/useGlobalPointer"

const MODEL_PATH = '/3D-models/MinecraftHead.glb'

const ROTATION_STRENGTH = 1.25
const LOOK_DISTANCE = 1.9
const ROTATION_SMOOTHING = 0.15

const FLOAT_AMPLITUDE = 0.15
const FLOAT_SPEED = 1.2

export default function MinecraftHead() {
    const { scene } = useGLTF(MODEL_PATH)
    const model = useMemo(() => scene.clone(true), [scene])
    const modelRef = useRef<Group>(null!)
    const dummy = useMemo(() => new Object3D(), [])
    const target = useMemo(() => new Vector3(), [])

    useEffect(() => {
        model.traverse((child) => {
            if (!(child instanceof Mesh)) return

            child.castShadow = true
            child.receiveShadow = true

            const materials = Array.isArray(child.material) ? child.material : [child.material]

            materials.forEach((material) => {
                if (!(material instanceof MeshStandardMaterial)) return

                material.transparent = false
                material.alphaTest = 0.5
                material.depthWrite = true
                material.depthTest = true
                material.roughness = 1
                material.metalness = 0
                material.polygonOffset = true
                material.polygonOffsetFactor = -1
                material.polygonOffsetUnits = -1

                if (material.map) {
                    material.map.anisotropy = 6
                    material.map.needsUpdate = true
                }
            })
        })
    }, [model])

    useFrame(({ clock }) => {
        if (!modelRef.current) return

        const pointer = getGlobalPointer()

        target.set(
            pointer.x * ROTATION_STRENGTH,
            pointer.y * ROTATION_STRENGTH,
            LOOK_DISTANCE
        )

        dummy.position.copy(modelRef.current.position)
        dummy.lookAt(modelRef.current.position.clone().add(target))

        modelRef.current.quaternion.slerp(dummy.quaternion, ROTATION_SMOOTHING)
        modelRef.current.position.y = Math.sin(clock.getElapsedTime() * FLOAT_SPEED) * FLOAT_AMPLITUDE
    })

    return <primitive object={model} ref={modelRef} scale={5.5} />
}

useGLTF.preload(MODEL_PATH)