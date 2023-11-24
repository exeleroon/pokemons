// eslint-disable-next-line no-undef
module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            tsx: true
        },
    },
    plugins: ['@typescript-eslint', 'react', 'react-hooks'],
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        "no-empty-pattern": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        'react/prop-types': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
};