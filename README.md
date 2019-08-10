# Project generators for Node.js

## What's this?

Node.jsの開発環境でよく使うプロジェクトの最小構成を生成するスクリプト集

***

## Environment

- Terminal:
    - Bash (If in Windows, use `Git Bash for Windows`)
- CLI:
    - nodejs: `10.15.3`
    - yarn (package manager): `1.15.2`
    - curl (download manager)

***

## Project templates

### Vuetify
```bash
# generate minimal vuetify project
$ curl https://raw.githubusercontent.com/amenoyoya/node-projects/master/vuetify.js | node -

# install node modules
$ yarn install

# run webpack-dev-server
$ yarn start

# => Run Vuetify App on http://localhost:3000 
```

- Minimal Vuetify Project:
    ```conf
    ./
    |- public/
    |   `- index.html
    |- src/
    |   |- App.vue
    |   `- index.js
    |- package.json
    `- webpack.config.js
    ```

---

### Vue
```bash
# generate minimal vue project
$ curl https://raw.githubusercontent.com/amenoyoya/node-projects/master/vue.js | node -

# install node modules
$ yarn install

# run webpack-dev-server
$ yarn start

# => Run Vuetify App on http://localhost:3000 
```

- Minimal Vuetify Project:
    ```conf
    ./
    |- public/
    |   `- index.html
    |- src/
    |   |- App.vue
    |   `- index.js
    |- package.json
    `- webpack.config.js
    ```

---

### React
```bash
# generate minimal react project
$ curl https://raw.githubusercontent.com/amenoyoya/node-projects/master/react.js | node -

# install node modules
$ yarn install

# run webpack-dev-server
$ yarn start

# => Run React App on http://localhost:3000 
```

- Minimal React Project:
    ```conf
    ./
    |- public/
    |   `- index.html
    |- src/
    |   `- index.js
    |- package.json
    `- webpack.config.js
    ```

---

### TypeScript
```bash
# generate minimal typescript project
$ curl https://raw.githubusercontent.com/amenoyoya/node-projects/master/typescript.js | node -

# install node modules
$ yarn install

# run webpack-dev-server
$ yarn start

# => Run TypeScript App on http://localhost:3000 
```

- Minimal TypeScript Project:
    ```conf
    ./
    |- public/
    |   `- index.html
    |- src/
    |   `- main.ts
    |- package.json
    |- tsconfig.json
    `- webpack.config.js
    ```
