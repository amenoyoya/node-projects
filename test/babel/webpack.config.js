const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                js: ['babel-loader']
              },
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".vue"],
    modules: ["node_modules"],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  plugins: [new VueLoaderPlugin()],
  devServer: {
    contentBase: `${__dirname}/dist`,
    port: 3000,
    open: true
  }
};
