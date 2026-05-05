// This file isn't transpiled, so must use Common JS and ES5

// Register babel to transpile before our tests run.
// Tells mocha that first babel should transpile our test before mocha runs those tests.
require('babel-register')();

//Disable webpack features that Mocha doesn't understand.
require.extensions['.css'] = function() {};
