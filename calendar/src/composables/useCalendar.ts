import { ref, computed, watch, onMounted } from 'vue'
import type { CalendarSlot } from '@/types/calendar'

function getMonday(date: Date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d
}

function formatDate(date: Date) {
  return date.toISOString().split('T')[0]
}

export function useCalendar() {
  const currentWeekStart = ref<Date>(getMonday(new Date()))
  const selectedSlots = ref<Set<string>>(new Set())
  const rangeStart = ref<string | null>(null)

  const slots = computed<CalendarSlot[]>(() => {
    const result: CalendarSlot[] = []
    const now = new Date()
    const todayStr = formatDate(now)
    const currentHour = now.getHours()

    for (let dayIndex = 0; dayIndex < 5; dayIndex++) {
      const date = new Date(currentWeekStart.value)
      date.setDate(date.getDate() + dayIndex)
      const dateStr = formatDate(date)

      for (let hour = 10; hour < 20; hour++) {
        let isDisabled = false
        if (dateStr < todayStr) {
          isDisabled = true
        } else if (dateStr === todayStr && hour <= currentHour) {
          isDisabled = true
        }

        result.push({
          id: `${dateStr}_${hour}`,
          date: dateStr,
          dayIndex,
          hour,
          isDisabled
        })
      }
    }
    return result
  })

  const weekKey = computed(() => `calendar_${formatDate(currentWeekStart.value)}`)

  function loadFromStorage() {
    const saved = localStorage.getItem(weekKey.value)
    if (saved) {
      try {
        const array: string[] = JSON.parse(saved)
        selectedSlots.value = new Set(array)
      } catch {
        selectedSlots.value = new Set()
      }
    } else {
      selectedSlots.value = new Set()
    }
    rangeStart.value = null
  }

  function saveToStorage() {
    localStorage.setItem(weekKey.value, JSON.stringify(Array.from(selectedSlots.value)))
  }

  function handleSlotClick(slotId: string) {
    const slot = slots.value.find(s => s.id === slotId)
    if (!slot || slot.isDisabled) return

    if (rangeStart.value === null) {
      rangeStart.value = slotId
    } else {
      const startId = rangeStart.value
      const startSlot = slots.value.find(s => s.id === startId)
      
      if (!startSlot) {
        rangeStart.value = null
        return
      }

      const startIndex = slots.value.indexOf(startSlot)
      const endIndex = slots.value.indexOf(slot)
      
      const minIndex = Math.min(startIndex, endIndex)
      const maxIndex = Math.max(startIndex, endIndex)

      const isStartSelected = selectedSlots.value.has(startId)
      
      const newSelected = new Set(selectedSlots.value)

      for (let i = minIndex; i <= maxIndex; i++) {
        const s = slots.value[i]
        if (!s.isDisabled) {
          if (isStartSelected) {
            newSelected.delete(s.id)
          } else {
            newSelected.add(s.id)
          }
        }
      }

      selectedSlots.value = newSelected
      rangeStart.value = null
    }
  }

  function clearAll() {
    selectedSlots.value = new Set()
  }

  function nextWeek() {
    const next = new Date(currentWeekStart.value)
    next.setDate(next.getDate() + 7)
    currentWeekStart.value = next
  }

  function prevWeek() {
    const prev = new Date(currentWeekStart.value)
    prev.setDate(prev.getDate() - 7)
    currentWeekStart.value = prev
  }

  watch(currentWeekStart, () => {
    loadFromStorage()
  })

  watch(selectedSlots, () => {
    saveToStorage()
  }, { deep: true })

  onMounted(() => {
    loadFromStorage()
  })

  const dailyStats = computed(() => {
    const stats: number[] = Array(5).fill(0)
    selectedSlots.value.forEach(id => {
      const slot = slots.value.find(s => s.id === id)
      if (slot) {
        stats[slot.dayIndex]++
      }
    })
    return stats
  })

  const totalHours = computed(() => {
    let count = 0
    selectedSlots.value.forEach(id => {
      if (slots.value.some(s => s.id === id)) {
        count++
      }
    })
    return count
  })

  return {
    currentWeekStart,
    slots,
    selectedSlots,
    rangeStart,
    dailyStats,
    totalHours,
    handleSlotClick,
    clearAll,
    nextWeek,
    prevWeek
  }
}