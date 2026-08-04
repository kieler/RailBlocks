/*
 * RailBlocks - A Blockly RailSL Implementation
 *
 * https://github.com/kieler/RailBlocks
 *
 * Copyright 2025-2026 by
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

import * as Blockly from 'blockly'

// constraints for number of lights and number of switch points
const light_constraints = [0, 23]
const switch_constraints = [0, 29]

// Map of parent block type to constraint range
const parentConstraints = {
  PointStatement: switch_constraints,
  LightStatement: light_constraints
}
const defaultConstraints = [-Infinity, Infinity] // no constraint by default

function getConstraintsFor (block) {
  const parentType = block.parentBlock_?.type
  return parentConstraints[parentType] || defaultConstraints
}

// Reusable validator factory
function makeRangeValidator (block) {
  return function (newValue) {
    const [min, max] = getConstraintsFor(block)
    const value = Number(newValue)

    if (value < min || value > max) {
      return String(Math.min(Math.max(value, min), max)) // clamp into range
    }

    return newValue
  } 
}

function revalidateField (block, name) {
  const field = block.getField(name)
  if (field) {
    // Re-running setValue with the field's own current value forces the validator to execute again
    field.setValue(field.getValue())
  }
}


// validator for int_number
Blockly.Extensions.register('dynamic_int_number_validator', function () {
  const field = this.getField('NUM')
  if (field) {
    field.setValidator(makeRangeValidator(this))
  }
})


// validator for int_range
Blockly.Extensions.register('dynamic_int_range_validator', function () {
  const block = this
  ;['START', 'END'].forEach(name => {
    const field = block.getField(name)
    if (field) {
      field.setValidator(makeRangeValidator(block))
    }
  })

  // when block is moved into a new parent, re-evaluate
  block.workspace.addChangeListener(function (event) {
    if (event.type !== Blockly.Events.BLOCK_MOVE) return
    ;['START', 'END'].forEach(name => revalidateField(block, name))
  })
})
