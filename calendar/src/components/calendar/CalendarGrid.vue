<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import CalendarCell from './CalendarCell.vue'
import { useCalendar } from '@/composables/useCalendar'

const { t, tm, locale } = useI18n()
const { weekDays, dayColumns, selectedSlots, anchoredId, dailyStats, handleSlotClick } = useCalendar()

const dayNames = computed(() => tm('calendar.days') as string[])

const dateLabels = computed(() =>
    weekDays.value.map((day) =>
        new Intl.DateTimeFormat(locale.value, { day: 'numeric', month: 'short' }).format(day.date),
    ),
)
</script>

<template>
    <div class="calendar-scroll">
        <div class="calendar">
            <section
                v-for="(day, dayIndex) in weekDays"
                :key="day.dateStr"
                class="day"
                :class="{ 'day--today': day.isToday }"
            >
                <header class="day__header">
                    <span class="day__date">{{ dateLabels[dayIndex] }}</span>
                    <span class="day__meta">
                        {{ dayNames[dayIndex] }}
                        <em class="day__count">{{ dailyStats[dayIndex] }} {{ t('calendar.hoursShort') }}</em>
                    </span>
                </header>
                <div class="day__slots">
                    <CalendarCell
                        v-for="cell in dayColumns[dayIndex]"
                        :key="cell.id"
                        :cell="cell"
                        :selected="selectedSlots.has(cell.id)"
                        :anchored="anchoredId === cell.id"
                        @select="handleSlotClick"
                    />
                </div>
            </section>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../shared/helpers' as *;

.calendar-scroll {
    overflow-x: auto;
    overscroll-behavior-x: contain;
    padding: rem(6);
    margin: rem(-6);
}

.calendar {
    display: grid;
    grid-template-columns: repeat(5, minmax(rem(116), 1fr));
    gap: rem(12);
    min-width: rem(628);
}

.day__header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: rem(8);
    margin-bottom: rem(10);
    padding-bottom: rem(8);
    border-bottom: rem(2) solid var(--bg-elevated);
}

.day--today .day__header {
    border-bottom-color: var(--accent);
}

.day--today .day__date {
    color: var(--accent);
}

.day__date {
    font-size: rem(16);
    font-weight: 700;
    color: var(--text-heading);
    white-space: nowrap;
}

.day__meta {
    display: flex;
    align-items: baseline;
    gap: rem(6);
    min-width: 0;
    font-size: rem(13);
    color: var(--text-secondary);
    white-space: nowrap;
}

.day__count {
    font-style: normal;
    font-family: var(--font-family-button);
    color: var(--accent);
}

.day__slots {
    display: grid;
    gap: rem(6);
}

@include mobile {
    .calendar-scroll {
        overflow-x: visible;
        padding: 0;
        margin: 0;
    }

    .calendar {
        grid-template-columns: minmax(0, 1fr);
        gap: rem(24);
        min-width: 0;
    }

    .day__date {
        font-size: rem(20);
    }
}

@include mobile-s {
    .day__header {
        gap: rem(6);
    }

    .day__date {
        font-size: rem(16);
    }

    .day__meta {
        font-size: rem(12);
    }

    .day__slots {
        gap: rem(5);
    }
}
</style>