<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useCalendar } from '@/composables/useCalendar'

const { t, locale } = useI18n()

const {
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
} = useCalendar()

function toggleLocale() {
  locale.value = locale.value === 'ru' ? 'en' : 'ru'
}
</script>

<template>
  <div class="wrapper">
    <header class="header">
      <h1>{{ t('calendar.title') }}</h1>
      <button class="btn-lang" @click="toggleLocale">
        {{ t('common.toggleLanguage') }}
      </button>
    </header>

    <div class="controls">
      <button class="btn" @click="prevWeek">{{ t('calendar.prevWeek') }}</button>
      <span class="week-label">{{ currentWeekStart.toLocaleDateString() }}</span>
      <button class="btn" @click="nextWeek">{{ t('calendar.nextWeek') }}</button>
      <button class="btn btn-danger" @click="clearAll">{{ t('calendar.clearAll') }}</button>
    </div>

    <div class="calendar-scroll">
      <div class="calendar-grid">
        <div class="day-header" v-for="(day, index) in t('calendar.days', { returnObjects: true })" :key="index">
          <div class="day-name">{{ day }}</div>
          <div class="day-stats">{{ t('calendar.hours') }}: {{ dailyStats[index] }}</div>
        </div>

        <template v-for="hour in 10" :key="hour">
          <button
            v-for="dayIndex in 5"
            :key="`${dayIndex}-${hour}`"
            class="slot"
            :class="{
              selected: selectedSlots.has(slots[(dayIndex - 1) * 10 + (hour - 1)].id),
              disabled: slots[(dayIndex - 1) * 10 + (hour - 1)].isDisabled,
              'range-start': rangeStart === slots[(dayIndex - 1) * 10 + (hour - 1)].id
            }"
            :disabled="slots[(dayIndex - 1) * 10 + (hour - 1)].isDisabled"
            @click="handleSlotClick(slots[(dayIndex - 1) * 10 + (hour - 1)].id)"
          >
            {{ hour + 9 }}:00
          </button>
        </template>
      </div>
    </div>

    <div class="total">
      {{ t('calendar.totalHours') }}: {{ totalHours }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.controls {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  align-items: center;
  flex-wrap: wrap;
}

.btn {
  padding: 8px 16px;
  background: var(--bg-elevated);
  color: var(--text-primary);
  border: 1px solid var(--accent);
  border-radius: 4px;
  
  &:hover {
    background: var(--accent);
    color: var(--bg-primary);
  }
}

.btn-danger {
  border-color: #ff4444;
  color: #ff4444;
  
  &:hover {
    background: #ff4444;
    color: white;
  }
}

.calendar-scroll {
  overflow-x: auto;
  padding-bottom: 16px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(120px, 1fr));
  gap: 8px;
  min-width: 600px; 
}

.day-header {
  text-align: center;
  padding: 12px;
  background: var(--bg-secondary);
  border-radius: 4px;
  
  .day-name {
    font-weight: bold;
    font-size: 1.2rem;
    color: var(--text-heading);
  }
  
  .day-stats {
    font-size: 0.9rem;
    color: var(--accent);
    margin-top: 4px;
  }
}

.slot {
  padding: 16px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid transparent;
  border-radius: 4px;
  font-family: var(--font-family-button);
  cursor: pointer;
  transition: all var(--transition-duration);
  
  &:hover:not(.disabled) {
    border-color: var(--accent);
  }
  
  &.selected {
    background: var(--accent);
    color: var(--bg-primary);
  }
  
  &.disabled {
    opacity: 0.3;
    cursor: not-allowed;
    text-decoration: line-through;
  }
  
  &.range-start {
    outline: 2px dashed var(--accent-secondary);
    outline-offset: 2px;
  }
}

.total {
  margin-top: 24px;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--accent);
  text-align: right;
}
</style>