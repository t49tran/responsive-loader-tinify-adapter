<h1 align="center">Responsive Loader Tinify Adapter</h1>
<div align="center">

Using [Tinify](https://www.npmjs.com/package/tinify) to compress/resize images for [Responsive Loader](https://github.com/dazuaz/responsive-loader) webpack loader.

![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

</div>

## Install

```bash
npm install --save-dev responsive-loader-tinify-adapter
```

## Usage

#### Tinify key

You will need an API key from [Tinify](https://tinypng.com/)

#### Responsive loader

```javascript
// Webpack config
const {
  responsiveLoaderTinifyAdapter
} = require('responsive-loader-tinify-adapter');

const config = {
  ...
  module: {
    rules: [
       {
        test: /\.(jpg)$/,
        loader: 'responsive-loader',
        options: {
          name: '[name]-[width].[ext]',
          adapter: responsiveLoaderTinifyAdapter({
              tinifyKey: [YOUR_TINIFY_KEY]
          }) // You can limit this adapter only to run in production mode if you want to
        }
      }
    ]
  },
  ...
}
```
