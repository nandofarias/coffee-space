module.exports = {
    "extends": "airbnb-base",
    "env": {
        "mocha": true
    },
    rules: {
        "comma-dangle": ["error", "never"],
        "no-underscore-dangle": [2, { "allow": ["_id"] }]
    }
};