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
    input: './src/index-core.ts',
    output: {
      file: './dist/bundle-core.js',
      format: 'cjs',
    },
    plugins: [typescript(), terser()],
  },
];
