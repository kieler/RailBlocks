import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import cspellPlugin from '@cspell/eslint-plugin';

const cspellImport = ['@cspell/dict-de-de'];

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  {
		plugins: { '@cspell': cspellPlugin },
		rules: {
			"no-unused-vars": "warn",
			"no-undef": "warn",
			"eol-last": "error",
			'@cspell/spellchecker': ['warn', { 
				report: 'simple',  
				cspell: {
					language: 'en-GB, en-US, de', 
					import: cspellImport,
					caseSensitive: false,
				},
				customWordListFile: "./backend/customWords.txt", // add custom words, that spellchecker doesn't know
			}], 
		},
	},
]);
