module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        // Updated the ecmaVersion to the latest supported
        "ecmaVersion": 2021,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "react-hooks"  // Include react-hooks here
    ],
    "rules": {
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
        "react-hooks/exhaustive-deps": "warn",  // Checks effect dependencies
        "react/display-name": "off"  // Turn off display name rule
    }
};