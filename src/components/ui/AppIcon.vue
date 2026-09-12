<script setup lang="ts">
withDefaults(defineProps<{ name: string; size?: number }>(), { size: 20 })
</script>

<template>
    <span
        class="icon"
        aria-hidden="true"
        :style="{
            width: `${size}px`,
            height: `${size}px`,
            '--icon-image': `url(/icons/${name}.svg)`,
        }"
    />
</template>

<style lang="scss" scoped>
.icon {
    display: inline-block;
    flex: none;
    background-color: currentColor;
    mask-image: var(--icon-image);
    mask-position: center;
    mask-repeat: no-repeat;
    mask-size: contain;
    -webkit-mask-image: var(--icon-image);
    -webkit-mask-position: center;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: contain;
}
</style>