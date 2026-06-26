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

import * as De from 'blockly/msg/en'
import { de_tokens } from './de_tokens'

export const de_locale = {
    label: 'Deutsch',
    locale: De,
    tokens: de_tokens,
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
      attributionsText: 'Bilder erstellt und verteilt von user jucy_fish (Zugsymbol), Freepik (Sanduhr-GIF), <a href="https://www.flaticon.com/" title="icons source 1">Flaticon</a> und <a href="https://www.svgrepo.com" title="icons source 2">svgrepo</a>.'
    },
    toolboxLabels: {
      setStatements: 'Setzanweisungen',
      waitStatements: 'Warteanweisungen',
      controlFlow: 'Kontrollfluss'
    }
};
