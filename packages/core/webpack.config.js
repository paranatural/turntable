const path = require('path')

let production = process.env.NODE_ENV === 'production'

const loaders = {}

loaders.typescript = {
  loader: 'ts-loader',
  options: {
    configFile: 'tsconfig.json',
    onlyCompileBundledFiles: true,
    compilerOptions: production ? {
      declaration: false,
      sourceMap: false,
      removeComments: true,
    } : {
      declaration: true,
      declarationDir: 'dist',
      sourceMap: true,
      removeComments: false,
    }
  }
}

loaders.babel = {
  loader: 'babel-loader',
  options: {}
}

const config = {
  mode: 'production',
  entry: ['./src/index.ts'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  },
  target: 'web',
  performance: {
    hints: 'warning',
    maxAssetSize: 10000,
    maxEntrypointSize: 10000,
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: [loaders.babel]
    }, {
      test: /\.tsx?$/,
      loader: [loaders.babel, loaders.typescript]
    }],
  },
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
}

module.exports = config
