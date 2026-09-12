import js from '@eslint/js'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{ts,vue}'],
    extends: [
      js.configs.recommended,
      ...pluginVue.configs['flat/essential'],
      ...vueTsEslintConfig(),
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
])