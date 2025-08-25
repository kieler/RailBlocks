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
      .appendField('Parallel')

    // Only allow this block to follow statements and only allow statements to be appended to this.
    this.setPreviousStatement('CStatement')
    this.setNextStatement('CStatement')

    this.setColour(190)
    this.setTooltip('Execute multiple blocks at the same time.')

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
  block.appendDummyInput(`COND_BLOCK${index}_TEXT`)
      .appendField('If')
      .appendField(new Blockly.FieldDropdown([['first', 'ITEM1'], ['second', 'ITEM2']]), `CONTACT${index}`)
      .appendField('contact of')
      .appendField(new Blockly.FieldDropdown(segName), `SEGMENT${index}`)
      .appendField('is reached first')
  block.appendStatementInput(`COND_BLOCK${index}`)
}

// Dynamic branch statement
Blockly.Blocks.ConditionalStatementD = {
  init: function () {
    // Append a named input which contains the +/- buttons and the text.
    this.appendDummyInput('BRANCH_ROOT')
        .appendField(new FieldPlusMinus(), 'PM_FIELD')
        .appendField('Branch')

    // Only allow this block to follow statements and only allow statements to be appended to this.
    this.setPreviousStatement('CStatement')
    this.setNextStatement('CStatement')

    this.setColour(300)
    this.setTooltip('Execute different blocks depending on which track is reached first by a train.')

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
        this.removeInput(`COND_BLOCK${this.currInputs}`)
        this.removeInput(`COND_BLOCK${this.currInputs}_TEXT`)
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
      .appendField('Set track', 'SET_TRACK_FIELD')

    this.setPreviousStatement('CStatement')
    this.setNextStatement('CStatement')

    this.setColour(25)
    this.setTooltip('Sets a number of tracks to some velocity and direction.\n' +
            'Right-click and select Add/Remove Input to control the number of tracks.')

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
    valueInput.appendField('to')

    // Now the block looks like this:
    // ValueInput["Set track" [Comma seperated dropdown fields] "to: "] -<
  }
}

// Almost the same but with text input fields and not dropdown fields.
Blockly.Blocks.TrackStatementALT = {
  init: function () {
    this.appendValueInput('SET_TRACK')
      .appendField(new FieldPlusMinus(), 'PM_FIELD')
      .setCheck('CSetVector')
      .appendField('Set track', 'SET_TRACK_FIELD')
    this.setPreviousStatement('CStatement')
    this.setNextStatement('CStatement')
    this.setInputsInline(false)
    this.setColour(25)
    this.setTooltip('Sets a number of tracks to some velocity and direction.\n' +
            'Right-click and select Add/Remove Input to control the number of tracks.')

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

    valueInput.appendField('to')
  }
}

Blockly.Blocks.PointStatement = {
  init: function () {
    this.appendDummyInput('SET_POINT')
      .appendField(new FieldPlusMinus(), 'PM_FIELD')
      .appendField('Set point', 'SET_POINT_FIELD')
    this.setPreviousStatement('CStatement')
    this.setNextStatement('CStatement')
    this.setColour(0)
    this.setTooltip('Sets a number of points to either branch or be straight.\n' +
            'Right-click and select Add/Remove Input to control the number of points.')

    this.inputCount = 1
    this.updateShape()
  },

  mutationToDom,

  domToMutation,

  updateShape: function () {
    const values = []
    for (let i = 0; i < this.inputCount; i++) {
      values.push(
        this.getField('NUMBER' + i)
          ? this.getField('NUMBER' + i).getValue()
          : '0'
      )
    }

    const dummyInput = this.getInput('SET_POINT')
    const toRemove = []

    for (let i = 0; i < dummyInput.fieldRow.length; i++) {
      const name = dummyInput.fieldRow[i].name
      if (!name || name[0] === 'N' || name[0] === 'B') { toRemove.push(name) }
    }
    for (let i = 0; i < toRemove.length; i++) {
      dummyInput.removeField(toRemove[i])
    }

    for (let i = 0; i < this.inputCount; i++) {
      if (i === 0) {
        dummyInput.appendField(new Blockly.FieldNumber(
          0, 0, 29
        ), 'NUMBER' + i)
      } else {
        dummyInput.appendField(',')
          .appendField(new Blockly.FieldNumber(
            0, 0, 29
          ), 'NUMBER' + i)
      }
      this.setFieldValue(values[i], 'NUMBER' + i)
    }

    // Append the last portion of this block.
    dummyInput.appendField('to')
      .appendField(new Blockly.FieldDropdown(
        [
          ['straight', 'ITEM1'],
          ['branch', 'ITEM2']
        ]
      ), 'BRANCH_OPTION')
  }
}

Blockly.Blocks.LightStatement = {
  init: function () {
    this.appendDummyInput('SET_LIGHT')
      .appendField(new FieldPlusMinus(), 'PM_FIELD')
      .appendField('Set light', 'SET_LIGHT_FIELD')
    this.setPreviousStatement('CStatement')
    this.setNextStatement('CStatement')
    this.setColour(60)
    this.setTooltip('Sets a number of lamps to either on or off.\n' +
            'Right-click and select Add/Remove Input to control the number of lamps.')

    this.inputCount = 1
    this.updateShape()
  },

  mutationToDom,

  domToMutation,

  updateShape: function () {
    const values = []
    for (let i = 0; i < this.inputCount; i++) {
      values.push(
        this.getField('NUMBER' + i)
          ? this.getField('NUMBER' + i).getValue()
          : '0'
      )
    }

    const valueInput = this.getInput('SET_LIGHT')
    const toRemove = []

    for (let i = 0; i < valueInput.fieldRow.length; i++) {
      const name = valueInput.fieldRow[i].name
      if (!name || name[0] === 'N' || name[0] === 'L') { toRemove.push(name) }
    }
    for (let i = 0; i < toRemove.length; i++) {
      valueInput.removeField(toRemove[i])
    }

    for (let i = 0; i < this.inputCount; i++) {
      if (i === 0) {
        valueInput.appendField(new Blockly.FieldNumber(
          0, 0, 23
        ), 'NUMBER' + i)
      } else {
        valueInput.appendField(',')
          .appendField(new Blockly.FieldNumber(
            0, 0, 23
          ), 'NUMBER' + i)
      }
      this.setFieldValue(values[i], 'NUMBER' + i)
    }

    valueInput.appendField('to')
      .appendField(new Blockly.FieldDropdown(
        [
          ['on', 'ITEM1'],
          ['off', 'ITEM2']
        ]
      ), 'LIGHT_STATUS')
  }
}
