import { segName } from './consts.js'

// STATIC BLOCKS USED IN THE IMPLEMENTATION

const blockDefinitionsJson = [
  // Program block, aka. the Block that is executed.
  // Even though this does not directly exist in the RailSL, it is practical to only execute something that is inside.
  // Additionally, we benefit from this by showing, that rounded corners always mean correct syntax.
  {
    type: 'Program',
    message0: 'Program\n%1',
    args0: [
      {
        type: 'input_statement',
        name: 'MAIN_BLOCK',
        check: 'CStatement'
      }],

    colour: 135,
    tooltip: 'The program that should be executed.\nAll further commands should be inside this block.'
  },
  // New LoopStatement that loops every statement inside the block.
  {
    type: 'LoopStatement',
    message0: 'Loop\n%1',
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
    tooltip: 'Loops all code inside this block.'
  },
  // Track-Statement Vector Null-vector case.
  // EBNF: stop
  {
    type: 'TrackStatementVectorStop',
    message0: '%1',
    args0: [
      {
        type: 'field_label',
        text: 'stop'
      }
    ],
    output: 'CSetVector',
    colour: 25,
    tooltip: 'Set track(s) to no velocity.'
  },
  // Track-Statement Vector Direction case.
  // EBNF: (slow | full) {reverse}
  {
    type: 'TrackStatementVectorDir',
    message0: 'speed: %1reverse: %2',
    args0: [
      {
        type: 'field_dropdown',
        options: [
          ['full', 'ITEM1'],
          ['slow', 'ITEM2']
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
    tooltip: 'Set track(s) to velocity with direction.',
    colour: 25
  },
  // Contact-Wait-Statement
  // Wait until a segment switch is reached or passed.
  {
    type: 'ContactWaitStatement',
    message0: 'Wait until %2 contact of %3 is %1',
    args0: [
      {
        type: 'field_dropdown',
        options: [
          ['reached', 'ITEM1'],
          ['passed', 'ITEM2']
        ],
        name: 'CONTACT'
      },
      {
        type: 'field_dropdown',
        options: [
          ['first', 'ITEM1'],
          ['second', 'ITEM2']
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
    tooltip: 'Do nothing until a train interacts with a track.',
    previousStatement: 'CStatement',
    nextStatement: 'CStatement'
  },
  // Time-Wait-Statement
  // Wait for an amount of seconds.
  {
    type: 'TimeWaitStatement',
    message0: 'Wait for %1 seconds',
    args0: [
      {
        type: 'field_number',
        min: 0,
        name: 'DURATION'
      }
    ],
    colour: 240,
    tooltip: 'Do nothing for a specific amount of seconds.',
    previousStatement: 'CStatement',
    nextStatement: 'CStatement'
  },
  // Crossing Statement
  // Open or close the crossing.
  {
    type: 'CrossingStatement',
    message0: '%1 crossing',
    args0: [
      {
        type: 'field_dropdown',
        options: [
          ['Open', 'ITEM1'],
          ['Close', 'ITEM2']
        ],
        name: 'CROSSING_STATUS'
      }
    ],
    colour: 280,
    tooltip: 'Toggle the crossing',
    previousStatement: 'CStatement',
    nextStatement: 'CStatement'
  },
  // ConditionalStatement
  // Executes a specific code branch when some segment is reached first.
  // Quite literally a race condition... ;)
  {
    type: 'ConditionalStatement',
    message0: 'If %1 contact of %2 is reached first\n%3else if %4 contact of %5 is reached first\n%6',
    args0: [
      {
        type: 'field_dropdown',
        options: [
          ['first', 'ITEM1'],
          ['second', 'ITEM2']
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
          ['first', 'ITEM1'],
          ['second', 'ITEM2']
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
    tooltip: 'Execute different blocks depending on which track is reached first by a train.',
    previousStatement: 'CStatement',
    nextStatement: 'CStatement'
  },
  // Old static parallel statement that executes two or more blocks in parallel.
  // Still inside implementation because of the sample solutions, but the user can't create this block.
  {
    type: 'ParallelStatement',
    message0: 'Parallel\n%1%2',
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
    tooltip: 'Execute multiple blocks at the same time.',
    previousStatement: 'CStatement',
    nextStatement: 'CStatement'
  }
]

// Create the toolbox with all blocks and literals we need
const toolbox = {
  kind: 'flyoutToolbox',
  // Between the different groups we add labels.
  contents: [
    {
      kind: 'label',
      text: 'Set Statements'
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
      text: 'Wait Statements'
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
      text: 'Control Flow'
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

export { blockDefinitionsJson, toolbox }
