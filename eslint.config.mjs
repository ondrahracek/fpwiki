// https://eslint.nuxt.com
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      // Prettier writes self-closing void elements (<input/>); accept either
      // form to avoid a Prettier vs ESLint loop.
      'vue/html-self-closing': [
        'warn',
        {
          html: { void: 'any', normal: 'always', component: 'always' },
          svg: 'always',
          math: 'always',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    files: ['scripts/**/*.ts', 'test/**/*.ts'],
    rules: {
      'no-console': 'off',
    },
  },
)
