// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from 'path'

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//       '@components': path.resolve(__dirname, './src/components'),
//       '@pages': path.resolve(__dirname, './src/pages'),
//       '@hooks': path.resolve(__dirname, './src/hooks'),
//       '@utils': path.resolve(__dirname, './src/utils'),
//       '@services': path.resolve(__dirname, './src/services'),
//       '@styles': path.resolve(__dirname, './src/styles'),
//       '@contexts': path.resolve(__dirname, './src/contexts'),
//       '@assets': path.resolve(__dirname, './src/assets')
//     }
//   },
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           vendor: ['react', 'react-dom', 'react-router-dom'],
//           ui: ['framer-motion', 'react-icons', 'react-hot-toast'],
//           processor: ['browser-image-compression', 'jszip', 'html2canvas']
//         }
//       }
//     },
//     chunkSizeWarningLimit: 1000,
//     minify: 'esbuild',
//     terserOptions: {
//       compress: {
//         drop_console: true,
//         drop_debugger: true
//       }
//     }
//   },
//   server: {
//     port: 3000,
//     open: false
//   },
//   optimizeDeps: {
//     include: ['react', 'react-dom', 'framer-motion', 'axios']
//   }
// })







import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),

      '@components': path.resolve(__dirname, './src/components'),

      '@pages': path.resolve(__dirname, './src/pages'),

      '@hooks': path.resolve(__dirname, './src/hooks'),

      '@utils': path.resolve(__dirname, './src/utils'),

      '@services': path.resolve(__dirname, './src/services'),

      '@styles': path.resolve(__dirname, './src/styles'),

      '@contexts': path.resolve(__dirname, './src/contexts'),

      '@assets': path.resolve(__dirname, './src/assets'),

      '@lib': path.resolve(__dirname, './src/lib'),

      '@store': path.resolve(__dirname, './src/store'),

      '@workers': path.resolve(__dirname, './src/workers')
    }
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            'react',
            'react-dom',
            'react-router-dom'
          ],

          ui: [
            'framer-motion',
            'react-icons',
            'react-hot-toast'
          ],

          processor: [
            'browser-image-compression',
            'jszip',
            'html2canvas'
          ]
        }
      }
    },

    chunkSizeWarningLimit: 1000,

    minify: 'esbuild'
  },

  server: {
    port: 3000,
    open: false
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'axios'
    ]
  }
})
