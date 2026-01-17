import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon-16.png',
        'favicon-32.png',
        'favicon-48.png',
        'apple-touch-icon.png',
        'icon-192.png',
        'icon-512.png',
        'ogp.jpg',
      ],
      manifest: {
        name: 'おやこオセロ',
        short_name: 'おやこオセロ',
        description: 'オセロの無料ゲーム。ブラウザで今すぐ一人でプレイ可能。かわいい動物キャラクターと対戦しながら子どもがオセロを学べる知育ゲーム。',
        start_url: '/',
        display: 'standalone',
        background_color: '#1B4332',
        theme_color: '#2D6A4F',
        orientation: 'portrait',
        icons: [
          {
            src: '/favicon-48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
        categories: ['games', 'education'],
        lang: 'ja',
      },
      workbox: {
        // すべてのビルドアセットをプリキャッシュ
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        // Google Fontsをランタイムキャッシュ
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1年
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1年
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
