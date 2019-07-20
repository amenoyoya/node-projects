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
  "devDependencies": {
    "@babel/core": "^7.4.5",
    "@babel/preset-env": "^7.4.5",
    "@babel/preset-react": "^7.0.0",
    "babel-loader": "^8.0.6",
    "babel-preset-react": "^6.24.1",
    "css-loader": "^3.0.0",
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "style-loader": "^0.23.1",
    "ts-loader": "^6.0.4",
    "typescript": "^3.5.3",
    "webpack": "^4.35.0",
    "webpack-cli": "^3.3.4",
    "webpack-dev-server": "^3.7.2"
  },
  "scripts": {
    "start": "webpack-dev-server"
  }
}
`;

const webpack = String.raw
`const path = require('path');

module.exports = {
    // 実行モード: develop => 開発, production => 本番
    // webpack4系以降はmodeを指定しないと警告が出る
    mode: 'development',
    // エントリーポイント
    entry: './src/index.js',
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
                // .js, .jsx ファイルを babel-loader でトランスコンパイル
                test: /\.js(x?)$/,
                exclude: /node_modules/, // node_modules/ 内のファイルは除外
                loader: 'babel-loader',
                // Babel のオプションを指定
                options: {
                    // preset_env, react の構文拡張を有効に
                    presets: [
                        ["@babel/preset-env"],
                        ["@babel/react"]
                    ]
                }
            },
            {
              // 拡張子 .ts の場合
              test: /\.ts$/,
              // ts-loaderを使って TypeScript をコンパイル
              use: "ts-loader"
            },
            {
                // .css ファイル: css-loader => style-loader の順に適用
                // - css-loader: cssをJSにトランスコンパイル
                // - style-loader: <link>タグにスタイル展開
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: { url: false }
                    }
                ]
            }
        ]
    },
    // import文で読み込むモジュールの設定
    resolve: {
      extensions: [".js", ".jsx", ".ts"], // .js, .jsx, .ts をimport可能に
      modules: ["node_modules"], // node_modulesディレクトリからimport可能に
    },
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

const tsconfig_json = String.raw
`{
  "compilerOptions": {
    "sourceMap": true,
    "target": "es5", // TypeScriptをECMAScript5にコンパイル
    "module": "es2015" // TypeScriptのモジュールは ES Modules として出力
  }
}`;

const indexjs = String.raw
`import React from 'react';
import ReactDOM from 'react-dom';

// ReactDOMにより id="root" の要素を置き換える
ReactDOM.render(
    <div className="content">
      <p>Hello, World!</p>
    </div>,
    document.getElementById('root')
);`;

const index = String.raw
`<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
    </head>
    <body>
        <!-- Reactにより id="root" の要素が置き換えられる -->
        <div id="root"></div>
        <!-- React + webpack によりバンドルされた bundle.js を読み込む -->
        <script src="./bundle.js"></script>
    </body>
</html>`;

writeFile('./public/index.html', index);
writeFile('./src/index.js', indexjs);
writeFile('./package.json', package);
writeFile('./tsconfig.json', tsconfig_json);
writeFile('./webpack.config.js', webpack);
