/*
* RailBlocks - A Blockly RailSL Implementation
*
* https://github.com/kieler/RailBlocks
*
* Copyright 2025 by
*  + Tokessa Hamann and
*  + Henri Heyden and
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
import * as En from 'blockly/msg/en'
import * as De from 'blockly/msg/de'
import { RailBlocksEnTable } from '../backend/tokens_en.js'
import { RailBlocksDeTable } from '../backend/tokens_de.js'

const LANGUAGE_STORAGE_KEY = 'railblocks.language'

// This file containsconstants related to localization, such as retrieving the correct labels for the current language and applying the selected language to the Blockly editor and the page.
const LANGUAGE_CONFIGS = {
  de: {
    label: 'Deutsch',
    locale: De,
    tokens: RailBlocksDeTable,
    htmlLabels: {
      title: 'RailBlocks',
      simulationTitle: 'Simulieren',
      deployTitle: 'Auf der Anlage ausführen',
      optionsTitle: 'Entwicklerinformationen anzeigen',
      languageButton: 'Sprache',
      languageMenuLabel: 'Editorsprache',
      generatedCodeTitle: 'Generierter RailSL',
      logsTitle: 'Protokolle',
      deployConfirm: 'Wirklich auf der Anlage ausführen?',
      saveTitle: 'Aktuellen Arbeitsbereich auf der Festplatte speichern',
      loadTitle: 'Arbeitsbereich von der Festplatte laden',
      attributionsTitle: 'Danksagungen',
      attributionsText: 'Bilder erstellt und verteilt von user jucy_fish (Zugsymbol), Freepik (Sanduhr-GIF) und <a href="https://www.flaticon.com/" title="icons source">Flaticon.</a>'
    },
    toolboxLabels: {
      setStatements: 'Setzanweisungen',
      waitStatements: 'Warteanweisungen',
      controlFlow: 'Kontrollfluss'
    }
  },
  en: {
    label: 'English',
    locale: En,
    tokens: RailBlocksEnTable,
    htmlLabels: {
      title: 'RailBlocks',
      simulationTitle: 'Simulate',
      deployTitle: 'Deploy on railway',
      optionsTitle: 'View developer information',
      languageButton: 'Language',
      languageMenuLabel: 'Editor language',
      generatedCodeTitle: 'Generated RailSL',
      logsTitle: 'Logs',
      deployConfirm: 'Really deploy on the railway?',
      saveTitle: 'Save current workspace to disk',
      loadTitle: 'Load workspace from disk',
      attributionsTitle: 'Attributions',
      attributionsText: 'Images created and distributed by user jucy_fish (train icon), Freepik (hourglass gif) and <a href="https://www.flaticon.com/" title="icons source">Flaticon.</a>'
    },
    toolboxLabels: {
      setStatements: 'Set Statements',
      waitStatements: 'Wait Statements',
      controlFlow: 'Control Flow'
    }
  }
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
  Blockly.setLocale(config.tokens)
  document.documentElement.lang = languageId
  return config
}


export { getLabel, getToolBoxLabels, getHtmlLabels, getStoredLanguage, applyLanguage, LANGUAGE_STORAGE_KEY }