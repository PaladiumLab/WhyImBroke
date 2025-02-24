// postcss.config.ts
import type { Config } from 'postcss-load-config';
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

const config: Config = {
  plugins: {
    '@tailwindcss/postcss': tailwindcss(),
    autoprefixer: autoprefixer(),
  },
};

export default config;