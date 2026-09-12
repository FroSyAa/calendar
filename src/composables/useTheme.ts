import { ref, watch } from 'vue'
import type { Theme } from '@/types/theme'

const STORAGE_KEY = 'availability_theme'

function readTheme(): Theme {
    return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark'
}

const theme = ref<Theme>(readTheme())

watch(
    theme,
    (value) => {
        document.documentElement.dataset.theme = value
        localStorage.setItem(STORAGE_KEY, value)
    },
    { immediate: true },
)

export function useTheme() {
    function toggleTheme() {
        theme.value = theme.value === 'dark' ? 'light' : 'dark'
    }

    return { theme, toggleTheme }
}