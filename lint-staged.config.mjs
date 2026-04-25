export default {
  '*.{ts,mts,vue,mjs,cjs,js}': ['eslint --fix', 'prettier --write'],
  '*.{json,yml,yaml,css,html}': ['prettier --write'],
  '*.md': ['prettier --write --ignore-path .prettierignore'],
}
