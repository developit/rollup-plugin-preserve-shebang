# rollup-plugin-preserve-shebang

> Automatically preserve a shebang in your entry file.

If you're building CLI's with Rollup, this will fix your npm `bin` from being broken. 🥳

## How it works

Since shebangs are not valid Javascript syntax (they are instructions for the operating system's command-line interpreter), they need to be removed before rollup can continue bundling. This plugin works by first removing the shebang defined in your entry file, then letting rollup bundle your project normally, and then re-inserting the shebang after the build is complete. Thus, *preserving* your shebang.

## Installation

Install the plugin via npm:

```
npm install --save-dev rollup-plugin-preserve-shebang
```

Or with yarn:

```
yarn add -D rollup-plugin-preserve-shebang
```

## Usage

Add the `shebang` function to the `plugins` array inside your to rollup configuration:

```js
import shebang from 'rollup-plugin-preserve-shebang';

export default {
    plugins: [
        shebang()
    ]
}
```

```js
shebang({
    // Set the shebang manually to override the existing shebang:
    shebang: '#!/usr/bin/env node'
})
```

## License

MIT
