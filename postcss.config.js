const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');
const atImport = require('postcss-import');

const plugins = [
  atImport,
  autoprefixer,
  postcssPresetEnv({
    stage: 1,
    preserve: true,
    features: {
      'custom-properties': true,
    },
  }),
];

// Vite sets NODE_ENV=production for `vite build`; only minify there so the
// dev server keeps serving readable CSS.
if (process.env.NODE_ENV === 'production') {
  const cssnano = require('cssnano');

  plugins.push(
    cssnano({
      preset: 'default',
    })
  );
}

module.exports = { plugins };
