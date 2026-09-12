<script setup lang="ts">
import type { CalendarSlot } from '@/types/calendar'

defineProps<{
    cell: CalendarSlot
    selected: boolean
    anchored: boolean
}>()

const emit = defineEmits<{ select: [id: string] }>()
</script>

<template>
    <button
        type="button"
        class="cell"
        :class="{ 'cell--selected': selected, 'cell--anchored': anchored }"
        :disabled="cell.isDisabled"
        :aria-pressed="selected"
        :title="`${cell.date} ${cell.hour}:00`"
        @click="emit('select', cell.id)"
    >
        <span class="cell__time">{{ cell.hour }}:00</span>
    </button>
</template>

<style lang="scss" scoped>
@use '../../shared/helpers' as *;

.cell {
    @include flex-center;

    min-height: rem(40);
    padding: rem(8) rem(6);
    border: rem(1) solid transparent;
    border-radius: rem(8);
    background: var(--bg-secondary);
    color: var(--text-secondary);
    cursor: pointer;
    transition:
        background-color var(--transition-duration),
        border-color var(--transition-duration),
        color var(--transition-duration);

    @include hover {
        border-color: var(--accent);
        color: var(--text-primary);
    }

    &:active {
        transform: scale(0.96);
    }

    &__time {
        font-family: var(--font-family-button);
        font-size: rem(13);
    }

    &--selected {
        background: var(--accent);
        border-color: var(--accent);
        color: var(--bg-primary);

        @include hover {
            background: var(--accent-shade);
            color: var(--bg-primary);
        }
    }

    &--anchored {
        outline: rem(3) dashed var(--range-outline);
        outline-offset: rem(2);
    }

    &:disabled {
        background: var(--bg-elevated);
        color: var(--text-secondary);
        opacity: 0.35;
        cursor: not-allowed;
    }
}
</style>