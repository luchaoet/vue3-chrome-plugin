const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const fs = require("fs");
// const ZipPlugin = require('zip-webpack-plugin');

const pagesObj = {
  popup: {
    entry: 'src/popup/index.ts',
    template: 'public/index.html',
    filename: 'popup.html'
  },
  options: {
    entry: 'src/options/index.ts',
    template: 'public/index.html',
    filename: 'options.html'
  },
  devtools: {
    entry: 'src/devtools/index.ts',
    template: 'public/index.html',
    filename: 'devtools.html'
  },
  panel1: {
    entry: 'src/devtools/panel1/index.ts',
    template: "public/index.html",
    filename: 'panel1.html'
  },
  panel2: {
    entry: 'src/devtools/panel2/index.ts',
    template: "public/index.html",
    filename: 'panel2.html'
  }
};

const NODE_ENV = process.env.NODE_ENV;

const plugins = [
  // 配置静态文件
  CopyWebpackPlugin([{
    from: path.resolve("src/static"),
    to: path.resolve("dist/static")
  }]),
  // 配置manifest文件
  CopyWebpackPlugin([{
    from: path.resolve(`src/manifest.${NODE_ENV}.json`),
    to: `${path.resolve("dist")}/manifest.json`
  }])
]

// // 开发环境将热加载文件复制到dist文件夹
// if (process.env.NODE_ENV !== 'production') {
//   plugins.push(
//     CopyWebpackPlugin([{
//       from: path.resolve("src/background/hot-reload.ts"),
//       to: path.resolve("dist/background")
//     }])
//   )
// }
// // 生产环境打包dist为zip
// else if (process.env.NODE_ENV === 'production') {
//   plugins.push(
//     new ZipPlugin({
//       path: path.resolve("dist"),
//       filename: 'dist.zip',
//     })
//   )
// }

module.exports = {
  pages: pagesObj,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        'src': '@',
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'api': '@/api',
        'views': '@/views',
        'plugins': '@/plugins',
        'utils': '@/utils',
      }
    },
    entry: {
      'content': './src/content/index.ts',
      'background/hot-reload': './src/background/hot-reload.ts',
      'background/index': './src/background/index.ts',
    },
    output: {
      filename: 'js/[name].js'
    },
    plugins,
  },
  css: {
    extract: {
      filename: 'css/[name].css'
    }
  },
  chainWebpack: config => {
    // 处理字体文件名，去除hash值
    const fontsRule = config.module.rule('fonts')

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    fontsRule.uses.clear()
    fontsRule.test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
      .use('url')
      .loader('url-loader')
      .options({
        limit: 1000,
        name: 'fonts/[name].[ext]'
      })

    // 查看打包组件大小情况
    if (process.env.npm_config_report) {
      // 在运行命令中添加 --report参数运行， 如：npm run build --report
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  }
};