import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Color, type InstancedMesh, Object3D } from 'three'

const PARTICLE_COUNT = 18
const ORBIT_RADIUS_MIN = 2.6
const ORBIT_RADIUS_MAX = 3.4
const ROTATION_SPEED = 0.12

function pseudoRandom(seed: number) {
    const value = Math.sin(seed * 12.9898) * 43758.5453
    return value - Math.floor(value)
}

function readCssColor(variable: string, fallback: string) {
    if (typeof window === 'undefined') return fallback
    const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim()
    return value || fallback
}

function useThemeColors() {
    const [colors, setColors] = useState(() => ({
        accent: new Color(readCssColor('--accent', '#B1A2FF')),
        accentSecondary: new Color(readCssColor('--accent-secondary', '#FCC472')),
    }))

    useEffect(() => {
        const updateColors = () => {
            setColors({
                accent: new Color(readCssColor('--accent', '#B1A2FF')),
                accentSecondary: new Color(readCssColor('--accent-secondary', '#FCC472')),
            })
        }

        const observer = new MutationObserver(updateColors)
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

        return () => observer.disconnect()
    }, [])

    return colors
}

export default function PixelParticles() {
    const meshRef = useRef<InstancedMesh>(null!)
    const dummy = useMemo(() => new Object3D(), [])
    const { accent, accentSecondary } = useThemeColors()

    const particles = useMemo(() => {
        return Array.from({ length: PARTICLE_COUNT }, (_, index) => {
            const angle = (index / PARTICLE_COUNT) * Math.PI * 2
            const radius = ORBIT_RADIUS_MIN + pseudoRandom(index) * (ORBIT_RADIUS_MAX - ORBIT_RADIUS_MIN)
            const height = (pseudoRandom(index + 100) - 0.5) * 3
            const speed = 0.5 + pseudoRandom(index + 200) * 0.5
            const size = 0.06 + pseudoRandom(index + 300) * 0.08
            const isAccent = index % 2 === 0

            return { angle, radius, height, speed, size, isAccent }
        })
    }, [])

    useEffect(() => {
        if (!meshRef.current) return

        particles.forEach((particle, index) => {
            meshRef.current.setColorAt(index, particle.isAccent ? accent : accentSecondary)
        })

        if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true
    }, [particles, accent, accentSecondary])

    useFrame(({ clock }) => {
        if (!meshRef.current) return

        const t = clock.getElapsedTime()

        particles.forEach((particle, index) => {
            const angle = particle.angle + t * ROTATION_SPEED * particle.speed
            const x = Math.cos(angle) * particle.radius
            const z = Math.sin(angle) * particle.radius
            const y = particle.height + Math.sin(t * particle.speed + index) * 0.3

            dummy.position.set(x, y, z)
            dummy.rotation.set(t * particle.speed, t * particle.speed, 0)
            dummy.scale.setScalar(particle.size)
            dummy.updateMatrix()

            meshRef.current.setMatrixAt(index, dummy.matrix)
        })

        meshRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial roughness={0.6} metalness={0.1} />
        </instancedMesh>
    )
}
