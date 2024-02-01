## run commands
- cd jest-setup
- make karma-u
- make jest-i
- cp jest.config.js to root

## angular.json
```
        "test": {
          "builder": "@angular-builders/jest:run",
          "options": {
            "polyfills": ["zone.js", "zone.js/testing"],
            "tsConfig": "tsconfig.spec.json",
            "assets": ["src/favicon.ico", "src/assets"],
            "styles": ["src/styles.css"],
            "scripts": []
          }
        }
```

## tsconfig.spec.json
```
    "types": [
      "jest", "node"
    ],
```

## package.json
```
  "test:watch": "ng test --watch",
```
