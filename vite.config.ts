import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    include: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    globals: true,
    environment: 'jsdom',
    setupFiles: 'setupTests',
    mockReset: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
