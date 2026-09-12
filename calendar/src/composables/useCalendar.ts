import { computed, ref, watch } from 'vue'
import type { CalendarSlot } from '@/types/calendar'

const DAY_COUNT = 5
const START_HOUR = 10
const END_HOUR = 19
const HOURS = Array.from({ length: END_HOUR - START_HOUR }, (_, index) => START_HOUR + index)

interface RangeAnchor {
    id: string
}

function getMonday(date: Date): Date {
    const result = new Date(date)
    const day = result.getDay()
    const diff = result.getDate() - day + (day === 0 ? -6 : 1)
    result.setDate(diff)
    result.setHours(0, 0, 0, 0)
    return result
}

function formatDate(date: Date): string {
    const month = `${date.getMonth() + 1}`.padStart(2, '0')
    const day = `${date.getDate()}`.padStart(2, '0')
    return `${date.getFullYear()}-${month}-${day}`
}

const currentWeekStart = ref<Date>(getMonday(new Date()))
const selectedSlots = ref<Set<string>>(new Set())
const rangeAnchor = ref<RangeAnchor | null>(null)

const weekDays = computed(() =>
    Array.from({ length: DAY_COUNT }, (_, index) => {
        const date = new Date(currentWeekStart.value)
        date.setDate(date.getDate() + index)
        const dateStr = formatDate(date)
        return { date, dateStr, isToday: dateStr === formatDate(new Date()) }
    }),
)

const slots = computed<CalendarSlot[]>(() => {
    const now = new Date()
    const todayStr = formatDate(now)
    const currentHour = now.getHours()

    return weekDays.value.flatMap((day, dayIndex) =>
        HOURS.map((hour) => ({
            id: `${day.dateStr}_${hour}`,
            date: day.dateStr,
            dayIndex,
            hour,
            isDisabled: day.dateStr === todayStr && hour < currentHour,
        })),
    )
})

const slotMap = computed(() => new Map(slots.value.map((slot) => [slot.id, slot])))

const dayColumns = computed<CalendarSlot[][]>(
    () => weekDays.value.map((_, dayIndex) => HOURS.map((hour) => slotAt(dayIndex, hour))),
)

const anchoredId = computed(() => rangeAnchor.value?.id ?? null)

const weekStorageKey = computed(() => `availability_${formatDate(currentWeekStart.value)}`)

function slotAt(dayIndex: number, hour: number): CalendarSlot {
    const slot = slots.value[dayIndex * HOURS.length + (hour - START_HOUR)]
    if (!slot) throw new Error(`Slot not found: day ${dayIndex}, hour ${hour}`)
    return slot
}

function loadWeek() {
    const raw = localStorage.getItem(weekStorageKey.value)
    let ids: string[] = []
    if (raw) {
        try {
            ids = JSON.parse(raw) as string[]
        } catch {
            ids = []
        }
    }
    selectedSlots.value = new Set(ids)
    rangeAnchor.value = null
}

function saveWeek() {
    localStorage.setItem(weekStorageKey.value, JSON.stringify([...selectedSlots.value]))
}

function applyRange(from: CalendarSlot, to: CalendarSlot, shouldSelect: boolean) {
    let start = -1
    let end = -1
    slots.value.forEach((slot, index) => {
        if (slot.id === from.id) start = index
        if (slot.id === to.id) end = index
    })
    if (start === -1 || end === -1) return

    const rangeStart = Math.min(start, end)
    const rangeEnd = Math.max(start, end)

    const next = new Set(selectedSlots.value)
    for (let index = rangeStart; index <= rangeEnd; index += 1) {
        const target = slots.value[index]
        if (!target || target.isDisabled) continue
        if (shouldSelect) next.add(target.id)
        else next.delete(target.id)
    }
    selectedSlots.value = next
}

function handleSlotClick(slotId: string) {
    const slot = slotMap.value.get(slotId)
    if (!slot || slot.isDisabled) return

    const anchor = rangeAnchor.value

    if (anchor && anchor.id === slotId) {
        rangeAnchor.value = null
        return
    }

    if (anchor) {
        const anchorSlot = slotMap.value.get(anchor.id)
        rangeAnchor.value = null
        if (!anchorSlot) return
        const anchorSelected = selectedSlots.value.has(anchor.id)
        const slotSelected = selectedSlots.value.has(slotId)
        applyRange(anchorSlot, slot, !(anchorSelected && slotSelected))
        return
    }

    const next = new Set(selectedSlots.value)
    if (next.has(slotId)) {
        next.delete(slotId)
        selectedSlots.value = next
        return
    }

    next.add(slotId)
    selectedSlots.value = next
    rangeAnchor.value = { id: slotId }
}

function clearAll() {
    selectedSlots.value = new Set()
    rangeAnchor.value = null
}

function shiftWeek(days: number) {
    const next = new Date(currentWeekStart.value)
    next.setDate(next.getDate() + days)
    currentWeekStart.value = next
}

const dailyStats = computed(() => {
    const stats = Array<number>(DAY_COUNT).fill(0)
    selectedSlots.value.forEach((id) => {
        const slot = slotMap.value.get(id)
        if (slot) stats[slot.dayIndex] = (stats[slot.dayIndex] ?? 0) + 1
    })
    return stats
})

const totalHours = computed(() => selectedSlots.value.size)

loadWeek()

watch(currentWeekStart, loadWeek)
watch(selectedSlots, saveWeek)

export function useCalendar() {
    return {
        currentWeekStart,
        weekDays,
        dayColumns,
        selectedSlots,
        anchoredId,
        dailyStats,
        totalHours,
        handleSlotClick,
        clearAll,
        prevWeek: () => shiftWeek(-7),
        nextWeek: () => shiftWeek(7),
    }
}