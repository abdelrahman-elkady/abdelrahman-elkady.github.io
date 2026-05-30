const postcssPresetEnv = require('postcss-preset-env');

// Kept minimal — the build already covers the rest:
//   • minification      → Vite's built-in CSS minifier (`vite build`)
//   • `@import` inlining → Vite prepends its own postcss-import
//   • vendor prefixing   → bundled inside postcss-preset-env
// so this only configures preset-env's transforms.
module.exports = {
  plugins: [
    postcssPresetEnv({
      stage: 1,
      preserve: true,
      features: {
        'custom-properties': true,
      },
    }),
  ],
};
