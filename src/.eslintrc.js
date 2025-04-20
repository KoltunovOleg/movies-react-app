module.exports = {
  env: {
    browser: true, // For browser-based projects
    es2021: true, // For ES6+ features
    node: true, // For Node.js
    jest: true, // For Jest testing environment
  },
  extends: [
    'eslint:recommended', // Base ESLint rules
    'plugin:react/recommended', // React-specific rules
    'plugin:jest/recommended', // Jest-specific rules
    'prettier', // Disables ESLint rules that conflict with Prettier
  ],
  parserOptions: {
    ecmaVersion: 12, // Support for modern ECMAScript features
    sourceType: 'module', // Enable ECMAScript modules
    ecmaFeatures: {
      jsx: true, // Enable JSX parsing
    },
  },
  plugins: ['react', 'jest', 'prettier'], // Add React, Jest, and Prettier plugins
  rules: {
    'prettier/prettier': 'error', // Show Prettier issues as ESLint errors
    'react/react-in-jsx-scope': 'off', // Not needed for React 17+ (new JSX transform)
    'react/prop-types': 'off', // Disable prop-types if you're not using them
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
};
