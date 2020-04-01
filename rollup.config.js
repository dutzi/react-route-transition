// import babel from 'rollup-plugin-babel';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: './src/index.ts',
    output: {
      file: './dist/bundle.js',
      format: 'cjs',
    },
    plugins: [typescript(), terser()],
  },
  {
    input: './src/index-react-router.ts',
    output: {
      file: './dist/bundle-react-router.js',
      format: 'cjs',
    },
    plugins: [typescript(), terser()],
  },
];
