#!/usr/bin/env node
const shell = require("shelljs");

const rimraf = require.resolve("rimraf/bin.js");
const babel = require.resolve("babel-cli/bin/babel.js");
const args = process.argv.slice(2);

shell.exec(`${rimraf} dist`);

shell.exec(`${babel} src --out-dir dist --copy-files ${args.join(" ")}`);
