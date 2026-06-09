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

// CONSTANTS

// All segments used internally.
// Maybe a bad idea to do it like this.
const segName = [
  ['KH_ST_0', 'ITEM1'],
  ['KH_ST_1', 'ITEM2'],
  ['KH_ST_2', 'ITEM3'],
  ['KH_ST_3', 'ITEM4'],
  ['KH_ST_4', 'ITEM5'],
  ['KH_ST_5', 'ITEM6'],
  ['KH_ST_6', 'ITEM7'],

  ['KH_LN_0', 'ITEM8'],
  ['KH_LN_1', 'ITEM9'],
  ['KH_LN_2', 'ITEM10'],
  ['KH_LN_3', 'ITEM11'],
  ['KH_LN_4', 'ITEM12'],
  ['KH_LN_5', 'ITEM13'],
  ['KH_LN_6', 'ITEM14'],
  ['KH_LN_7', 'ITEM15'],
  ['KH_LN_8', 'ITEM16'],

  ['KIO_LN_0', 'ITEM17'],
  ['KIO_LN_1', 'ITEM18'],

  ['OC_ST_0', 'ITEM19'],
  ['OC_ST_1', 'ITEM20'],
  ['OC_ST_2', 'ITEM21'],
  ['OC_ST_3', 'ITEM22'],
  ['OC_ST_4', 'ITEM23'],

  ['OC_LN_0', 'ITEM24'],
  ['OC_LN_1', 'ITEM25'],
  ['OC_LN_2', 'ITEM26'],
  ['OC_LN_3', 'ITEM27'],
  ['OC_LN_4', 'ITEM28'],
  ['OC_LN_5', 'ITEM29'],

  ['IC_ST_0', 'ITEM30'],
  ['IC_ST_1', 'ITEM31'],
  ['IC_ST_2', 'ITEM32'],
  ['IC_ST_3', 'ITEM33'],
  ['IC_ST_4', 'ITEM34'],

  ['IC_LN_0', 'ITEM35'],
  ['IC_LN_1', 'ITEM36'],
  ['IC_LN_2', 'ITEM37'],
  ['IC_LN_3', 'ITEM38'],
  ['IC_LN_4', 'ITEM39'],
  ['IC_LN_5', 'ITEM40'],

  ['OC_JCT_0', 'ITEM41'],
  ['IC_JCT_0', 'ITEM42'],

  ['OI_LN_0', 'ITEM43'],
  ['OI_LN_1', 'ITEM44'],
  ['OI_LN_2', 'ITEM45'],

  ['IO_LN_0', 'ITEM46'],
  ['IO_LN_1', 'ITEM47'],
  ['IO_LN_2', 'ITEM48']
]

// Returns the right segment name for an ITEM-String.
const segNameMap = new Map(segName.map(([l, r]) => [r, l]))

// Function that the dynamic blocks have to use to store their inputCount variable in the DOM.
function mutationToDom () {
  // Add XML to store input count in document.
  const container = document.createElement('mutation')
  container.setAttribute('inputs', this.inputCount)
  return container
}

// Function that the dynamic blocks have to use to load their inputCount variable from the DOM.
function domToMutation (xmlElement) {
  // Read input count from XML.
  this.inputCount = parseInt(xmlElement.getAttribute('inputs'), 10)
  this.updateShape()
}

// Validator for the typing version of the set track statement.
function validatorSegment (text) {
  // If the user input is in the domain of segName, then return it, else pass null to default to KH_ST_0.
  return new Map(segName).has(text) ? text : null
}

export { segName, segNameMap, mutationToDom, domToMutation, validatorSegment }
