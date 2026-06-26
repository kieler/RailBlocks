/*
* RailBlocks - A Blockly RailSL Implementation
*
* https://github.com/kieler/RailBlocks
*
* Copyright 2026 by
*  + Tokessa Hamann and 
*  + Kiel University
*    + Department of Computer Science
*      + Real-Time and Embedded Systems Group
*
* This program and the accompanying materials are made
* available under the terms of the MIT License which
* is available at https://opensource.org/license/MIT.
*
* SPDX-License-Identifier: MIT
*/

import * as Blockly from 'blockly/core'
import { en_locale } from '../locales/en/en_locale'
import { de_locale } from '../locales/de/de_locale'


const LANGUAGE_STORAGE_KEY = 'railblocks.language'

// This file contains constants related to localization, such as retrieving the correct labels for the current language and applying the selected language to the Blockly editor and the page.
const LANGUAGE_CONFIGS = {
  en: en_locale,
  de: de_locale
}

/**
 * Retrieves the toolbox labels for the specified language.
 * @param {String} languageId The id of the language for which to retrieve labels.
 * @returns {Object} The toolbox labels for the specified language.
 */
function getToolBoxLabels (languageId) {
  const config = LANGUAGE_CONFIGS[languageId]
  return config ? config.toolboxLabels : LANGUAGE_CONFIGS['de'].toolboxLabels
}

/**
 * Retrieves the label for the specified language.
 * @param {String} languageId The id of the language for which to retrieve the label.
 * @returns {String} The label for the specified language.
 */
function getLabel (languageId) {
  const config = LANGUAGE_CONFIGS[languageId]
  return config ? config.label : LANGUAGE_CONFIGS['de'].label
}

/**
 * Retrieves the HTML labels for the specified language.
 * @param {String} languageId The id of the language for which to retrieve labels.
 * @returns {Object} The HTML labels for the specified language.
 */
function getHtmlLabels (languageId) {
  const config = LANGUAGE_CONFIGS[languageId]
  return config ? config.htmlLabels : LANGUAGE_CONFIGS['de'].htmlLabels
}

/**
 * Retrieves the stored language from localStorage, or defaults to 'de' if not found or invalid.
 * @returns {String} The id of the stored language.
 */
function getStoredLanguage () {
  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
  return storedLanguage && LANGUAGE_CONFIGS[storedLanguage] ? storedLanguage : 'de'
}

/**
 * Applies the specified language to the application.
 * @param {String} languageId The id of the language to apply.
 * @returns {Object} The configuration for the applied language.
 */
function applyLanguage (languageId = getStoredLanguage()) {
  const config = LANGUAGE_CONFIGS[languageId]
  Blockly.setLocale(config.locale)
  Object.assign(Blockly.Msg, config.tokens)
  document.documentElement.lang = languageId
  return config
}


export { getLabel, getToolBoxLabels, getHtmlLabels, getStoredLanguage, applyLanguage, LANGUAGE_STORAGE_KEY }
