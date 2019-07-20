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

const index_html = String.raw
`<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
    </head>
    <body>
        <div id="root"></div>
        <!-- webpack によりバンドルされた bundle.js を読み込む -->
        <script src="./bundle.js"></script>
    </body>
</html>`;

const main_ts = String.raw
`class Person {
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

document.getElementById('root').innerHTML = greeter(user);`;

const package_json = String.raw
`{
  "scripts": {
    "start": "webpack-dev-server"
  },
  "devDependencies": {
    "ts-loader": "^6.0.4",
    "typescript": "^3.5.3",
    "webpack": "^4.36.1",
    "webpack-cli": "^3.3.6",
    "webpack-dev-server": "^3.7.2"
  }
}`;

const tsconfig_json = String.raw
`{
  "compilerOptions": {
    "sourceMap": true,
    "target": "es5", // TypeScriptをECMAScript5にコンパイル
    "module": "es2015" // TypeScriptのモジュールは ES Modules として出力
  }
}`;

const webpack_config = String.raw
`const path = require('path');

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
};`;

writeFile('./public/index.html', index_html);
writeFile('./src/main.ts', main_ts);
writeFile('./package.json', package_json);
writeFile('./tsconfig.json', tsconfig_json);
writeFile('./webpack.config.js', webpack_config);
