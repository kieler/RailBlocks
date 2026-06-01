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

// This file contains the English translations for the block labels, tooltips and warnings.
export const RailBlocksEnTable = {
  RAILBLOCKS_PROGRAM_TEXT: 'Program',
  RAILBLOCKS_PROGRAM_TOOLTIP: 'The program that should be executed.\nAll further commands should be inside this block.',

  RAILBLOCKS_LOOP_TEXT: 'Loop',
  RAILBLOCKS_LOOP_TOOLTIP: 'Loops all code inside this block.',

  RAILBLOCKS_STOP_TEXT: 'stop',
  RAILBLOCKS_STOP_TOOLTIP: 'Set track(s) to no velocity.',

  RAILBLOCKS_DIR_TEXT: 'speed: %1 reverse: %2',
  RAILBLOCKS_DIR_TOOLTIP: 'Set track(s) to velocity with direction.',
  RAILBLOCKS_DIR_SLOW_TEXT: 'slow',
  RAILBLOCKS_DIR_FULL_TEXT: 'full',

  RAILBLOCKS_CONTACT_WAIT_TEXT: 'Wait until %2 contact of %3 is %1',
  RAILBLOCKS_CONTACT_WAIT_TOOLTIP: 'Do nothing until a train interacts with a track.',
  RAILBLOCKS_CONTACT_WAIT_REACHED: 'reached',
  RAILBLOCKS_CONTACT_WAIT_PASSED: 'passed',
  RAILBLOCKS_CONTACT_WAIT_FIRST: 'first',
  RAILBLOCKS_CONTACT_WAIT_SECOND: 'second',

  RAILBLOCKS_TIME_WAIT_TEXT: 'Wait for %1 second(s)',
  RAILBLOCKS_TIME_WAIT_TOOLTIP: 'Do nothing for a certain amount of time.',

  RAILBLOCKS_CROSSING_TEXT: '%1 crossing',
  RAILBLOCKS_CROSSING_TOOLTIP: 'Toggle the crossing',
  RAILBLOCKS_CROSSING_OPEN: 'Open',
  RAILBLOCKS_CROSSING_CLOSE: 'Close',

  RAILBLOCKS_CONDITIONAL_TEXT: 'If %1 contact of %2 is reached first\n%3else if %4 contact of %5 is reached first',
  RAILBLOCKS_CONDITIONAL_TOOLTIP: 'Execute different blocks depending on which track is reached first by a train.',
  RAILBLOCKS_CONDITIONAL_FIRST: 'first',
  RAILBLOCKS_CONDITIONAL_SECOND: 'second',

  RAILBLOCKS_PARALLEL_TEXT: 'Parallel',
  RAILBLOCKS_PARALLEL_TOOLTIP: 'Execute multiple blocks at the same time.',

  RAILBLOCKS_LIGHTS_TEXT_START: 'Set light',
  RAILBLOCKS_LIGHTS_TEXT_END: 'to',
  RAILBLOCKS_LIGHTS_TOOLTIP: 'Sets a number of lamps to either on or off.\n' + 'Right-click and select Add/Remove Input to control the number of lamps.',
  RAILBLOCKS_LIGHTS_ON: 'on',
  RAILBLOCKS_LIGHTS_OFF: 'off',

  RAILBLOCKS_CONDITIONAL_TEXT_START: 'If',
  RAILBLOCKS_CONDITIONAL_TEXT_MIDDLE: 'contact of',
  RAILBLOCKS_CONDITIONAL_TEXT_END: 'is reached first',
  RAILBLOCKS_CONDITIONAL_FIRST: 'first',
  RAILBLOCKS_CONDITIONAL_SECOND: 'second',
  RAILBLOCKS_CONDITIONAL_TITEL_TEXT: 'Branch',
  RAILBLOCKS_CONDITIONAL_TOOLTIP: 'Execute different blocks depending on which track is reached first by a train.',

  RAILBLOCKS_TRACK_TEXT_START: 'Set track',
  RAILBLOCKS_TRACK_TEXT_END: 'to',
  RAILBLOCKS_TRACK_TOOLTIP: 'Sets a number of tracks to some velocity and direction.\n' + 'Right-click and select Add/Remove Input to control the number of tracks.',

  RAILBLOCKS_POINT_TEXT_START: 'Set point',
  RAILBLOCKS_POINT_TEXT_END: 'to',
  RAILBLOCKS_POINT_TOOLTIP: 'Sets a number of points to either branch or be straight.\n' + 'Right-click and select Add/Remove Input to control the number of points.',
  RAILBLOCKS_POINT_STRAIGHT: 'straight',
  RAILBLOCKS_POINT_BRANCH: 'branch',

  RAILBLOCKS_WARNING_UNREACHABLE: 'Blocks after this may not be reached because of a loop inside this.',
  RAILBLOCKS_WARNING_EMPTY_INPUT: 'This block has empty inputs and will cause a syntax error!',
  RAILBLOCKS_WARNING_UNUSED: 'Unused block',
}

