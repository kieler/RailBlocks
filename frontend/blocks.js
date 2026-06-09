/*
 * RailBlocks - A Blockly RailSL Implementation
 *
 * https://github.com/kieler/RailBlocks
 *
 * Copyright 2025 by
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

import { segName } from './consts.js'

// STATIC BLOCKS USED IN THE IMPLEMENTATION

const blockDefinitionsJson = [
  // Program block, aka. the Block that is executed.
  // Even though this does not directly exist in the RailSL, it is practical to only execute something that is inside.
  // Additionally, we benefit from this by showing, that rounded corners always mean correct syntax.
  {
    type: 'Program',
    message0: '%{BKY_RAILBLOCKS_PROGRAM_TEXT}\n%1',
    args0: [
      {
        type: 'input_statement',
        name: 'MAIN_BLOCK',
        check: 'CStatement'
      }],

    colour: 135,
    tooltip: '%{BKY_RAILBLOCKS_PROGRAM_TOOLTIP}'
  },
  // New LoopStatement that loops every statement inside the block.
  {
    type: 'LoopStatement',
    message0: '%{BKY_RAILBLOCKS_LOOP_TEXT}\n%1',
    args0: [
      {
        type: 'input_statement',
        name: 'LOOP_CONTENT',
        check: 'CStatement'
      }
    ],
    previousStatement: 'CStatement',
    // nextStatement: 'CStatement',
    colour: 260,
    tooltip: '%{BKY_RAILBLOCKS_LOOP_TOOLTIP}'
  },
  // Track-Statement Vector Null-vector case.
  // EBNF: stop
  {
    type: 'TrackStatementVectorStop',
    message0: '%1',
    args0: [
      {
        type: 'field_label',
        text: '%{BKY_RAILBLOCKS_STOP_TEXT}',
      }
    ],
    output: 'CSetVector',
    colour: 25,
    tooltip: '%{BKY_RAILBLOCKS_STOP_TOOLTIP}'
  },
  // Track-Statement Vector Direction case.
  // EBNF: (slow | full) {reverse}
  {
    type: 'TrackStatementVectorDir',
    message0: '%{BKY_RAILBLOCKS_DIR_TEXT}',
    args0: [
      {
        type: 'field_dropdown',
        options: [
          ['%{BKY_RAILBLOCKS_DIR_FULL_TEXT}', 'ITEM1'],
          ['%{BKY_RAILBLOCKS_DIR_SLOW_TEXT}', 'ITEM2']
        ],
        name: 'SPEED'
      },
      {
        type: 'field_checkbox',
        checked: false,
        name: 'DIRECTION'
      }
    ],
    output: 'CSetVector',
    tooltip: '%{BKY_RAILBLOCKS_DIR_TOOLTIP}',
    colour: 25
  },
  // Contact-Wait-Statement
  // Wait until a segment switch is reached or passed.
  {
    type: 'ContactWaitStatement',
    message0: '%{BKY_RAILBLOCKS_CONTACT_WAIT_TEXT}',
    args0: [
      {
        type: 'field_dropdown',
        options: [
          ['%{BKY_RAILBLOCKS_CONTACT_WAIT_REACHED}', 'ITEM1'],
          ['%{BKY_RAILBLOCKS_CONTACT_WAIT_PASSED}', 'ITEM2']
        ],
        name: 'CONTACT'
      },
      {
        type: 'field_dropdown',
        options: [
          ['%{BKY_RAILBLOCKS_CONTACT_WAIT_FIRST}', 'ITEM1'],
          ['%{BKY_RAILBLOCKS_CONTACT_WAIT_SECOND}', 'ITEM2']
        ],
        name: 'NUMBER'
      },
      {
        type: 'field_dropdown',
        options: segName,
        name: 'SEGMENT'
      }
    ],
    colour: 240,
    tooltip: '%{BKY_RAILBLOCKS_CONTACT_WAIT_TOOLTIP}',
    previousStatement: 'CStatement',
    nextStatement: 'CStatement'
  },
  // Time-Wait-Statement
  // Wait for an amount of seconds.
  {
    type: 'TimeWaitStatement',
    message0: '%{BKY_RAILBLOCKS_TIME_WAIT_TEXT}',
    args0: [
      {
        type: 'field_number',
        min: 0,
        name: 'DURATION'
      }
    ],
    colour: 240,
    tooltip: '%{BKY_RAILBLOCKS_TIME_WAIT_TOOLTIP}',
    previousStatement: 'CStatement',
    nextStatement: 'CStatement'
  },
  // Crossing Statement
  // Open or close the crossing.
  {
    type: 'CrossingStatement',
    message0: '%{BKY_RAILBLOCKS_CROSSING_TEXT}',
    args0: [
      {
        type: 'field_dropdown',
        options: [
          ['%{BKY_RAILBLOCKS_CROSSING_OPEN}', 'ITEM1'],
          ['%{BKY_RAILBLOCKS_CROSSING_CLOSE}', 'ITEM2']
        ],
        name: 'CROSSING_STATUS'
      }
    ],
    colour: 280,
    tooltip: '%{BKY_RAILBLOCKS_CROSSING_TOOLTIP}',
    previousStatement: 'CStatement',
    nextStatement: 'CStatement'
  },
  // ConditionalStatement
  // Executes a specific code branch when some segment is reached first.
  // Quite literally a race condition... ;)
  {
    type: 'ConditionalStatement',
    message0: '%{BKY_RAILBLOCKS_CONDITIONAL_TEXT}\n%6',
    args0: [
      {
        type: 'field_dropdown',
        options: [
          ['%{BKY_RAILBLOCKS_CONDITIONAL_FIRST}', 'ITEM1'],
          ['%{BKY_RAILBLOCKS_CONDITIONAL_SECOND}', 'ITEM2']
        ],
        name: 'CONTACT0'
      },
      {
        type: 'field_dropdown',
        options: segName,
        name: 'SEGMENT0'
      },
      {
        type: 'input_statement',
        check: 'CStatement',
        name: 'COND_BLOCK0'
      },
      {
        type: 'field_dropdown',
        options: [
          ['%{BKY_RAILBLOCKS_CONDITIONAL_FIRST}', 'ITEM1'],
          ['%{BKY_RAILBLOCKS_CONDITIONAL_SECOND}', 'ITEM2']
        ],
        name: 'CONTACT1'
      },
      {
        type: 'field_dropdown',
        options: segName,
        name: 'SEGMENT1'
      },
      {
        type: 'input_statement',
        check: 'CStatement',
        name: 'COND_BLOCK1'
      }
    ],
    colour: 300,
    tooltip: '%{BKY_RAILBLOCKS_CONDITIONAL_TOOLTIP}',
    previousStatement: 'CStatement',
    nextStatement: 'CStatement'
  },
  // Old static parallel statement that executes two or more blocks in parallel.
  // Still inside implementation because of the sample solutions, but the user can't create this block.
  {
    type: 'ParallelStatement',
    message0: '%{BKY_RAILBLOCKS_PARALLEL_TEXT}\n%1%2',
    args0: [
      {
        type: 'input_statement',
        name: 'PARA_BLOCK0',
        check: 'CStatement'
      },
      {
        type: 'input_statement',
        name: 'PARA_BLOCK1',
        check: 'CStatement'
      }
    ],
    colour: 190,
    tooltip: '%{BKY_RAILBLOCKS_PARALLEL_TOOLTIP}',
    previousStatement: 'CStatement',
    nextStatement: 'CStatement'
  }
]

// Create the toolbox with all blocks and literals we need for the correct language
function createToolbox (labels) {
  return {
    kind: 'flyoutToolbox',
    // Between the different groups we add labels.
    contents: [
      {
        kind: 'label',
        text: labels.setStatements
      },
      {
        kind: 'block',
        type: 'TrackStatement'
      },
      {
        kind: 'block',
        type: 'TrackStatementVectorStop'
      },
      {
        kind: 'block',
        type: 'TrackStatementVectorDir'
      },
      {
        kind: 'block',
        type: 'PointStatement'
      },
      {
        kind: 'block',
        type: 'CrossingStatement'
      },
      {
        kind: 'block',
        type: 'LightStatement'
      },
      {
        kind: 'sep',
        gap: 60
      },
      {
        kind: 'label',
        text: labels.waitStatements
      },
      {
        kind: 'block',
        type: 'TimeWaitStatement'
      },
      {
        kind: 'block',
        type: 'ContactWaitStatement'
      },
      {
        kind: 'sep',
        gap: 60
      },
      {
        kind: 'label',
        text: labels.controlFlow
      },
      {
        kind: 'block',
        type: 'ConditionalStatementD'
      },
      {
        kind: 'block',
        type: 'ParallelStatementD'
      },
      {
        kind: 'block',
        type: 'LoopStatement'
      }
    ]
  }
}

export { blockDefinitionsJson, createToolbox }
