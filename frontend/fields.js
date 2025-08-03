import * as Blockly from 'blockly/core'
import { BlockSvg } from 'blockly/core'

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
      }
    )

    this.hoverOffWrapperPlus_ = Blockly.browserEvents.bind(
      this.plusButton_,
      'mouseout',
      this,
      () => {
        this.plusButton_.setAttribute('font-weight', '400')
      }
    )

    this.hoverOnWrapperMinus_ = Blockly.browserEvents.bind(
      this.minusButton_,
      'mouseover',
      this,
      () => {
        this.minusButton_.setAttribute('font-weight', '900')
      }
    )

    this.hoverOffWrapperMinus_ = Blockly.browserEvents.bind(
      this.minusButton_,
      'mouseout',
      this,
      () => {
        this.minusButton_.setAttribute('font-weight', '400')
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
  setValue (_0, _1) {}
}
