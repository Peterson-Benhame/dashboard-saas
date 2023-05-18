module.exports = {
  extends: 'next/core-web-vitals',
  plugins: ['simple-import-sort'],
  rules: {
    "@next/next/no-document-import-in-page": "off",
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          // Packages.
          ['^@?\\w'],
          // Internal packages.
          ['^(@app)(/.*|$)'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
        ],
      },
    ],
  },
};
