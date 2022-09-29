import { loadEnv, defineConfig, UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'
import { createHtmlPlugin } from 'vite-plugin-html'
import { viteMockServe } from 'vite-plugin-mock'
import { visualizer } from 'rollup-plugin-visualizer'

import { createProxy } from './build/proxy'
import { wrapperEnv } from './build/utils'
import { configCompressPlugin } from './build/compress'
import { configImageminPlugin } from './build/imagemin'
import { configPwaConfig } from './build/pwa'
import pkg from './package.json'
import dayjs from 'dayjs'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}
// 设置应用信息
const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
}
export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
  const root = process.cwd()

  const env = loadEnv(mode, root)
  const isBuild = command === 'build'

  const lifecycle = process.env.npm_lifecycle_event
  // loadEnv读取的布尔类型是一个字符串。这个函数可以转换为布尔类型
  const viteEnv = wrapperEnv(env)
  const {
    VITE_PORT,
    VITE_PUBLIC_PATH,
    VITE_PROXY,
    VITE_DROP_CONSOLE,
    VITE_HTTPS,
    VITE_USE_MOCK,
    VITE_GLOB_APP_TITLE,
    // VITE_APP_CONFIG_FILE_NAME,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
    VITE_USE_IMAGEMIN,
    VITE_LEGACY
  } = viteEnv

  const buildPlugins = isBuild
    ? [
        // gzip,brotli压缩输出，生产有效
        configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE),
        // 图片压缩
        VITE_USE_IMAGEMIN && configImageminPlugin(),
        // pwd应用
        configPwaConfig(viteEnv),
        // 浏览器兼容
        VITE_LEGACY && legacy()
      ]
    : []

  return {
    base: VITE_PUBLIC_PATH,
    root,
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
    },
    server: {
      // open: true,
      https: VITE_HTTPS,
      // host: 'localhost',
      // Listening on all local IPss
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY)
    },
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        resolvers: [ElementPlusResolver()],
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/ // .vue
        ],
        dts: true
      }),

      viteMockServe({
        ignore: /^\_/,
        mockPath: 'mock',
        supportTs: true,
        prodEnabled: VITE_USE_MOCK,
        // 相当于在src/main.ts中inject下面的代码，所以注意文件的路径问题
        injectCode: `
          import { setupProdMockServer } from '../mock/_createProductionServer';
          setupProdMockServer();
        `
      }),
      // html定制化
      createHtmlPlugin({
        minify: isBuild,
        inject: {
          // Inject data into ejs template
          data: {
            title: VITE_GLOB_APP_TITLE
          }
        }
      }),
      ...buildPlugins,
      // 打包分析
      lifecycle === 'report' &&
        visualizer({
          filename: './node_modules/.cache/visualizer/stats.html',
          open: true,
          gzipSize: true,
          brotliSize: true
        })
    ],
    json: {
      stringify: true
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    resolve: {
      alias: {
        // '~/': `${path.resolve(__dirname, 'src')}/`,
        '@': pathResolve('src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/styles/variables.scss";
          `,
          javascriptEnabled: true
        }
      }
    }
  }
})
