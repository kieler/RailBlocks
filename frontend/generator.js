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


import * as Blockly from 'blockly/core'
import 'blockly/javascript'
import { segNameMap } from './consts'

// Enum internally used by Blockly.
const Order = {
  ATOMIC: 0
}

// Generator that will be written on later.
const generator = new Blockly.Generator('RailSL')

/**
 * Compiles the current workspace and sends the generated code to a div with id "generated code".
 * @param workspace -- The workspace to compile. Usually there is only one ;)
 */
export function compile (workspace) {
  // We only want to compile everything inside the program block, so we only need to compile its content.
  let code = generator.blockToCode(workspace.getBlockById('ROOT'))

  // Start comment block.
  code += '\n\n/*\n'

  // Add all unused root-blocks ordered by y-position.
  workspace.getAllBlocks(true).forEach(block => {
    if (block.id !== 'ROOT' && block.getRootBlock() === block) {
      const result = generator.blockToCode(block)
      if (typeof result === 'string') {
        code += result + '\n'
      } else {
        // If the block was an outputting block,
        // then the result is a tuple of string and ordering,
        // the latter always being Order.ATOMIC (0).
        code += result[0] + '\n'
      }
    }
  })

  // Close comment block.
  code += '*/'

  // Remove the comment block if it is empty.
  code = code.replace('\n\n/*\n*/', '')

  // Add the code to the div.
  document.getElementById('generated code').innerText = code
}

// Now comes the tedious part... the implementation!

// We need to open and close a Start-End block for the program and put all statements in the block inside of it.
generator.forBlock.Program = (block, gen) => {
  return 'Start:\n' +
        gen.statementToCode(block, 'MAIN_BLOCK') +
        '\nEnd.'
}
// This time we need a Start-Loop block, but the rest is the same.
generator.forBlock.LoopStatement = (block, gen) => {
  // (Updated to modern RailSL grammar)
  return 'Start:\n' +
        gen.statementToCode(block, 'LOOP_CONTENT') +
        '\nLoop.'
}

// This one and the next are value inputs' inputs, which is why they look different.
generator.forBlock.TrackStatementVectorStop = () => {
  return ['stop.', Order.ATOMIC]
}

generator.forBlock.TrackStatementVectorDir = (block) => {
  // Very hard to read.
  // "full" and "slow" are the two options, the field value is either "ITEM1" or "ITEM2".
  const SPEED = ['full', 'slow'][block.getFieldValue('SPEED')[4] - 1]
  // Blockly returns "FALSE" and "TRUE" for checkboxes.
  const DIRECTION = block.getFieldValue('DIRECTION') === 'FALSE' ? '.' : ' reverse.'

  return [SPEED + DIRECTION, Order.ATOMIC]
}

// Now come all parallel blocks, they function mostly the same with exception those that contain statement inputs.

generator.forBlock.TrackStatement = (block, gen) => {
  // Append more later.
  let COMMAND = 'Set track '

  // Get all track names and append to tracks.
  const tracks = []
  for (let i = 0; i < block.inputCount; i++) {
    tracks.push(segNameMap.get(block.getFieldValue('DROPDOWN' + i)))
  }

  // Append all track names and resolve the input,
  // which is either TrackStatementVectorStop or TrackStatementVectorDir.
  COMMAND += tracks.toString() + ' to ' + gen.valueToCode(block, 'SET_TRACK', Order.ATOMIC)

  // These two lines are basically the same for all statements.
  // We have to include the code of the next block manually, since blocks are stored as trees
  // and not automatically parsed.
  const NEXT_COMMAND = block.getNextBlock()
  return NEXT_COMMAND ? COMMAND + '\n' + gen.blockToCode(NEXT_COMMAND) : COMMAND
}

generator.forBlock.TrackStatementALT = (block, gen) => {
  let COMMAND = 'Set track '

  const tracks = []
  for (let i = 0; i < block.inputCount; i++) {
    tracks.push(block.getFieldValue('TEXT' + i))
  }

  COMMAND += tracks.toString() + ' to ' + gen.valueToCode(block, 'SET_TRACK', Order.ATOMIC)

  const NEXT_COMMAND = block.getNextBlock()
  return NEXT_COMMAND ? COMMAND + '\n' + gen.blockToCode(NEXT_COMMAND) : COMMAND
}

// return a list of numbers from start to end inclusive
generator.forBlock.int_range = (block) => {
  const start = parseInt(block.getFieldValue('START')) || 0
  const end = parseInt(block.getFieldValue('END')) || 0
  
  const numbers = []
  if (start > end) {
    for (let i = start; i >= end; i--) {
    numbers.push(i)
  }
  } else {
    for (let i = start; i <= end; i++) {
      numbers.push(i)
    }
  }
  
  return [numbers.join(', '), Order.ATOMIC]
}

// return an integer number
generator.forBlock.int_number = (block) => {
  return [block.getFieldValue('NUM') || '0', Order.ATOMIC]
}

generator.forBlock.PointStatement = (block, gen) => {
  let COMMAND = 'Set point '

  const tracks = []
  for (let i = 0; i < block.inputCount; i++) {
    tracks.push(gen.valueToCode(block, 'NUMBER_INPUT_' + i, Order.ATOMIC))
  }

  // Same thing as before.
  const BRANCH_OPTION = ['straight', 'branch'][block.getFieldValue('BRANCH_OPTION')[4] - 1]

  COMMAND += tracks.join(', ') + ' to ' + BRANCH_OPTION + '.'

  const NEXT_COMMAND = block.getNextBlock()
  return NEXT_COMMAND ? COMMAND + '\n' + gen.blockToCode(NEXT_COMMAND) : COMMAND
}

generator.forBlock.LightStatement = (block, gen) => {
  let COMMAND = 'Turn light '

  const tracks = []
  for (let i = 0; i < block.inputCount; i++) {
    tracks.push(gen.valueToCode(block, 'NUMBER_INPUT_' + i, Order.ATOMIC))
  }

  // Same thing as before.
  const LIGHT_STATUS = ['on', 'off'][block.getFieldValue('LIGHT_STATUS')[4] - 1]

  COMMAND += tracks.join(', ') + ' ' + LIGHT_STATUS + '.'

  const NEXT_COMMAND = block.getNextBlock()
  return NEXT_COMMAND ? COMMAND + '\n' + gen.blockToCode(NEXT_COMMAND) : COMMAND
}

// return either reached or Reach depending on the block because of railsl
generator.forBlock.reached = (block) => {
  if (block.parentBlock_ && block.parentBlock_.type === "ConditionalStatementD") {
    return ['reached', Order.ATOMIC]
  }
  return ['Reach', Order.ATOMIC]
}

// return either passed or Pass depending on the block because of railsl
generator.forBlock.passed = (block) => {
  if (block.parentBlock_ && block.parentBlock_.type === "ConditionalStatementD") {
    return ['passed', Order.ATOMIC]
  }
  return ['Pass', Order.ATOMIC]
}

generator.forBlock.ContactWaitStatement = (block, gen) => {
  const NUMBER = ['first', 'second'][block.getFieldValue('NUMBER')[4] - 1]
  const TRACK_SENSOR_VALUE = gen.valueToCode(block, 'track_sensor_value', Order.ATOMIC)
  const SEGMENT = segNameMap.get(block.getFieldValue('SEGMENT'))
  const COMMAND = TRACK_SENSOR_VALUE + ' ' + NUMBER + ' contact of ' + SEGMENT + '.'

  const NEXT_COMMAND = block.getNextBlock()
  return NEXT_COMMAND ? COMMAND + '\n' + gen.blockToCode(NEXT_COMMAND) : COMMAND
}

generator.forBlock.TimeWaitStatement = (block, gen) => {
  const DURATION = block.getFieldValue('DURATION')
  const COMMAND = 'Wait for ' + DURATION + ' seconds.'

  const NEXT_COMMAND = block.getNextBlock()
  return NEXT_COMMAND ? COMMAND + '\n' + gen.blockToCode(NEXT_COMMAND) : COMMAND
}

generator.forBlock.CrossingStatement = (block, gen) => {
  const COMMAND = ['Open', 'Close'][block.getFieldValue('CROSSING_STATUS')[4] - 1] + ' crossing.'

  const NEXT_COMMAND = block.getNextBlock()
  return NEXT_COMMAND ? COMMAND + '\n' + gen.blockToCode(NEXT_COMMAND) : COMMAND
}

// This one is the old parallel statement which was static. For the sample solutions to work it still exists here.
generator.forBlock.ParallelStatement = (block, gen) => {
  const PARA_BLOCK0 = gen.statementToCode(block, 'PARA_BLOCK0')
  const PARA_BLOCK1 = gen.statementToCode(block, 'PARA_BLOCK1')

  const COMMAND =
        'Parallel:\n' +
        'Start:\n' +
        PARA_BLOCK0 +
        '\nEnd.\n' +
        'Start:\n' +
        PARA_BLOCK1 +
        '\nEnd.\n' +
        'Join.'

  const NEXT_COMMAND = block.getNextBlock()
  return NEXT_COMMAND ? COMMAND + '\n' + gen.blockToCode(NEXT_COMMAND) : COMMAND
}

// The dynamic version of the parallel statement works a bit differently:
generator.forBlock.ParallelStatementD = (block, gen) => {
  // Open parallel block.
  let COMMAND = 'Parallel:\n'

  // Append all input statements inside Start-End blocks.
  for (let i = 0; i < block.inputList.length - 1; i++) {
    COMMAND +=
            'Start:\n' +
            gen.statementToCode(block, 'PARA_BLOCK' + i) +
            '\nEnd.\n'
  }

  // Close the parallel block.
  COMMAND += 'Join.'

  const NEXT_COMMAND = block.getNextBlock()
  return NEXT_COMMAND ? COMMAND + '\n' + gen.blockToCode(NEXT_COMMAND) : COMMAND
}

// Dynamic conditional statement, goes through all inputs similarly like the dynamic parallel statement.
generator.forBlock.ConditionalStatementD = (block, gen) => {
  // Open branch block.
  let COMMAND = 'Branch:\n'

  // Append all input statements inside Start-End blocks.
  for (let i = 0; i < block.inputCount + 1; i++) {
    const COND_BLOCK = gen.statementToCode(block, 'COND_BLOCK' + i)
    const CONTACT = ['first', 'second'][block.getFieldValue('CONTACT' + i)[4] - 1]
    const SEGMENT = segNameMap.get(block.getFieldValue('SEGMENT' + i))
    const TRACK_SENSOR_VALUE = gen.valueToCode(block, 'COND_BOOL' + i, Order.ATOMIC)

    COMMAND +=
        'If ' +
        CONTACT +
        ' contact of ' +
        SEGMENT +
        ' is ' +
        TRACK_SENSOR_VALUE +
        ' first, do\n' +
        'Start:\n' +
        COND_BLOCK +
        '\nEnd.\n'
  }

  const NEXT_COMMAND = block.getNextBlock()
  return NEXT_COMMAND ? COMMAND + '\n' + gen.blockToCode(NEXT_COMMAND) : COMMAND
}

// Static conditional statement. Pretty straightforward.
// Resolves both input statements and wraps them inside Start-End blocks with the appropriate parameters.
generator.forBlock.ConditionalStatement = (block, gen) => {
  const CONTACT0 = ['first', 'second'][block.getFieldValue('CONTACT0')[4] - 1]
  const CONTACT1 = ['first', 'second'][block.getFieldValue('CONTACT1')[4] - 1]
  const SEGMENT0 = segNameMap.get(block.getFieldValue('SEGMENT0'))
  const SEGMENT1 = segNameMap.get(block.getFieldValue('SEGMENT1'))
  const TRACK_SENSOR_VALUE = gen.valueToCode(block, 'track_sensor_value', Order.ATOMIC)

  const COND_BLOCK0 = gen.statementToCode(block, 'COND_BLOCK0')
  const COND_BLOCK1 = gen.statementToCode(block, 'COND_BLOCK1')

  // Very fiddly, should look better after a dynamic version is implemented.
  const COMMAND =
        'Branch:\n' +
        'If ' +
        CONTACT0 +
        ' contact of ' +
        SEGMENT0 +
        ' is ' +
        TRACK_SENSOR_VALUE +
        ' first, do\n' +
        'Start:\n' +
        COND_BLOCK0 +
        '\nEnd.\n' +
        'If ' +
        CONTACT1 +
        ' contact of ' +
        SEGMENT1 +
        ' is reached first, do\n' +
        'Start:\n' +
        COND_BLOCK1 +
        '\nEnd.'

  const NEXT_COMMAND = block.getNextBlock()
  return NEXT_COMMAND ? COMMAND + '\n' + gen.blockToCode(NEXT_COMMAND) : COMMAND
}
