/*
 * RailBlocks - A Blockly RailSL Implementation
 *
 * https://github.com/kieler/RailBlocks
 *
 * Copyright 2026 by
 *  + Tokessa Hamann and
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

// CUSTOM BUILD RENDERER TO IMPLEMENT EASY NEW CONNECTION SHAPES

/**
 * Class extending the Zelos renderer constants to define custom shapes in and add them to connection checks.
 */
class ZelosExtendedConstantProvider extends  Blockly.zelos.Renderer {
  constructor(name) {
    super(name);
  }

    makeConstants_() {
        return new CustomConstants()
    }
}

class CustomConstants extends Blockly.zelos.ConstantProvider {
  init() {
    super.init()

    const maxWidth = this.MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH;

    function lineTo(dx, dy) {
      return ' l ' + dx + ',' + dy + ' ';
    }


    // creates Hexagon Shape (currently not in use)
    // eslint-disable-next-line no-unused-vars
    function makeMainPathHex(height, up, right) {
      const halfHeight = height / 2;
      const width = halfHeight > maxWidth ? maxWidth : halfHeight;
      const forward = up ? -1 : 1;
      const direction = right ? -1 : 1;

      const cornerSize = width / 2;        // diagonal corner cut size
      const dyCorner = (forward * height) / 4;
      const dyFlat = (forward * height) / 2 - dyCorner;

      return (
        lineTo(-direction * cornerSize, dyCorner) +
        lineTo(-direction * (width - cornerSize), dyFlat) +
        lineTo(direction * (width - cornerSize), dyFlat) +
        lineTo(direction * cornerSize, dyCorner)
      );
    }

    // Creates Octagon shape
    function makeMainPathOct(height, up, right) {
      const halfHeight = height / 2;
      const width = halfHeight > maxWidth ? maxWidth : halfHeight;
      const forward = up ? -1 : 1;
      const direction = right ? -1 : 1;

      // Split the half-height into 3 parts: corner / straight / corner
      const cornerHeight = halfHeight / 2;
      const straightHeight = halfHeight;
      const cornerWidth = width / 2;

      const dyCorner = forward * cornerHeight;
      const dyStraight = forward * straightHeight;

      return (
        // top/bottom flat horizontal edge
        lineTo(-direction * (width - cornerWidth), 0) +
        // diagonal corner
        lineTo(-direction * cornerWidth, dyCorner) +
        // vertical edge
        lineTo(0, dyStraight) +
        // diagonal corner (mirrors the first)
        lineTo(direction * cornerWidth, dyCorner) +
        // bottom/top flat horizontal edge
        lineTo(direction * (width - cornerWidth), 0)
      );
    }

    this.C_SET_VECTOR_SHAPE = {
      type: this.SHAPES.HEXAGONAL,
      isDynamic: true,
      width(height) {
        const halfHeight = height / 2;
        return halfHeight > maxWidth ? maxWidth : halfHeight;
      },
      height(height) {
        return height;
      },
      connectionOffsetY(connectionHeight) {
        return connectionHeight / 2;
      },
      connectionOffsetX(connectionWidth) {
        return -connectionWidth;
      },
      pathDown(height) {
        return makeMainPathOct(height, false, false);
      },
      pathUp(height) {
        return makeMainPathOct(height, true, false);
      },
      pathRightDown(height) {
        return makeMainPathOct(height, false, true);
      },
      pathRightUp(height) {
        return makeMainPathOct(height, false, true);
      },
    } 
  }

  shapeFor(connection) {
    let check = connection.getCheck()

    if (!check && connection.targetConnection) {
      check = connection.targetConnection.getCheck()
    }

    if (check && check.includes('CSetVector')) return this.C_SET_VECTOR_SHAPE

    return super.shapeFor(connection)

  }
}

Blockly.blockRendering.register('zelos_renderer', ZelosExtendedConstantProvider);

