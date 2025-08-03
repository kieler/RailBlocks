import * as Blockly from 'blockly/core'

// CUSTOM BUILD RENDERER TO IMPLEMENT EASY NEW CONNECTION SHAPES

/**
 * Class extending the Thrasos renderer constants to define custom shapes in and add them to connection checks.
 */
class ThrasosExtendedConstantProvider extends Blockly.blockRendering.ConstantProvider {
  // Define shapes
  init () {
    super.init()

    const WIDTH = this.TAB_WIDTH
    const HEIGHT = this.TAB_HEIGHT

    // 1 and 2 are reserved for NOTCH and PUZZLE
    this.SHAPES.RECTANGLE = 3
    this.OUTPUT_RECTANGLE = {
      type: this.SHAPES.RECTANGLE,
      width: WIDTH,
      height: HEIGHT,
      pathUp: Blockly.utils.svgPaths.line([
        Blockly.utils.svgPaths.point(-WIDTH, 0),
        Blockly.utils.svgPaths.point(0, -HEIGHT),
        Blockly.utils.svgPaths.point(WIDTH, 0)
      ]
      ),
      pathDown: Blockly.utils.svgPaths.line([
        Blockly.utils.svgPaths.point(-WIDTH, 0),
        Blockly.utils.svgPaths.point(0, HEIGHT),
        Blockly.utils.svgPaths.point(WIDTH, 0)
      ])
    }

    this.SHAPES.TRIANGLE = 4
    this.OUTPUT_TRIANGLE = {
      type: this.SHAPES.TRIANGLE,
      width: WIDTH,
      height: HEIGHT,
      pathUp: Blockly.utils.svgPaths.line([
        Blockly.utils.svgPaths.point(-WIDTH, -HEIGHT / 2),
        Blockly.utils.svgPaths.point(WIDTH, -HEIGHT / 2)
      ]
      ),
      pathDown: Blockly.utils.svgPaths.line([
        Blockly.utils.svgPaths.point(-WIDTH, HEIGHT / 2),
        Blockly.utils.svgPaths.point(WIDTH, HEIGHT / 2)
      ])
    }

    this.SHAPES.HEX = 5
    this.OUTPUT_HEX = {
      type: this.SHAPES.HEX,
      width: WIDTH,
      height: HEIGHT,
      pathUp: Blockly.utils.svgPaths.line([
        Blockly.utils.svgPaths.point(-WIDTH, -HEIGHT / 4),
        Blockly.utils.svgPaths.point(0, -HEIGHT / 2),
        Blockly.utils.svgPaths.point(WIDTH, -HEIGHT / 4)
      ]),

      pathDown: Blockly.utils.svgPaths.line([
        Blockly.utils.svgPaths.point(-WIDTH, HEIGHT / 4),
        Blockly.utils.svgPaths.point(0, HEIGHT / 2),
        Blockly.utils.svgPaths.point(WIDTH, HEIGHT / 4)
      ])

    }
  }

  // Define connection check shape.
  shapeFor (connection) {
    let check = connection.getCheck()

    if (!check && connection.targetConnection) {
      check = connection.targetConnection.getCheck()
    }

    if (check && check.includes('CSetVector')) return this.OUTPUT_HEX
    if (check && check.includes('CTrack')) return this.OUTPUT_RECTANGLE

    return super.shapeFor(connection)
  }
}

/**
 * Custom renderer class based on Thrasos to support custom connection check shapes.
 *
 * This custom renderer is currently not doing much but only changing the connection shape for the set track statement.
 * It is still included because when other value inputs are added maybe later, this existing renderer can be used for
 * two defined input shapes and the default one based on connection checks.
 */
class ThrasosExtendedRenderer extends Blockly.thrasos.Renderer {
  makeConstants_ () {
    return new ThrasosExtendedConstantProvider()
  }
}

// Register the renderer to be used inside Blockly internally.
Blockly.blockRendering.register('thrasos_extended', ThrasosExtendedRenderer)
