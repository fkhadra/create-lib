module.exports = {
  make(projectName) {
    return {
      dirToCreate: ["src", "lib", "scripts", "test"],
      fileToCreate: {
        babel: {
          name: '.babelrc',
          content : { presets: ["es2015", "stage-0"] }
        },
        eslint: {
          name: '.eslintrc',
          content: {
            "extends": [
              "eslint:recommended",
              "airbnb"
            ],
            "parserOptions":{
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
              "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
              "no-unused-expressions": ["error", { "allowShortCircuit": true, "allowTernary": true  }],
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
    filename: 'dist/${projectName}.js',
    libraryTarget: 'umd',
    library: '${projectName}'
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
        build: {
          name: 'build.sh',
          dir: "scripts",
          content: `#!/bin/sh

rm -rf dist/*

./node_modules/.bin/webpack --output-filename=dist/${projectName}.js
./node_modules/.bin/webpack --output-filename=dist/${projectName}.min.js --optimize-minimize

./node_modules/.bin/babel src -d lib`
        }
      }
    }  
  }
};