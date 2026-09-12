<script setup lang="ts">
withDefaults(
    defineProps<{
        variant?: 'default' | 'danger'
        disabled?: boolean
        type?: 'button' | 'submit' | 'reset'
    }>(),
    {
        variant: 'default',
        disabled: false,
        type: 'button',
    },
)

defineEmits<{ click: [] }>()
</script>

<template>
    <button
        :type="type"
        class="app-button"
        :class="[`app-button--${variant}`]"
        :disabled="disabled"
        @click="$emit('click')"
    >
        <slot />
    </button>
</template>

<style lang="scss" scoped>
@use '../../shared/helpers' as *;

.app-button {
    @include flex-center;

    gap: rem(8);
    padding: rem(10) rem(16);
    border: rem(1) solid var(--accent);
    border-radius: rem(8);
    background: var(--bg-elevated);
    color: var(--text-primary);
    font-family: var(--font-family-button);
    font-size: rem(14);

    @include hover {
        background: var(--accent);
        color: var(--bg-primary);
        transform: scale(1.04);
    }

    &:active {
        transform: scale(0.97);
    }

    &:disabled {
        opacity: 0.4;
        pointer-events: none;
    }

    &--danger {
        border-color: var(--danger);
        color: var(--danger);

        @include hover {
            background: var(--danger);
            color: #ffffff;
        }
    }
}
</style>