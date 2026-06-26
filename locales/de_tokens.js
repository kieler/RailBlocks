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

// This file contains the German translations for the block labels, tooltips and warnings.
export const de_tokens = {
  RAILBLOCKS_PROGRAM_TEXT: 'Programm',
  RAILBLOCKS_PROGRAM_TOOLTIP: 'Das Programm, das ausgeführt werden soll.\n Alle weiteren Befehle sollten innerhalb dieses Blocks stehen.',

  RAILBLOCKS_LOOP_TEXT: 'Wiederholung',
  RAILBLOCKS_LOOP_TOOLTIP: 'Wiederhole den gesamten Code innerhalb dieses Blocks.',

  RAILBLOCKS_STOP_TEXT: 'Stopp',
  RAILBLOCKS_STOP_TOOLTIP: 'Setze Gleis(e) auf keine Geschwindigkeit.',

  RAILBLOCKS_DIR_TEXT: 'Geschwindigkeit: %1 rückwärts: %2',
  RAILBLOCKS_DIR_TOOLTIP: 'Setze Gleis(e) auf Geschwindigkeit mit angegebener Richtung.',
  RAILBLOCKS_DIR_SLOW_TEXT: 'langsam',
  RAILBLOCKS_DIR_FULL_TEXT: 'voll',

  RAILBLOCKS_CONTACT_WAIT_TEXT: 'Warte bis %2 Kontakt von %3 %1 wurde',
  RAILBLOCKS_CONTACT_WAIT_TOOLTIP: 'Tue nichts bis ein Zug mit einem Gleis interagiert.',
  RAILBLOCKS_CONTACT_WAIT_REACHED: 'erreicht',
  RAILBLOCKS_CONTACT_WAIT_PASSED: 'passiert',
  RAILBLOCKS_CONTACT_WAIT_FIRST: 'erster',
  RAILBLOCKS_CONTACT_WAIT_SECOND: 'zweiter',

  RAILBLOCKS_TIME_WAIT_TEXT: 'Warte für %1 Sekunde(n)',
  RAILBLOCKS_TIME_WAIT_TOOLTIP: 'Tue nichts für eine bestimmte Zeit.',

  RAILBLOCKS_CROSSING_TEXT: '%1 Bahnübergang',
  RAILBLOCKS_CROSSING_TOOLTIP: 'Schalte den Bahnübergang um',
  RAILBLOCKS_CROSSING_OPEN: 'Öffne',
  RAILBLOCKS_CROSSING_CLOSE: 'Schließe',

  RAILBLOCKS_CONDITIONAL_TEXT: 'Wenn %1 Kontakt von %2 zuerst ausgelöst wurde\n %3 ansonsten wenn %4 Kontakt von %5 zuerst ausgelöst wurde',
  RAILBLOCKS_CONDITIONAL_TOOLTIP: 'Führe verschiedene Blöcke aus, je nachdem welches Gleis zuerst von einem Zug ausgelöst wurde.',
  RAILBLOCKS_CONDITIONAL_FIRST: 'erster',
  RAILBLOCKS_CONDITIONAL_SECOND: 'zweiter',
  RAILBLOCKS_CONDITIONAL_TEXT_START: 'Wenn',
  RAILBLOCKS_CONDITIONAL_TEXT_MIDDLE: 'Kontakt von',
  RAILBLOCKS_CONDITIONAL_TEXT_END: 'zuerst ausgelöst wurde',
  RAILBLOCKS_CONDITIONAL_TITLE_TEXT: 'Entweder Oder',

  RAILBLOCKS_PARALLEL_TEXT: 'Parallel',
  RAILBLOCKS_PARALLEL_TOOLTIP: 'Führe mehrere Blöcke gleichzeitig aus.',

  RAILBLOCKS_LIGHTS_TEXT_START: 'Schalte das Licht',
  RAILBLOCKS_LIGHTS_TEXT_END: '',
  RAILBLOCKS_LIGHTS_TOOLTIP: 'Schalte alle ausgewählten Lampen entweder an oder aus.\n' + 'Klicke auf das Plus / Minus Symbol, um die Anzahl der Lampen zu steuern.',
  RAILBLOCKS_LIGHTS_ON: 'an',
  RAILBLOCKS_LIGHTS_OFF: 'aus',

  RAILBLOCKS_TRACK_TEXT_START: 'Setze das Gleis',
  RAILBLOCKS_TRACK_TEXT_END: 'auf',
  RAILBLOCKS_TRACK_TOOLTIP: 'Setze alle ausgewählten Gleise auf eine bestimmte Geschwindigkeit und Richtung.\n' + 'Klicke auf das Plus / Minus Symbol, um die Anzahl der Gleisen zu steuern.',

  RAILBLOCKS_POINT_TEXT_START: 'Setze die Weiche',
  RAILBLOCKS_POINT_TEXT_END: 'auf',
  RAILBLOCKS_POINT_TOOLTIP: 'Setze alle ausgewählten Weichen auf entweder abbiegen oder geradeaus.\n' + 'Klicke auf das Plus / Minus Symbol, um die Anzahl der Weichen zu steuern.',
  RAILBLOCKS_POINT_STRAIGHT: 'geradeaus',
  RAILBLOCKS_POINT_BRANCH: 'abbiegen',

  RAILBLOCKS_WARNING_UNREACHABLE_STRONG: 'Blöcke nach diesem können nicht erreicht werden, da sich eine Wiederholung innerhalb dieses Blocks befindet.',
  RAILBLOCKS_WARNING_UNREACHABLE_WEAK: 'Blöcke nach diesem können vielleicht nicht erreicht werden, da sich eine Wiederholung innerhalb dieses Blocks befindet.',
  RAILBLOCKS_WARNING_EMPTY_INPUT: 'Dieser Block hat leere Felder und wird einen Syntaxfehler verursachen!',
  RAILBLOCKS_WARNING_UNUSED: 'Unbenutzter Block',
}
