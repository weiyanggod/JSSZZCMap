import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import { antdResolver } from '@bit-ocean/auto-import'
import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin'
import UnoCSS from 'unocss/vite'
import path from 'path'

const params = {
  unitToConvert: 'px',
  viewportWidth: 1920,
  unitPrecision: 5, // 单位转换后保留的精度
  propList: ['*'], // 能转化为vw的属性列表
  viewportUnit: 'vw', // 希望使用的视口单位
  fontViewportUnit: 'vw', // 字体使用的视口单位
  selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
  minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
  mediaQuery: true, // 媒体查询里的单位是否需要转换单位
  replace: true, //  是否直接更换属性值，而不添加备用属性
  exclude: [/node_modules\/ant-design-vue/], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
  include: [], // 如果设置了include，那将只有匹配到的文件才会被转换
  landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
  landscapeUnit: 'vw', // 横屏时使用的单位
  landscapeWidth: 1920, // 横屏时使用的视口宽度
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: './',
    plugins: [
      react(),
      UnoCSS(),
      AutoImport({
        eslintrc: {
          // 这里先设置成true然后npm run dev 运行之后会生成 .eslintrc-auto-import.json 文件之后，在改为false
          enabled: true,
          filepath: './.eslintrc-auto-import.js', // 生成的文件路径
          globalsPropValue: true,
        },

        imports: ['react', 'react-router-dom'],
        dirs: ['./src/utils/**'],
        resolvers: [antdResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    css: {
      postcss: {
        plugins: [postcsspxtoviewport8plugin(params)],
      },
    },
    server: {
      host: '0.0.0.0',
      proxy: {
        '/zckb': {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/zckb/, ''),
        },
      },
    },
  }
})
