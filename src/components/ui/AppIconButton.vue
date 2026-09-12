<script setup lang="ts">
withDefaults(
    defineProps<{
        disabled?: boolean
        label?: string
    }>(),
    {
        disabled: false,
    },
)

defineEmits<{ click: [] }>()
</script>

<template>
    <button
        type="button"
        class="app-icon-button"
        :disabled="disabled"
        :title="label"
        :aria-label="label"
        @click="$emit('click')"
    >
        <slot />
    </button>
</template>

<style lang="scss" scoped>
@use '../../shared/helpers' as *;

.app-icon-button {
    @include flex-center;
    @include square(rem(40));

    border: rem(1) solid transparent;
    border-radius: rem(10);
    background: var(--bg-elevated);
    color: var(--text-primary);

    @include hover {
        border-color: var(--accent);
        color: var(--accent);
        transform: scale(1.1);
    }

    &:active {
        transform: scale(0.95);
    }

    &:disabled {
        opacity: 0.4;
        pointer-events: none;
    }
}
</style>