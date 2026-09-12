import '@/shared/styles/_normalize.scss'
import '@/shared/styles/_fonts.scss'
import '@/shared/styles/_variables.scss'
import '@/shared/styles/_utils.scss'
import '@/shared/styles/_globals.scss'

import { createApp } from 'vue'
import App from './App.vue'
import { i18n } from './i18n'

const app = createApp(App)
app.use(i18n)
app.mount('#app')