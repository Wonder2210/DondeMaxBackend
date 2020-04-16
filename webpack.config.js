const path = require('path');
const {CheckerPlugin} = require('awesome-typescript-loader');
//nunca olvides de colocar target node en webpack
module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  target:'node',
  externals: { knex: 'commonjs knex' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [ ".mjs",'.js', '.ts','.(graphql|gql)'],
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
        }
      ]
  },
  plugins:[
    new CheckerPlugin(),
  ]
  
};
