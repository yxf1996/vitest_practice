import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true, // ✅ headless 放在 browser 级别，不是 launchOptions
      instances: [
        {
          browser: 'chromium',
        },
      ],
    },
    include: ['tests/browser/**/*.browser.test.ts'],
  },
})
