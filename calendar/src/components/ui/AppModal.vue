<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue'

const props = defineProps<{ open: boolean }>()

const emit = defineEmits<{ close: [] }>()

function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') emit('close')
}

watch(
    () => props.open,
    (value) => {
        document.body.style.overflow = value ? 'hidden' : ''
    },
)

onMounted(() => document.addEventListener('keydown', onKeydown))

onBeforeUnmount(() => {
    document.removeEventListener('keydown', onKeydown)
    document.body.style.overflow = ''
})
</script>

<template>
    <Teleport to="body">
        <div v-if="open" class="modal" role="dialog" aria-modal="true" @click.self="emit('close')">
            <div class="modal__content">
                <slot />
            </div>
        </div>
    </Teleport>
</template>

<style lang="scss" scoped>
@use '../../shared/helpers' as *;

.modal {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: rem(20);
    background-color: rgb(0 0 0 / 65%);
    backdrop-filter: blur(rem(3));
}

.modal__content {
    width: 100%;
    max-width: rem(440);
    max-height: calc(100dvh - rem(40));
    overflow-y: auto;
    padding: rem(28);
    border: rem(1) solid var(--accent);
    border-radius: rem(16);
    background-color: var(--bg-elevated);
    color: var(--text-primary);
    animation: modal-in var(--transition-duration) ease-out;
}

@keyframes modal-in {
    from {
        opacity: 0;
        scale: 0.92;
    }

    to {
        opacity: 1;
        scale: 1;
    }
}

@include mobile-s {
    .modal {
        padding: rem(16);
    }

    .modal__content {
        padding: rem(22) rem(18);
    }
}
</style>