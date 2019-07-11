module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: [
    'vue'
  ],
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'generator-star-spacing': 'off',
    "indent": ["error", 2, { "SwitchCase": 1 }],// 缩进风格
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    VERSION: false
  }
}
