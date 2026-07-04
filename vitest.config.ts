import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// 單元 / 行為測試(Vitest + jsdom + Testing Library）。
// 只掃 apps/** 的 *.test.ts(x) —— 目前覆蓋 reactflow-demo concept-map 的核心邏輯。
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['apps/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/storybook-static/**'],
  },
})
