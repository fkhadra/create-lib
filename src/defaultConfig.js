//default conf
module.exports = {
  dirToCreate: ["src", "scripts", "lib", "test"],
  fileToCreate: {
    babel: {
      name: '.babelrc',
      content: {presets: ["es2015", "stage-0"]}
    },
    eslint: {
      name: '.eslintrc',
      content: {
        "extends": [
          "eslint:recommended",
          "airbnb"
        ],
        "parserOptions": {
          "ecmaFeatures": {
            "experimentalObjectRestSpread": true
          }
        },
        "rules": {
          "max-len": [1, 120, 2, {"ignoreComments": true}],
          "quote-props": [1, "consistent-as-needed"],
          "no-cond-assign": [2, "except-parens"],
          "radix": 0,
          "space-infix-ops": 0,
          "no-unused-vars": [1, {"vars": "local", "args": "none"}],
          "default-case": 0,
          "no-else-return": 0,
          "no-param-reassign": 0,
          "quotes": 0,
          "comma-dangle": 0,
          "react/jsx-filename-extension": [1, {"extensions": [".js", ".jsx"]}],
          "no-unused-expressions": ["error", {"allowShortCircuit": true, "allowTernary": true}],
          "consistent-return": ["warn"]
        }
      },
    },
    webpack: {
      name: 'webpack.config.js',
      content: `
var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  devServer: {
    hot: true,
    inline: true,
    port: 7700,
    historyApiFallback: true
  },
  output: {
    filename: 'dist/${PROJECT_NAME}.js',
    libraryTarget: 'umd',
    library: '${PROJECT_NAME}'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ]
};
`
    },
    gitignore: {
      name: '.gitignore',
      content: `node_modules/
.idea
.DS_Store
lib/
npm-debug.log`
    },
    npmignore: {
      name: '.npmignore',
      content: `src/
.babelrc
.eslintrc
node_modules
npm-debug.log
scripts/
webpack.config.js
test/
.DS_Store
.idea`
    },
    build: {
      name: 'scripts/build.sh',
      content: `#!/bin/sh

rm -rf dist/*

./node_modules/.bin/webpack --output-filename=dist/${PROJECT_NAME}.js
./node_modules/.bin/webpack --output-filename=dist/${PROJECT_NAME}.min.js --optimize-minimize

./node_modules/.bin/babel src -d lib`
    },
    index: {
      name: 'src/index.js',
      content: `console.log('If you see this, it works !');`
    }
  },
  npm: {
    dependencies: [],
    devDependencies: [
      "babel-cli",
      "babel-preset-es2015",
      "babel-preset-stage-0",
      "chai",
      "eslint",
      "eslint-config-airbnb",
      "eslint-plugin-import",
      "jsdom",
      "karma",
      "mocha",
      "sinon",
      "webpack",
      "babel-loader",
      "webpack-dev-server"
    ],
    scripts: {
      "dev": "webpack-devserver",
      "bundle": "webpack -w",
      "lint": "eslint src/",
      "build": "./scripts/build.sh"
    },
    main: "src/index.js",
    license: "MIT"
  }
};