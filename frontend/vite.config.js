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

// FILE THAT VITE LOADS SETTINGS FOR THE FRONTEND FOR

export default {
  server: {
    // Pipeline shared by backend.
    proxy: {
      '/api': 'http://localhost:5001'
    },
    // Port of the frontend.
    port: 5000
  }
}
