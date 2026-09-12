<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppButton from '@/components/ui/AppButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import AppModal from '@/components/ui/AppModal.vue'
import { useCalendar } from '@/composables/useCalendar'

const { t } = useI18n()
const { totalHours, prevWeek, nextWeek, clearAll } = useCalendar()

const isConfirmOpen = ref(false)

function confirmClear() {
    clearAll()
    isConfirmOpen.value = false
}
</script>

<template>
    <div class="nav">
        <AppButton class="nav__button" @click="prevWeek">
            <AppIcon name="arrow-left" :size="18" />
            <span class="hidden-mobile">{{ t('calendar.prevWeek') }}</span>
        </AppButton>
        <AppButton variant="danger" :disabled="totalHours === 0" @click="isConfirmOpen = true">
            <span class="hidden-mobile">{{ t('calendar.clearWeek') }}</span>
            <span class="visible-mobile">{{ t('calendar.clearWeekShort') }}</span>
        </AppButton>
        <AppButton class="nav__button" @click="nextWeek">
            <span class="hidden-mobile">{{ t('calendar.nextWeek') }}</span>
            <AppIcon name="arrow-right" :size="18" />
        </AppButton>

        <AppModal :open="isConfirmOpen" @close="isConfirmOpen = false">
            <p class="confirm__title">{{ t('calendar.clearConfirmTitle') }}</p>
            <p class="confirm__text">{{ t('calendar.clearConfirmText') }}</p>
            <div class="confirm__actions">
                <AppButton variant="danger" @click="confirmClear">
                    {{ t('calendar.clearWeek') }}
                </AppButton>
                <AppButton @click="isConfirmOpen = false">
                    {{ t('common.cancel') }}
                </AppButton>
            </div>
        </AppModal>
    </div>
</template>

<style lang="scss" scoped>
@use '../../shared/helpers' as *;

.nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: rem(16);
    margin-top: rem(28);
}

.confirm__title {
    font-size: rem(20);
    font-weight: 700;
    color: var(--text-heading);
    text-align: center;
}

.confirm__text {
    margin-block: rem(8) rem(20);
    font-size: rem(15);
    color: var(--text-secondary);
    text-align: center;
}

.confirm__actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: rem(10);
}

.confirm__actions .app-button {
    width: min(100%, rem(240));
}

@include mobile {
    .nav {
        position: fixed;
        inset-inline: 0;
        bottom: 0;
        z-index: 20;
        justify-content: space-between;
        gap: rem(10);
        margin: 0;
        padding: rem(12) rem(16);
        padding-bottom: calc(rem(12) + env(safe-area-inset-bottom, 0px));
        background: color-mix(in srgb, var(--bg-primary) 90%, transparent);
        backdrop-filter: blur(8px);
        border-top: rem(1) solid var(--bg-elevated);
    }

    .nav__button {
        min-height: rem(44);
        padding: rem(10) rem(16);
    }
}
</style>