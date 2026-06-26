/*
 * RailBlocks - A Blockly RailSL Implementation
 *
 * https://github.com/kieler/RailBlocks
 *
 * Copyright 2026 by
 *  + Kiel University and others
 *    + Department of Computer Science
 *      + Real-Time and Embedded Systems Group
 *
 * This program and the accompanying materials are made
 * available under the terms of the MIT License which
 * is available at https://opensource.org/license/MIT.
 *
 * SPDX-License-Identifier: MIT
 */

import * as En from 'blockly/msg/en'
import { en_tokens } from './en_tokens'

export const en_locale = {
    label: 'English',
    locale: En,
    tokens: en_tokens,
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
      attributionsText: 'Images created and distributed by user jucy_fish (train icon), Freepik (hourglass gif), <a href="https://www.flaticon.com/" title="icons source 1">Flaticon</a> and <a href="https://www.svgrepo.com" title="icons source 2">svgrepo</a>.'
    },
    toolboxLabels: {
      setStatements: 'Set Statements',
      waitStatements: 'Wait Statements',
      controlFlow: 'Control Flow'
    }
};
