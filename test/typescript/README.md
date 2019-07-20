# TypeScript環境構築

## Setup

### Environment
- OS:
    - Windows 10
    - Ubuntu 18.04 LTS
- CLI:
    - nodejs: `10.15.3`
    - yarn (package manager): `1.15.2`

---

### Setup
```bash
# webpack, typescript をローカルインストール
$ yarn add -D webpack webpack-cli webpack-dev-server typescript ts-loader
```

- **webpack.config.js** (Webpackの設定)
    ```javascript
    const path = require('path');
    
    module.exports = {
      // 実行モード: develop => 開発, production => 本番
      // webpack4系以降はmodeを指定しないと警告が出る
      mode: 'development',
      // エントリーポイント
      entry: "./src/main.ts",
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
            // 拡張子 .ts の場合
            test: /\.ts$/,
            // ts-loaderを使って TypeScript をコンパイル
            use: "ts-loader"
          }
        ]
      },
      // import文で読み込むモジュールの設定
      resolve: {
        extensions: [".js", ".ts"], // .js, .ts をimport可能に
        modules: ["node_modules"] // node_modulesディレクトリからimport可能に
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
    };
    ```
- **tsconfig.json** (TypeScriptのコンパイル設定)
    ```json
    {
      "compilerOptions": {
        "sourceMap": true,
        "target": "es5", // TypeScriptをECMAScript5にコンパイル
        "module": "es2015" // TypeScriptのモジュールは ES Modules として出力
      }
    }
    ```
- **package.json** (コマンドラインスクリプトの追加)
    ```json
    {
      // ～略～
      // `yarn start` コマンドで `webpack-dev-server` 実行可能に
      "scripts": {
        "start": "webpack-dev-server"
      }
    }
    ```

---

### Test run
簡単な TypeScript プログラムをコンパイル＆実行してみる

- **public/index.html** (webpack-dev-serverのエントリーポイント)
    ```html
    <!DOCTYPE html>
    <html lang="ja">
        <head>
            <meta charset="utf-8">
        </head>
        <body>
            <div id="root"></div>
            <!-- webpack によりバンドルされた bundle.js を読み込む -->
            <script src="./bundle.js"></script>
        </body>
    </html>
    ```
- **src/main.ts** (webpack + TypeScript のエントリーポイント)
    ```typescript
    class Person {
   	  fullName: string;
   
   	  constructor(
   	    public firstName: string,
   	    public lastName: string)
   	  {
   	    this.fullName = firstName + " " + lastName;
      }
    }

    const greeter = (person: Person) => 'Hello, ' + person.fullName;
    let user = new Person('Robin', 'Brandner');
   
    document.getElementById('root').innerHTML = greeter(user);
    ```

```bash
# TypeScriptコンパイル => Webpackでbundle.jsにパッキング => webpack-dev-serverでHTML表示
$ yarn start

# => localhost:3000
# => Hello, Robin Brandner
```
