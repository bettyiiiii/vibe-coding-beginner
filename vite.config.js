import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkGfm],
      jsxImportSource: 'react',
      providerImportSource: '@mdx-js/react',
    }),
  ],
})
