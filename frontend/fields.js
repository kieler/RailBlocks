/*
 * RailBlocks - A Blockly RailSL Implementation
 *
 * https://github.com/kieler/RailBlocks
 *
 * Copyright 2025-2026 by
 *  + Tokessa Hamann
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
import { BlockSvg } from 'blockly/core'
import { ensureShadow } from './dynamic_blocks'

/**
 * Class for field that adds a Plus and Minus button that increment/decrement
 * the block's internal inputCount and subsequently call updateShape.
 *
 * Requires the block to have an internal variable inputCount
 * which tracks the amount of inputs the block "should" have
 * and a function updateShape which builds the block based on inputCount.
 */
export class FieldPlusMinus extends Blockly.Field {
  // This was a nightmare to implement.

  /**
     * Class for field that adds a Plus and Minus button that increment/decrement
     * the block's internal inputCount and subsequently call updateShape.
     *
     * Requires the block to have an internal variable inputCount
     * which tracks the amount of inputs the block "should" have
     * and a function updateShape which builds the block based on inputCount.
     *
     * @returns {Blockly.Field} +/- Field
     */
  constructor () {
    super(null)
    // Internal parameter, basically gives this field more freedom and makes it not serializable.
    this.EDITABLE = false
  }

  /**
     * Overridden function that sets the size of this field.
     * @param margin -- Ignored inherited parameter.
     * @private
     */
  // eslint-disable-next-line no-unused-vars
  updateSize_ (margin) {
    this.size_ = new Blockly.utils.Size(10, 20)
  }

  /**
     * Visual constructor of this field that creates two text fields that later will be clickable.
     */
  initView () {
    // This is lazy type checking, which should always be true, but I don't want my IDE to cry about type safety.
    if (this.sourceBlock_ instanceof BlockSvg) {
      this.svgRoot = this.sourceBlock_.getSvgRoot()
      this.fieldGroup_ = Blockly.utils.dom.createSvgElement('g', {}, this.svgRoot)
    } else return

    // If the methods don't exist, this field should not be used.
    if (!this.sourceBlock_.updateShape || !this.sourceBlock_.inputCount) {
      console.error(`Block ${this.sourceBlock_} does not contain updateShape or inputCount`)
      return
    }

    // Initialize the minus text field.
    // Note that the plus text field is created later and thus "over" the minus field and thus has a bigger border.
    this.minusButton_ = Blockly.utils.dom.createSvgElement('text', {
      x: -3,
      y: 25,
      style: 'cursor: pointer; user-select: none; font-family: monospace; font-size: 16pt;'
    }, this.fieldGroup_)
    this.minusButton_.textContent = '−'

    this.plusButton_ = Blockly.utils.dom.createSvgElement('text', {
      x: -3,
      y: 15,
      style: 'cursor: pointer; user-select: none; font-family: monospace; font-size: 16pt;'
    }, this.fieldGroup_)
    this.plusButton_.textContent = '+'
  }

  /**
     * Adds listeners for the text fields to change input count on click and give visual indicators on hover.
     * @private
     */
  bindEvents_ () {
    // Add wrappers for clicking ...

    this.clickWrapperPlus_ = Blockly.browserEvents.bind(
      this.plusButton_,
      'click',
      this,
      this.increase_count
    )

    this.clickWrapperMinus_ = Blockly.browserEvents.bind(
      this.minusButton_,
      'click',
      this,
      this.decrease_count
    )

    // ... and hovering.

    this.hoverOnWrapperPlus_ = Blockly.browserEvents.bind(
      this.plusButton_,
      'mouseover',
      this,
      () => {
        this.plusButton_.setAttribute('font-weight', '900')
        this.plusButton_.setAttribute('stroke', '#E4E4E4')
        this.plusButton_.setAttribute('stroke-width', '0.75')
      }
    )

    this.hoverOffWrapperPlus_ = Blockly.browserEvents.bind(
      this.plusButton_,
      'mouseout',
      this,
      () => {
        this.plusButton_.setAttribute('font-weight', '400')
        this.plusButton_.setAttribute('stroke', 'none')
        this.plusButton_.setAttribute('stroke-width', '0')
      }
    )

    this.hoverOnWrapperMinus_ = Blockly.browserEvents.bind(
      this.minusButton_,
      'mouseover',
      this,
      () => {
        this.minusButton_.setAttribute('font-weight', '900')
        this.minusButton_.setAttribute('stroke', '#E4E4E4')
        this.minusButton_.setAttribute('stroke-width', '0.75')
      }
    )

    this.hoverOffWrapperMinus_ = Blockly.browserEvents.bind(
      this.minusButton_,
      'mouseout',
      this,
      () => {
        this.minusButton_.setAttribute('font-weight', '400')
        this.minusButton_.setAttribute('stroke', 'none')
        this.minusButton_.setAttribute('stroke-width', '0')
      }
    )
  }

  /**
     * Deregisters all listeners of this field.
     */
  dispose () {
    // Dispose all introduced wrappers...
    if (this.clickWrapperPlus_) {
      Blockly.browserEvents.unbind(this.clickWrapperPlus_)
    }
    if (this.clickWrapperMinus_) {
      Blockly.browserEvents.unbind(this.clickWrapperMinus_)
    }
    if (this.hoverOnWrapperPlus_) {
      Blockly.browserEvents.unbind(this.hoverOnWrapperPlus_)
    }
    if (this.hoverOffWrapperPlus_) {
      Blockly.browserEvents.unbind(this.hoverOffWrapperPlus_)
    }
    if (this.hoverOnWrapperMinus_) {
      Blockly.browserEvents.unbind(this.hoverOnWrapperMinus_)
    }
    if (this.hoverOffWrapperMinus_) {
      Blockly.browserEvents.unbind(this.hoverOffWrapperMinus_)
    }
    // ... and dispose all others.
    super.dispose()
  }

  /**
     * Increases the block's internal inputCount variable and rebuilds it.
     */
  increase_count () {
    this.sourceBlock_.inputCount++
    this.sourceBlock_.updateShape()
    ensureShadow(this.sourceBlock_, 'NUMBER_INPUT_' + (this.sourceBlock_.inputCount - 1))
  }

  /**
     * Decreases the block's internal inputCount variable and rebuilds it.
     */
  decrease_count () {
    if (this.sourceBlock_.inputCount > 1) {
      this.sourceBlock_.inputCount--
      this.sourceBlock_.updateShape()
    }
  }

  // As this field is not a compiler-specific input, the following methods are overridden to prevent accidental use.

  getText () { return '' }
  getValue () {}
  // eslint-disable-next-line no-unused-vars
  setValue (_0, _1) {}
}

/**
 * Class that extends the blockly's single dropdown field to a multi-select dropdown.
 */
class FieldMultiSelectDropdown extends Blockly.FieldDropdown {
  /**
   * @param {Array<[string, string]>} options array of [value, item] pairs
   * @param {Array<string>} value initially selected option values.
   * @param {Function} [validator] optional validator function
   */
  constructor (options, value = [], validator) {
    // FieldDropdown's constructor wants a menu generator.
    // Pass it straight through so any internal FieldDropdown behavior that reads it still has something valid.
    super(options, validator)
    this.menuOptions_ = options.map(([val]) => [val, val])
    this.value_ = this.doClassValidation_(value)
    this.SERIALIZABLE = true
    this.maxDisplayLength = Infinity
  }

  /**
   * Construct a FieldMultiSelectDropdown from a JSON object.
   */
  static fromJson (options) {
    return new FieldMultiSelectDropdown(options.options, options.value ?? [], options.validator)
  }

  /**
   * Ensures the field's value is always an array containing only values that exist among the configured options.
   */
  doClassValidation_ (newValue) {
    if (!Array.isArray(newValue)) {
      return []
    }

    const validValues = new Set(this.menuOptions_.map(([val]) => val))
    // remove duplicates and filtering for existing vals
    return [...new Set(newValue)].filter((val) => validValues.has(val))
  }

  /**
   * Text shown on the block face.
   */
  getText_ () {
    if (!this.value_ || this.value_.length === 0) return Blockly.Msg.RAILBLOCKS_TRACK_NONE
    return this.menuOptions_
      .filter(([val]) => this.value_.includes(val))
      .map(([val]) => val)
      .join(', ')
  }

  /**
   * Renders the popup content.
   * Overrides FieldDropdown's default single-select menu with a scrollable list of checkboxes.
   */
  showEditor_ () {
    const contentDiv = Blockly.DropDownDiv.getContentDiv()

    // --- Scrollable checkbox list ---
    const listContainer = document.createElement('div')
    listContainer.style.maxHeight = '300px'
    listContainer.style.overflowY = 'auto'
    listContainer.addEventListener('change', this.onCheckboxChange_.bind(this))
    this.listContainer_ = listContainer

    contentDiv.appendChild(listContainer)
    this.renderCheckboxRows_()

    Blockly.DropDownDiv.showPositionedByField(this, this.dropdownDispose_.bind(this))
  }

  /**
   * Builds the checkbox rows
   */
  renderCheckboxRows_ () {
    const listContainer = this.listContainer_

    this.menuOptions_.forEach(([label, val], index) => {
      const row = document.createElement('label')
      row.style.display = 'flex'
      row.style.alignItems = 'center'
      row.style.padding = '4px 7px'
      row.style.cursor = 'pointer'
      row.style.whiteSpace = 'nowrap'
      row.style.borderRadius = '2px'
      row.style.fontFamily = "'Helvetica Neue', Helvetica, Arial, sans-serif"
      row.style.fontSize = '12px'
 
      // colour hovered row
      row.addEventListener('mouseenter', () => {
        row.style.backgroundColor = 'rgba(0,0,0,0.1)'
      })
      row.addEventListener('mouseleave', () => {
        row.style.backgroundColor = 'transparent'
      })
 
      const checkbox = document.createElement('input')
      checkbox.type = 'checkbox'
      checkbox.checked = this.value_.includes(val)
      checkbox.dataset.index = index

 
      const text = document.createElement('span')
      text.textContent = label
 
      row.appendChild(checkbox)
      row.appendChild(text)
      listContainer.appendChild(row)
    })
  }

   /**
   * Delegated handler for checkbox toggles inside the list container.
   */
  onCheckboxChange_ (event) {
    const checkbox = event.target
    if (!checkbox || checkbox.type !== 'checkbox') {
      return
    }
 
    const [val] = this.menuOptions_[checkbox.dataset.index]
    const current = new Set(this.value_)
    if (checkbox.checked) {
      current.add(val)
    } else {
      current.delete(val)
    }
    this.setValue([...current])
    // Refresh the on-block text immediately.
    this.forceRerender()
  }
 
  dropdownDispose_ () {
    this.listContainer_ = null
  }
}

Blockly.fieldRegistry.register('field_multiselectdropdown', FieldMultiSelectDropdown)

export { FieldMultiSelectDropdown }
