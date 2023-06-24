module.exports = {
  '*.css': ['stylelint --fix'],
  '*.{ts,tsx,js,json}': ['eslint --cache --fix'],
  '*.{md,svg}': ['prettier --write'],
  '.browserslistrc': ['browserslist-lint'],
  'renovate.json': ['renovate-config-validator'],
};
