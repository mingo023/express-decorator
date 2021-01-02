const tsConfig = require('./tsconfig.json');
const path = require('path');
const tsConfigPaths = require('tsconfig-paths');

const baseUrl = path.join(__dirname, 'build');
console.log(baseUrl);

tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths,
});
