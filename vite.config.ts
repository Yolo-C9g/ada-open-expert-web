import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_BASE_PATH } = env
  return {
    base: VITE_APP_BASE_PATH,
    plugins: [
      vue(),
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: 'Icon',
          })
        ],
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            enabledCollections: ['ep'],
          })
        ],
      }),
      Icons({
        autoInstall: true,
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/style/element/index.scss" as *;` //在这里全局引入
        }
      }
    },
    server: {
      host: '0.0.0.0', // 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址
      port: 8080,
      proxy: {
        '^/api': {
          // target: 'https://stg-ims.adachina.com',
          target: 'https://stg-open.adachina.com',
          ws: true,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '/api')
        }
      }
    },
    resolve: {
      alias:{
        // 用~代替src目录
        "@": resolve(__dirname, "src")
        }
    },
    build: {
      outDir: 'build',
      // 设置最终构建的浏览器兼容目标
      target: 'es2015',
      // 构建后是否生成 source map 文件
      sourcemap: false,
      //  chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 5000,
      // 启用/禁用 gzip 压缩大小报告
      reportCompressedSize: false
    }
  }
})
