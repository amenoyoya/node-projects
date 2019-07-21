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
    "start": "webpack-dev-server --hot --inline"
  },
  "devDependencies": {
    "@babel/core": "^7.5.0",
    "@babel/preset-env": "^7.5.0",
    "@fortawesome/fontawesome-free": "^5.9.0",
    "axios": "^0.19.0",
    "babel-loader": "^8.0.6",
    "css-loader": "^3.0.0",
    "material-design-icons-iconfont": "^5.0.1",
    "style-loader": "^0.23.1",
    "url-loader": "^2.0.1",
    "vue": "^2.6.10",
    "vue-loader": "^15.7.0",
    "vue-router": "^3.0.7",
    "vue-template-compiler": "^2.6.10",
    "vuetify": "^1.5.16",
    "webpack": "^4.35.2",
    "webpack-cli": "^3.3.5",
    "webpack-dev-server": "^3.7.2"
  },
  "dependencies": {
    "babel-polyfill": "^6.26.0"
  }
}`;

const webpack = String.raw
`const path = require('path');
// vue-loader plugin
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  // 実行モード: develop => 開発, production => 本番
  // webpack4系以降はmodeを指定しないと警告が出る
  mode: 'development',
  // エントリーポイント
  entry: "./src/index.js",
  // 出力設定
  output: {
    // バンドル後のファイル名
    filename: 'bundle.js',
    // 出力先のパス（※絶対パスで指定すること）
    path: path.join(__dirname, 'public')
  },
  // ビルドしたJavaScriptにsource-mapを書き出す
  devtool: 'inline-soruce-map',
  // モジュール設定
  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\\.js$/,
        // babel-loaderを使って ES6 をコンパイル
        loader: "babel-loader",
        // Babel のオプションを指定
        options: {
          // preset_env の構文拡張を有効に
          presets: [
            ["@babel/preset-env"]
          ]
        },
        // node_modules/ 内のファイルは除外
        exclude: /node_modules/
      },
      {
        // 拡張子 .vue の場合
        test: /\.vue$/,
        // vue-loaderを使って vue をコンパイル
        use: "vue-loader"
      },
      {
        // .css ファイル: css-loader => style-loader の順に適用
        // - css-loader: cssをJSにトランスコンパイル
        // - style-loader: <link>タグにスタイル展開
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      /* アイコンloader設定 */
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader?mimetype=image/svg+xml'
        }],
      },
      {
        test: /\.woff(\d+)?(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader?mimetype=application/font-woff'
        }],
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader?mimetype=application/font-woff'
        }],
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader?mimetype=application/font-woff'
        }],
      },
    ]
  },
  // import文で読み込むモジュールの設定
  resolve: {
    extensions: [".js", ".vue"], // .js, .vue をimport可能に
    modules: ["node_modules"], // node_modulesディレクトリからimport可能に
    alias: {
      // vue-template-compilerに読ませてコンパイルするために必要
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  // VueLoaderPluginロード
  plugins: [new VueLoaderPlugin()],
  // 開発サーバー設定
  devServer: {
    // 起点ディレクトリを public/ に設定
    contentBase: path.join(__dirname, 'public'),
    // ポートを3000に設定
    port: 3000,
    // ブラウザを自動的に開く
    open: true
  }
};`;

const app = String.raw
`<template>
<v-app>
  <v-navigation-drawer app></v-navigation-drawer>
  <v-toolbar app></v-toolbar>
  <v-content>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-content>
  <v-footer app></v-footer>
</v-app>
</template>`;

const indexjs = String.raw
`import Vue from 'vue';
import App from './App'
import Vuetify from 'vuetify';
import Router from 'vue-router';

// vuetifyのスタイルシートload
import 'vuetify/dist/vuetify.min.css';
// material-design-iconsをload
import 'material-design-icons-iconfont/dist/material-design-icons.css';
// fontawesome
import '@fortawesome/fontawesome-free/css/all.css';
// IE11/Safari9用のpolyfill
import 'babel-polyfill';

// Homeコンポーネント
const Home = {
  template: '<v-alert :value="true" type="success">Hello, World!</v-alert>'
};

Vue.use(Vuetify); // Vuetifyのコンポーネントを使用可能に

// ルーター設定
Vue.use(Router);
const router = new Router({
  mode: 'history',
  routes: [
    {path: '/', component: Home},
  ]
});

new Vue({
  el: "#app",
  router,
  components: {App},
  template: '<App/>'
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
