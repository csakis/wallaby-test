'use strict';
const { resolve } = require('path');
const { on } = require('process');
const prettierConfig = require('./prettier.config');

// rules are at https://eslint.org/docs/rules/

const OFF = 'off';
const ERROR = 'error';
const WARN = 'warn';

// migration candidates want to become house rules
// turn them on to see how far we have to go
const migrationTarget = OFF;
const migrations = {
  '@typescript-eslint/ban-types': WARN,
  '@typescript-eslint/no-explicit-any': migrationTarget,
  // Typescript 4.0 migration
  '@typescript-eslint/explicit-module-boundary-types': migrationTarget,
  '@typescript-eslint/no-unsafe-member-access': migrationTarget,
  '@typescript-eslint/no-unsafe-return': migrationTarget,
  '@typescript-eslint/no-unsafe-call': migrationTarget,
  '@typescript-eslint/no-unsafe-assignment': migrationTarget,
};

const importOrderConfig = {
  groups: ['builtin', 'external', 'internal'],
  pathGroups: [
    {
      pattern: 'react',
      group: 'external',
      position: 'before',
    },
  ],
  pathGroupsExcludedImportTypes: ['react'],
  'newlines-between': 'ignore',
  alphabetize: {
    order: 'asc',
    caseInsensitive: true,
  },
};

const houseRules = {
  'prettier/prettier': [ERROR, prettierConfig],
  'no-console': [ERROR, { allow: [WARN] }],
  curly: [ERROR, 'all'],
  'arrow-parens': [ERROR, 'as-needed'],
  'arrow-body-style': [ERROR, 'as-needed'],
  'no-shadow': ERROR,
  'default-case': ERROR,
  'operator-linebreak': ERROR,
  'object-curly-newline': ERROR,
  'import/no-named-as-default': ERROR,
  'no-shadow': ERROR,
  'import/no-cycle': ERROR,
  'react/display-name': OFF,
  'react/prop-types': ERROR,
  'react/forbid-prop-types': [
    ERROR,
    {
      forbid: ['any', 'array', 'object'],
      checkContextTypes: true,
      checkChildContextTypes: true,
    },
  ],
  'react/prop-types': OFF,
  'react/no-array-index-key': ERROR,
  'react-hooks/exhaustive-deps': OFF,
  'react-hooks/rules-of-hooks': ERROR,
  'import/order': [ERROR, importOrderConfig],
  'no-underscore-dangle': ERROR,
  'max-params': [ERROR, { max: 4 }],
  'max-lines': [ERROR, { max: 200 }],
  complexity: [ERROR, { max: 7 }],
  'max-statements': [ERROR, 30],
  'max-nested-callbacks': [ERROR, { max: 3 }],

  '@typescript-eslint/restrict-plus-operands': ERROR,
  '@typescript-eslint/ban-ts-comment': ERROR,
  '@typescript-eslint/no-floating-promises': ERROR,
  '@typescript-eslint/unbound-method': ERROR,
  '@typescript-eslint/explicit-function-return-type': OFF,
  '@typescript-eslint/unbound-method': OFF,
  '@typescript-eslint/no-unused-vars': ERROR,
  '@typescript-eslint/no-implied-eval': ERROR,
  '@typescript-eslint/no-implied-eval': ERROR,
  '@typescript-eslint/no-var-requires': ERROR,
  '@typescript-eslint/restrict-template-expressions': OFF,
};

// rules only applied to test spec files
const testingRules = {
  ...houseRules,
  'jest/no-mocks-import': OFF,
  'jest/no-test-prefixes': OFF,
  'jest/no-disabled-tests': OFF,
  'jest/expect-expect': OFF,
};

module.exports = {
  root: true,
  env: {
    browser: true,
    jest: true,
    es6: true,
    node: true,
  },
  globals: {
    context: false,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', 'jest', '@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:jest/recommended',
    'plugin:jest-dom/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'prettier',
  ],
  rules: {
    ...houseRules,
    ...migrations,
  },
  overrides: [
    {
      files: ['*.spec.*'],
      rules: testingRules,
    },
  ],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: [resolve(__dirname, 'src')],
        extensions: ['.js', '.json', '.ts', '.tsx'],
      },
      'babel-module': {}, // refer to babel config for path resolution
    },
  },
};
