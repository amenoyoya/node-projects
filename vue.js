/**
 * MIT License
 * 
 * Copyright (c) 2019 amenoyoya https://github.com/amenoyoya
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
const fs = require('fs');
const path = require("path");

const createDirectories = (dirpath) => {
  const parent = path.dirname(dirpath);
  try {
    fs.accessSync(parent, fs.constants.R_OK | fs.constants.W_OK);
  } catch (error) {
    if (error.code === 'ENOENT') {
      createDirectories(parent);
    }
  }
  try {
    fs.accessSync(dirpath, fs.constants.R_OK | fs.constants.W_OK);
  } catch (error) {
    if (error.code === 'ENOENT') {
      fs.mkdirSync(dirpath);
    }
  }
};

const writeFile = (filepath, content) => {
  createDirectories(path.dirname(filepath));
  fs.writeFileSync(filepath, content);
};

const package = String.raw
`{
  "scripts": {
    "start": "webpack-dev-server --hot --inline",
    "watch": "webpack --watch"
  },
  "devDependencies": {
    "@babel/core": "^7.5.5",
    "@babel/preset-env": "^7.5.5",
    "babel-loader": "^8.0.6",
    "vue": "^2.6.10",
    "vue-loader": "^15.7.1",
    "vue-template-compiler": "^2.6.10",
    "webpack": "^4.39.3",
    "webpack-cli": "^3.3.7",
    "webpack-dev-server": "^3.8.0"
  }
}`;

const webpack = String.raw
`const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development', // 開発: development, 本番: production
  entry: './src/index.js', // コンパイルのエントリーポイントファイル
  // 出力先パス（絶対パス指定）
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    // コンパイル設定
    rules: [
      {
        // .js ファイル
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader', // babel-loader で ECMAScript5 にトランスコンパイル
            options: {
              presets: ['@babel/preset-env']　// ブラウザ環境に合わせて自動的にコンパイル
            }
          }
        ]
      },
      {
        // .vue ファイル
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader', // vue-loader で Vueコンポーネントファイルをコンパイル
            options: {
              loaders: {
                js: ['babel-loader'] // .vue ファイル内の script タグを babel-loader でトランスコンパイル
              },
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    ]
  },
  // import設定
  resolve: {
    extensions: [".js", ".vue"], // .js, .vue を import
    modules: ["node_modules"],
    alias: {
      vue$: 'vue/dist/vue.esm.js', // vue-template-compiler用
    },
  },
  plugins: [new VueLoaderPlugin()],
  // 開発サーバー設定
  devServer: {
    contentBase: path.join(__dirname, 'public'), // サーバールートディレクトリ
    port: 3000,
    open: true // ブラウザを自動的に開く
  }
};`;

const app = String.raw
`<template>
  <div>
    <p>Hello, World!</p>
  </div>
</template>
`;

const indexjs = String.raw
`import Vue from 'vue';
import App from './App'    

new Vue({
  el: '#app', // Vueでマウントする要素
  components: { App }, // 使用するコンポーネント
  template: '<app/>', // el（#app）の中に表示する内容
});`;

const index = String.raw
`<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
    </head>
    <body>
        <!-- Vueにより id="app" の要素が置き換えられる -->
        <div id="app"></div>
        <!-- Vue + webpack によりバンドルされた bundle.js を読み込む -->
        <script src="./bundle.js"></script>
    </body>
</html>`;

writeFile('./public/index.html', index);
writeFile('./src/App.vue', app);
writeFile('./src/index.js', indexjs);
writeFile('./package.json', package);
writeFile('./webpack.config.js', webpack);
