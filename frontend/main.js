import * as Blockly from 'blockly/core'
import * as En from 'blockly/msg/en'

import { blockDefinitionsJson, toolbox } from './blocks.js'
import './renderer.js'
import './dynamic_blocks.js'
import { compile } from './generator.js'

// MAIN PROGRAM

// Important for block descriptions!
Blockly.setLocale(En)

// Set block definitions from blocks.js
const blockDefinitions = Blockly.common.createBlockDefinitionsFromJsonArray(blockDefinitionsJson)
Blockly.common.defineBlocks(blockDefinitions)

// Add change saturation of individual blocks.
Blockly.utils.colour.setHsvSaturation(0.8)

// Enable the usage of comments.
Blockly.ContextMenuItems.registerCommentOptions()

// Set the font a bit bolder and always to Arial.
const theme = Blockly.Theme.defineTheme('theme', {
  fontStyle: {
    family: 'Arial, sans-serif',
    weight: '700'
  },
  startHats: true
})

// Pass the defined toolbox to the div in index.html.
const workspace = Blockly.inject('blocklyDiv', {
  toolbox,
  theme,
  // Load the custom renderer defined in renderer.js
  // Should not make a big difference but is advised to be loaded for extensions.
  renderer: 'thrasos_extended',
  move: {
    scrollbars: {
      horizontal: true,
      vertical: true
    },
    drag: true,
    wheel: true
  }
})

// Add one program block.
const program = workspace.newBlock('Program', 'ROOT')
program.initSvg()
program.render()
program.setDeletable(false)
program.setMovable(false)
program.setEditable(false)
// Add some padding to border
program.moveBy(10, 10)

/**
 * Warns the user by indicating all blocks that are not inside the program block.
 * @param {Blockly.WorkspaceSvg} workspace The workspace to scan.
 */
function markUnusedBlocks (workspace) {
  // Mark all unused blocks
  workspace.getAllBlocks().forEach(block => {
    // getRootBlock() returns the topmost block in a stack.
    if (!block.unused && block.getRootBlock().id !== 'ROOT') {
      block.setWarningText('Unused block')
      block.unused = true
    } else if (block.unused && block.getRootBlock().id === 'ROOT') {
      block.setWarningText(null)
      block.unused = false
      // (remind the loop-warner, that the warning text has been cleared)
      block.warned = false
    }
  })
}

/**
 * Helper function that checks if a block with input statements contains or is a loop statement.
 * @param {Blockly.Block} block Block to be searched in.
 * @returns {boolean} True if block contains or is loop statement.
 */
function containsLoopBlock (block) {
  // Induction start.
  if (block && block.type === 'LoopStatement') {
    return true
  }
  // Induction step over all input Statements.
  for (const input of block.inputList) {
    if (input.connection) {
      let child = input.connection.targetBlock()
      while (child) {
        if (containsLoopBlock(child)) {
          return true
        }
        child = child.getNextBlock()
      }
    }
  }

  // Induction start.
  return false
}

/**
 * Warns the user by indicating all branch and parallel blocks that contain loop blocks.
 * This is because this condition can cause infinite loops that are not obvious to the programmer.
 * @param {Blockly.WorkspaceSvg} workspace The workspace to scan.
 */
function markWarnings (workspace) {
  // Mark all Blocks following Branch/Parallel Blocks that have loops inside.
  workspace.getAllBlocks().forEach(block => {
    const cond = containsLoopBlock(block)
    if (!block.warned && block.type === 'ParallelStatement' && cond) {
      block.setWarningText('Blocks after will not be reached because of a loop inside this.')
      block.warned = true
    } else if (!block.warned && block.type === 'ConditionalStatement' && cond) {
      block.setWarningText('Blocks after may not be reached because of a loop inside this.')
      block.warned = true
    } else if (block.warned && !cond) {
      // Close previous warning if it exists.
      block.setWarningText(null)
      block.warned = false
      // (remind the unused-warner that the warning has been cleared)
      block.unused = false
    }
  })
}

/**
 * Warns the user by indicating blocks that have unconnected ends because they will cause a syntax error.
 * @param {Blockly.WorkspaceSvg} workspace The workspace to scan.
 */
function markUnconnectedBlocks (workspace) {
  // Go through all blocks in the workspace.
  workspace.getAllBlocks().forEach(block => {
    let cond = false
    // The condition is true if the block contains some input that has a connection which is not connected.
    for (const input of block.inputList) {
      if (input.connection && !input.connection.isConnected()) {
        cond = true
      }
    }

    // Set the warnings if appropriate.
    if (cond && !block.unused) {
      block.setWarningText('This block has empty inputs and will cause a syntax error!')
      block.unconnected = true
    } else if (!cond && block.unconnected) {
      block.setWarningText(null)
      block.unconnected = false
    }
  })
}

// Add all change listeners for the warnings and compiler.
workspace.addChangeListener((event) => {
  // Send all code to the output div.
  compile(workspace)

  if (event.type === Blockly.Events.BLOCK_MOVE) {
    // Mark blocks not inside the program block.
    markUnusedBlocks(workspace)
    // Mark Branch and Parallel blocks if they contain a loop.
    markWarnings(workspace)
  }

  // Mark blocks that have unconnected connections.
  markUnconnectedBlocks(workspace)
})

// Boolean that blocks concurrent runs.
let running = false

/*
  Wrapper to display running animation and blocking further runs.
 */
function onStart(){
  document.getElementById("running_animation").style.display = 'inline-block'
  running = true
}

/*
  Wrapper to stop running animation and enabling further runs.
 */
function onStop(){
  document.getElementById("running_animation").style.display = 'none'
  running = false
}

/**
 * Helper function that sends the generated code to the backend.
 * @param {String} elementId Id of button that had been pressed for this action.
 */
function sendSignalToBackend (elementId) {
  onStart()

  // Send the code to the backend and tell what button was pressed.
  fetch('/api/pipe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    // Send ID of button that has been pressed and the code.
    body: JSON.stringify({
      elementId,
      code: document.getElementById('generated code').innerText
    })
  })
  // When receiving the response display this text inside the output-div.
    .then(res => res.text())
    .then(output => {
      document.getElementById('output').textContent = output
      onStop()
    })
    .catch(err => {
      document.getElementById('output').textContent = 'Error: ' + err
      onStop()
    })
}

// Add listeners to simulation and deploy buttons that communicate with backend.
document.getElementById('button_sim').addEventListener('click', () => {
  if (!running) {
    sendSignalToBackend('button_sim')
  }
})
document.getElementById('button_run').addEventListener('click', () => {
  if (!running && confirm("Really deploy on the railway?")) {
    sendSignalToBackend('button_run')
  }
})

// Add another listener to the save button, which saves the generated file locally through the browser.
document.getElementById('button_save').addEventListener('click', () => {
  // Get the current workspace state.
  const state = Blockly.serialization.workspaces.save(workspace)

  // Store it in a blob.
  const blob = new Blob([JSON.stringify(state, null, 2)], {
    type: 'application/json'
  })
  // Get it's url ...
  const url = URL.createObjectURL(blob)

  // And send it to a hidden anchor.
  const a = document.createElement('a')
  a.href = url
  // Filename of the generated json.
  a.download = 'workspace.json'

  // Click on the hidden anchor.
  a.click()
  // Clean up.
  URL.revokeObjectURL(url)
})

// Add another listener for the load file, which imports a local json file through the browser
// and subsequently loads the saved workspace from it.
document.getElementById('file_load').addEventListener('change', (event) => {
  // Get the name of the file ...
  const files = event.target.files
  const fr = new FileReader()
  // ... define what happens when it is loaded ...
  fr.onload = () => {
    // (toString because type safety)
    const state = JSON.parse(fr.result.toString())
    Blockly.serialization.workspaces.load(state, workspace)
  }
  // ... and load it.
  fr.readAsText(files[0])
})

// Toggle for visibility of loading/running-gif.
let devDivVisible = false
document.getElementById('button_options').addEventListener('click', () => {
  if (devDivVisible){
    document.getElementById('devDiv').style.zIndex = '-1'
    devDivVisible = false
  } else {
    document.getElementById('devDiv').style.zIndex = '1'
    devDivVisible = true
  }
})
