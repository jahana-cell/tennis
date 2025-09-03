import { defineConfig } from 'vite' // This line was missing
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
})