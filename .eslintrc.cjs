module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true //新增此項 module.exports需透過node處理
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    './.eslintrc-auto-import.json'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module', // 與parser對調後
    parser: '@typescript-eslint/parser' //與sourceType對調後
  },
  plugins: ['@typescript-eslint', 'vue'],
  rules: {
    '@typescript-eslint/ban-types': [
      // 關閉錯誤(error)：不要以 {} 當作一個類型
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false
        }
      }
    ]
  }
}
