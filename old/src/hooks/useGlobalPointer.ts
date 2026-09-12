type Listener = () => void

const pointer = { x: 0, y: 0 }
const listeners = new Set<Listener>()
let attached = false

function handleMove(event: PointerEvent) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
    listeners.forEach((listener) => listener())
}

function attach() {
    if (attached || typeof window === 'undefined') return
    window.addEventListener('pointermove', handleMove, { passive: true })
    attached = true
}

export function getGlobalPointer() {
    attach()
    return pointer
}