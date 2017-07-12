module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "plugin:flowtype/recommended",
    "airbnb-base"
  ],
  "plugins": [
    "flowtype"
  ],
  "settings": {
    "flowtype": {
      "onlyFilesWithFlowAnnotation": true
    }
  },
  "rules": {
    "semi": ["error", "always"],
    "max-len": ["error", 120]
  }
};
