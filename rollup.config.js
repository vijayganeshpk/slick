import cssdiscard from 'postcss-discard-comments';
import cssimport from 'postcss-import';
import cssurl from 'postcss-url';
import path from 'path';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';


const devel = () => [
    'dev', 'devel', 'development'
].includes(process.env.BUILD);


const assetStyle = (compat) => {
  return {
    input: (compat ? '_assets/_style-compat.css' : '_assets/_style.css'),
    output: {
      file: (compat ? 'assets/style-compat.css' : 'assets/style.css'),
      format: 'system',
    },
    plugins: [
      postcss({
        plugins: [
          cssimport(),
          cssurl({
            url: 'copy',
            assetsPath: 'static/assets/fonts',
            useHash: true,
          }),
          cssurl({
            url: (asset) => path.relative('static', asset.url),
          }),
          cssdiscard({
            removeAll: true,
          }),
        ],
        extract: true,
        minimize: !devel(),
        sourceMap: (devel() ? 'inline' : false),
      }),
    ],
  };
};


const assetScript = () => {
  return {
    input: '_assets/_script.ts',
    output: {
      file: 'assets/script.js',
      format: 'iife',
    },
    plugins: [
      typescript(),
      (devel() ? null : terser()),
    ],
  };
};


export default [
  assetStyle(false),
  assetStyle(true),
  assetScript(),
];
