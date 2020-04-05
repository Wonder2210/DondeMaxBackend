const path = require('path');
const {CheckerPlugin} = require('awesome-typescript-loader');
//nunca olvides de colocar target node en webpack
module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  target:'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".mjs", ".json",'.js', '.ts','.(graphql|gql)'],
    modules: [
        'node_modules',
        'src',
    ]
},
  module:{
      rules:[
        {
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            loader: 'graphql-tag/loader'
        },
        {
            test: /\.ts$/,
            exclude: /node_modules/,
            loaders: 'awesome-typescript-loader'
        },
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
        }
      ]
  },
  plugins:[
    new CheckerPlugin(),
  ]
  
};
