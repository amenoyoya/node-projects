# ES2019環境構築

## Environment

- Node.js: `10.16.2`
    - yarn: `1.17.3`

***

## Webpack + Babel 構成

- ES2015以上の言語仕様でJavaScriptを書くのが昨今の基本テクニック
- IE11などの古いブラウザではES2015以上の仕様が動作しない
- BabelなどのトランスコンパイラでES2015以上のJavaScriptをECMAScript5に変換する
- Webpackなどのモジュールハンドラを使って ES Module 機能を実現する

### 最小構成
```bash
$ yarn add -D webpack webpack-cli babel-loader @babel/core @babel/preset-env
```

- **webpack.config.js**
    ```javascript
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
          }
        ]
      }
    };
    ```
