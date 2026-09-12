<script setup lang="ts">
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import AppHeader from '@/components/layout/AppHeader.vue'
import CalendarGrid from '@/components/calendar/CalendarGrid.vue'
import CalendarSummary from '@/components/calendar/CalendarSummary.vue'
import CalendarToolbar from '@/components/calendar/CalendarToolbar.vue'

const { locale } = useI18n()

watch(
    locale,
    (value) => {
        document.documentElement.lang = value
    },
    { immediate: true },
)
</script>

<template>
    <div class="page">
        <div class="container">
            <AppHeader />
            <CalendarSummary />
            <CalendarGrid />
            <CalendarToolbar />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use './shared/helpers' as *;

.page {
    min-height: 100dvh;
    padding-block: rem(40) rem(64);
}

@include mobile {
    .page {
        padding-block: rem(24) rem(110);
    }
}

@include mobile-s {
    .container {
        --container-padding-x: #{rem(16)};
    }
}
</style>