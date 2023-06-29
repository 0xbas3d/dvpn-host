/** @type {import('@commitlint/types').UserConfig} */
const config = {
  extends: ['@commitlint/config-conventional'],
  formatter: '@commitlint/format',
  rules: {
    'type-enum': [
      2,
      'always',
      ['fix', 'ui', 'refactor', 'feat', 'chore', 'test', 'revert', 'perf', 'ci'],
    ],
    'subject-max-length': [2, 'always', 72],
    'body-max-length': [2, 'always', 80],
  },
  defaultIgnores: false,
  helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
};

module.exports = config;
