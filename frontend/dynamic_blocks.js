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

import * as Blockly from 'blockly/core'
import { segName, mutationToDom, domToMutation, validatorSegment } from './consts.js'
import { FieldPlusMinus } from './fields.js'

// DYNAMIC (MUTABLE) BLOCKS
// Makes sense to give them another file since they need to be formulated in js and not json.

// Dynamic version of the parallel statement.
Blockly.Blocks.ParallelStatementD = {
  init: function () {
    // Append a named input which contains the +/- buttons and the text.
    this.appendDummyInput('PARALLEL_ROOT')
      .appendField(new FieldPlusMinus(), 'PM_FIELD')
      .appendField(Blockly.Msg.RAILBLOCKS_PARALLEL_TEXT)

    // Only allow this block to follow statements and only allow statements to be appended to this.
    this.setPreviousStatement('CStatement')
    this.setNextStatement('CStatement')

    this.setColour(280)
    this.setTooltip(Blockly.Msg.RAILBLOCKS_PARALLEL_TOOLTIP)

    // We need at least two inputs, so we cheat in one that will always be there.
    this.appendStatementInput('PARA_BLOCK0')

    // Not to be confused that the real input count is 2,
    // but we want one to always be there and the rest be build dynamically in updateShape.
    this.inputCount = 1
    // "Actual" input count
    this.currInputs = 0

    // Initially build this block which adds another input.
    this.updateShape()
  },

  // Pass the previously defined DOM methods.
  mutationToDom,

  domToMutation,

  /**
     * Builds the rest of this block based on the difference between real and wanted input count.
     */
  updateShape: function () {
    // Calculate how many blocks have to be appended or removed.
    let diff = this.currInputs - this.inputCount

    // Only escape when the wanted input count is achieved.
    while (diff !== 0) {
      // Case when inputs have to be removed.
      if (diff > 0) {
        this.removeInput('PARA_BLOCK' + this.currInputs)
        this.currInputs--
        // Case when inputs have to be appended.
      } else if (diff < 0) {
        this.appendStatementInput('PARA_BLOCK' + (this.currInputs + 1))
        this.currInputs++
      }
      // Refresh difference.
      diff = this.currInputs - this.inputCount
    }
  }

}

// For the following blocks some parts are not commented, because they exist very similarly to the previous definitions.

// Small helper function that adds another block in a dynamic branch statement.
// Remember to clean up inputs, when deleting.
function buildAnotherCondRow(index, block){
  const input = block.appendValueInput(`COND_BOOL${index}`)
    .setCheck('Boolean')

  if (index !== 0) {
    input.appendField(new Blockly.FieldLabel('           ')) // empty placeholder
  }

  input
  .appendField(Blockly.Msg.RAILBLOCKS_CONDITIONAL_TEXT_START)
  .appendField(
    new Blockly.FieldDropdown([
      [Blockly.Msg.RAILBLOCKS_CONDITIONAL_FIRST, 'ITEM1'],
      [Blockly.Msg.RAILBLOCKS_CONDITIONAL_SECOND, 'ITEM2']
    ]),
    `CONTACT${index}`
  )
  .appendField(Blockly.Msg.RAILBLOCKS_CONDITIONAL_TEXT_MIDDLE)
  .appendField(new Blockly.FieldDropdown(segName), `SEGMENT${index}`)
  .appendField(Blockly.Msg.RAILBLOCKS_CONDITIONAL_TEXT_END_1)

block.appendDummyInput(`COND_DUMMY${index}`)
  .appendField(Blockly.Msg.RAILBLOCKS_CONDITIONAL_TEXT_END_2)

block.appendStatementInput(`COND_BLOCK${index}`)
}

// Dynamic branch statement
Blockly.Blocks.ConditionalStatementD = {
  init: function () {
    // Append a named input which contains the +/- buttons and the text.
    this.appendDummyInput('BRANCH_ROOT')
        .appendField(new FieldPlusMinus(), 'PM_FIELD')

    // Only allow this block to follow statements and only allow statements to be appended to this.
    this.setPreviousStatement('CStatement')
    this.setNextStatement('CStatement')

    this.setColour(300)
    this.setTooltip(Blockly.Msg.RAILBLOCKS_CONDITIONAL_TOOLTIP)

    // We need at least two inputs, so we cheat in one that will always be there.
    buildAnotherCondRow(0, this)

    // Not to be confused that the real input count is 2,
    // but we want one to always be there and the rest be build dynamically in updateShape.
    this.inputCount = 1
    // "Actual" input count
    this.currInputs = 0

    // Initially build this block which adds another input.
    this.updateShape()
  },

  // Pass the previously defined DOM methods.
  mutationToDom,

  domToMutation,

  /**
   * Builds the rest of this block based on the difference between real and wanted input count.
   */
  updateShape: function () {
    // Calculate how many blocks have to be appended or removed.
    let diff = this.currInputs - this.inputCount

    // Only escape when the wanted input count is achieved.
    while (diff !== 0) {
      // Case when inputs have to be removed.
      if (diff > 0) {
        this.removeInput(`COND_BOOL${this.currInputs}`)
        this.removeInput(`COND_DUMMY${this.currInputs}`)
        this.removeInput(`COND_BLOCK${this.currInputs}`)
        this.currInputs--
        // Case when inputs have to be appended.
      } else if (diff < 0) {
        buildAnotherCondRow(this.currInputs + 1, this)
        this.currInputs++
      }
      // Refresh difference.
      diff = this.currInputs - this.inputCount
    }
  }
}


// Dynamic "set track" statement.
Blockly.Blocks.TrackStatement = {
  init: function () {
    // Append an input that ends with a connector to the stop/direction+speed blocks.
    // This input also contains the +/- field and the needed texts.
    // Will be mutated later in updateShape.
    this.appendValueInput('SET_TRACK')
      .appendField(new FieldPlusMinus(), 'PM_FIELD')
      .setCheck('CSetVector')
      .appendField(Blockly.Msg.RAILBLOCKS_TRACK_TEXT_START, 'SET_TRACK_FIELD')

    this.setPreviousStatement('CStatement')
    this.setNextStatement('CStatement')

    this.setColour(0)
    this.setTooltip(Blockly.Msg.RAILBLOCKS_TRACK_TOOLTIP)

    this.inputCount = 1
    this.updateShape()
  },

  mutationToDom,

  domToMutation,

  updateShape: function () {
    // Store current values for old fields and append default values for new fields to restore them later.
    const values = []
    for (let i = 0; i < this.inputCount; i++) {
      values.push(
        this.getField('DROPDOWN' + i)
        // If the field is empty, which is true at the first pass,
        // add the default value
          ? this.getField('DROPDOWN' + i).getValue()
          : 'ITEM1'
      )
    }

    // Get the input that was defined in init, we'll remove from it and then append to it.
    const valueInput = this.getInput('SET_TRACK')
    const toRemove = []

    // Store all existing field names from the value input...
    for (let i = 0; i < valueInput.fieldRow.length; i++) {
      const name = valueInput.fieldRow[i].name
      if (!name || name[0] === 'D') { toRemove.push(name) }
    }
    // ... and remove all of them.
    for (let i = 0; i < toRemove.length; i++) {
      valueInput.removeField(toRemove[i])
    }

    // Add all dropdown fields such that the first one does not have a comma.
    // Give them all names that we will use to restore the prior values.
    for (let i = 0; i < this.inputCount; i++) {
      if (i === 0) {
        valueInput.appendField(new Blockly.FieldDropdown(
          segName
        ), 'DROPDOWN' + i)
      } else {
        valueInput.appendField(',')
          .appendField(new Blockly.FieldDropdown(
            segName
          ), 'DROPDOWN' + i)
      }
      // After creating all dropdown fields, restore the saved values.
      this.setFieldValue(values[i], 'DROPDOWN' + i)
    }

    // Append the last text.
    valueInput.appendField(Blockly.Msg.RAILBLOCKS_TRACK_TEXT_END)

    // Now the block looks like this:
    // ValueInput["Set track" [Comma separated dropdown fields] "to: "] -<
  }
}

// Almost the same but with text input fields and not dropdown fields.
Blockly.Blocks.TrackStatementALT = {
  init: function () {
    this.appendValueInput('SET_TRACK')
      .appendField(new FieldPlusMinus(), 'PM_FIELD')
      .setCheck('CSetVector')
      .appendField(Blockly.Msg.RAILBLOCKS_TRACK_TEXT_START, 'SET_TRACK_FIELD')
    this.setPreviousStatement('CStatement')
    this.setNextStatement('CStatement')
    this.setInputsInline(false)
    this.setColour(0)
    this.setTooltip(Blockly.Msg.RAILBLOCKS_TRACK_TOOLTIP)

    this.inputCount = 1
    this.updateShape()
  },

  mutationToDom,

  domToMutation,

  updateShape: function () {
    const values = []
    for (let i = 0; i < this.inputCount; i++) {
      values.push(
        this.getField('TEXT' + i)
          ? this.getField('TEXT' + i).getValue()
          : ''
      )
    }

    const valueInput = this.getInput('SET_TRACK')
    const toRemove = []

    for (let i = 0; i < valueInput.fieldRow.length; i++) {
      const name = valueInput.fieldRow[i].name
      if (!name || name[0] === 'T') { toRemove.push(name) }
    }
    for (let i = 0; i < toRemove.length; i++) {
      valueInput.removeField(toRemove[i])
    }

    for (let i = 0; i < this.inputCount; i++) {
      if (i === 0) {
        valueInput.appendField(new Blockly.FieldTextInput(
          'KH_ST_0', validatorSegment
        ), 'TEXT' + i)
      } else {
        valueInput.appendField(',')
          .appendField(new Blockly.FieldTextInput(
            'KH_ST_0', validatorSegment
          ), 'TEXT' + i)
      }
      this.setFieldValue(values[i], 'TEXT' + i)
    }

    valueInput.appendField(Blockly.Msg.RAILBLOCKS_TRACK_TEXT_END)
  }
}

Blockly.Blocks.PointStatement = {
  init: function () {
    this.appendDummyInput('SET_POINT')
      .appendField(new FieldPlusMinus(), 'PM_FIELD')
      .appendField(Blockly.Msg.RAILBLOCKS_POINT_TEXT_START, 'SET_POINT_FIELD')
    this.setPreviousStatement('CStatement')
    this.setNextStatement('CStatement')
    this.setColour(20)
    this.setTooltip(Blockly.Msg.RAILBLOCKS_POINT_TOOLTIP)

    this.inputCount = 1
    this.updateShape()
  },

  mutationToDom,

  domToMutation,

  updateShape: function () {
    const branchOption = this.getFieldValue('BRANCH_OPTION')

    let currentCount = 0
      while (this.getInput('NUMBER_INPUT_' + currentCount)) {
        currentCount++
      }

      // Remove the trailing dummy so new number inputs can stay before it.
      if (this.getInput('POINT_END')) {
        this.removeInput('POINT_END')
      }

      while (currentCount > this.inputCount) {
        this.removeInput('NUMBER_INPUT_' + (currentCount - 1))
        currentCount--
      }

      while (currentCount < this.inputCount) {
        const input = this.appendValueInput('NUMBER_INPUT_' + currentCount)
          .setCheck(['Number', 'int_range'])

        if (currentCount !== 0) {
          input.appendField(',')
        }

      // Only inject shadows when the input is newly created.
      ensureShadow(this, 'NUMBER_INPUT_' + currentCount)
      currentCount++
    }
    
    // Append the last portion of this block.
    this.appendDummyInput('POINT_END')
      .appendField(Blockly.Msg.RAILBLOCKS_POINT_TEXT_END)
      .appendField(new Blockly.FieldDropdown(
        [
          [Blockly.Msg.RAILBLOCKS_POINT_STRAIGHT, 'ITEM1'],
          [Blockly.Msg.RAILBLOCKS_POINT_BRANCH, 'ITEM2']
        ]
      ), 'BRANCH_OPTION')

    if (branchOption) {
      this.setFieldValue(branchOption, 'BRANCH_OPTION')
    }
  }
}

Blockly.Blocks.LightStatement = {
  init: function () {
    this.appendDummyInput('SET_LIGHT')
      .appendField(new FieldPlusMinus(), 'PM_FIELD')
      .appendField(Blockly.Msg.RAILBLOCKS_LIGHTS_TEXT_START, 'SET_LIGHT_FIELD')
    this.setPreviousStatement('CStatement')
    this.setNextStatement('CStatement')
    this.setColour(40)
    this.setTooltip(Blockly.Msg.RAILBLOCKS_LIGHTS_TOOLTIP)

    this.inputCount = 1
    this.updateShape()
  },

  mutationToDom,

  domToMutation,

    updateShape: function () {
      const lightStatus = this.getFieldValue('LIGHT_STATUS')

      let currentCount = 0
      while (this.getInput('NUMBER_INPUT_' + currentCount)) {
        currentCount++
      }

      // Remove the trailing dummy so new number inputs can stay before it.
      if (this.getInput('LIGHT_END')) {
        this.removeInput('LIGHT_END')
      }

      while (currentCount > this.inputCount) {
        this.removeInput('NUMBER_INPUT_' + (currentCount - 1))
        currentCount--
      }

      while (currentCount < this.inputCount) {
        const input = this.appendValueInput('NUMBER_INPUT_' + currentCount)
          .setCheck(['Number', 'int_range'])

        if (currentCount !== 0) {
          input.appendField(',')
        }

      // Only inject shadows when the input is newly created.
      ensureShadow(this, 'NUMBER_INPUT_' + currentCount)
      currentCount++
    }

    this.appendDummyInput('LIGHT_END')
      .appendField(Blockly.Msg.RAILBLOCKS_LIGHTS_TEXT_END)
      .appendField(new Blockly.FieldDropdown(
        [
          [Blockly.Msg.RAILBLOCKS_LIGHTS_ON, 'ITEM1'],
          [Blockly.Msg.RAILBLOCKS_LIGHTS_OFF, 'ITEM2']
        ]
      ), 'LIGHT_STATUS')

    if (lightStatus) {
        this.setFieldValue(lightStatus, 'LIGHT_STATUS')
     }
    }
}

// Injects a int_number shadow into an input if nothing is connected yet
export function ensureShadow(block, inputName) {
  const input = block.getInput(inputName)
  if (!input || input.connection.targetBlock()) return

  const shadowBlock = block.workspace.newBlock('int_number')
  shadowBlock.initSvg?.()
  shadowBlock.setShadow(true)
  shadowBlock.getField('NUM').setValue(0)
  shadowBlock.render?.()
  input.connection.connect(shadowBlock.outputConnection)
}
