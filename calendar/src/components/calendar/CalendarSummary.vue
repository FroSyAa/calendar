<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useCalendar } from '@/composables/useCalendar'

const { t } = useI18n()
const { totalHours, anchoredId } = useCalendar()
</script>

<template>
    <div class="summary">
        <div class="summary__row">
            <ul class="legend">
                <li>
                    <span class="legend__swatch" />
                    {{ t('legend.free') }}
                </li>
                <li>
                    <span class="legend__swatch legend__swatch--selected" />
                    {{ t('legend.selected') }}
                </li>
                <li>
                    <span class="legend__swatch legend__swatch--disabled" />
                    {{ t('legend.past') }}
                </li>
            </ul>
            <p class="summary__total">
                {{ t('calendar.totalFree') }}: <strong>{{ totalHours }}</strong>
            </p>
        </div>
        <ul class="hints">
            <li class="hints__item" :class="{ 'hints__item--active': !anchoredId }">
                {{ t('calendar.hintFirst') }}
            </li>
            <li class="hints__item" :class="{ 'hints__item--active': !!anchoredId }">
                {{ t('calendar.hintSecond') }}
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
@use '../../shared/helpers' as *;

.summary {
    display: flex;
    flex-direction: column;
    gap: rem(12);
    margin-bottom: rem(24);
    padding-bottom: rem(16);
    border-bottom: rem(1) solid var(--bg-elevated);
}

.summary__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: rem(16);
    flex-wrap: wrap;
}

.legend {
    display: flex;
    gap: rem(16);
    flex-wrap: wrap;
    font-size: rem(13);
    color: var(--text-secondary);

    li {
        display: flex;
        align-items: center;
        gap: rem(6);
    }
}

.legend__swatch {
    @include square(rem(14));

    border: rem(1) solid var(--bg-elevated);
    border-radius: rem(4);
    background: var(--bg-secondary);

    &--selected {
        border-color: var(--accent);
        background: var(--accent);
    }

    &--disabled {
        opacity: 0.35;
    }
}

.hints {
    display: flex;
    flex-direction: column;
    gap: rem(4);
}

.hints__item {
    font-size: rem(14);
    color: var(--text-secondary);
    transition: color var(--transition-duration);

    &--active {
        color: var(--accent);
        font-weight: 500;
    }
}

.summary__total {
    font-size: rem(16);
    color: var(--text-heading);

    strong {
        color: var(--accent);
        font-family: var(--font-family-button);
    }
}
</style>