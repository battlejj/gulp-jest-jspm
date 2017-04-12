'use strict';

const through = require('through2');
const gulpJest = require('gulp-jest');
const jestJspm = require('jest-jspm');

const makeJestConfig = function(basePath, options) {
	return jestJspm(basePath, options);
};

/**
 *
 *	@param options
 *	@param options.jestConfig - config object or string path to config json file (default: {})
 * 	@param options.jestOptions - config object for the Jest CLI (default: undefined)
 *	@param options.systemJs - where is system js located (default: "./jspm_packages/system")
 *	@param options.sjsConfigFile - where is the System JS config file located (default: "./config")
 * 	@param options.loadSjsConfFile - whether to load the System JS config file (default: true)
 * 	@param options.jspmPackages - location of jspm packages (default: "./jspm_packages")
 *	@param options.nodeModules - location of node modules dir (default: "./node_modules")
 *	@param options.displayWarnings - whether the plugin will output warnings to console (default: false)
 */
function jestStream(options) {
	const myStream = through.obj(function(file, enc, cb) {
		const combinedOptions = Object.assign({}, options.jestOptions, { config: makeJestConfig(file.cwd, options) });
		myStream.pipe(gulpJest(combinedOptions));

		return cb(null, file);
	});

	return myStream;
};

exports = module.exports = {
	jestStream: jestStream,
	makeJestConfig: makeJestConfig
};