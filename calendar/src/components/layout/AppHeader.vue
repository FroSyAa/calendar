<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIconButton from '@/components/ui/AppIconButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { useCalendar } from '@/composables/useCalendar'
import { useTheme } from '@/composables/useTheme'

const { t, locale } = useI18n()
const { theme, toggleTheme } = useTheme()
const { currentWeekStart } = useCalendar()

const monthTitle = computed(() => {
    const raw = new Intl.DateTimeFormat(locale.value, { month: 'long', year: 'numeric' }).format(
        currentWeekStart.value,
    )
    const clean = raw.replace(/\s*г\.$/, '')
    return clean.charAt(0).toUpperCase() + clean.slice(1)
})

function toggleLocale() {
    locale.value = locale.value === 'ru' ? 'en' : 'ru'
}
</script>

<template>
    <header class="header">
        <h1 class="header__month">{{ monthTitle }}</h1>
        <div class="header__actions">
            <AppIconButton :label="t('common.toggleLanguage')" @click="toggleLocale">
                <AppIcon name="language" />
            </AppIconButton>
            <AppIconButton :label="t('common.toggleTheme')" @click="toggleTheme">
                <AppIcon :name="theme === 'dark' ? 'sun' : 'moon'" />
            </AppIconButton>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@use '../../shared/helpers' as *;

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: rem(12);
    margin-bottom: rem(20);
}

.header__month {
    @include fluid-text(36, 22);

    font-weight: 700;
    background: linear-gradient(
        90deg,
        var(--accent) 0%,
        var(--accent-secondary) 33%,
        var(--accent-shade) 66%,
        var(--accent) 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    background-size: 300% 100%;
    animation: gradient-shift 8s ease-in-out infinite;
}

.header__actions {
    display: flex;
    gap: rem(8);
}

@keyframes gradient-shift {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}
</style>