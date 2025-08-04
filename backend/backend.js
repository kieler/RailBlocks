// BACKEND SERVER THAT LISTENS TO FRONTEND SERVER

// Uses express to host an additional server that listens to port 5001 for requests.
import express from 'express'
import bodyParser from 'express'
import { exec } from 'child_process'
import fs from 'fs'

// Start the express-based server.
const app = express()
const PORT = 5001

/**
 * Sends local logfiles as a response to the frontend.
 * @param {Response} res -- the response send to the frontend.
 */
function sendLogs(res) {
  res.send(
      'COMPILER:\n' +
      fs.readFileSync('./executor/compiler.log') +
      '\n\n' +
      'CONTROLLER:\n' +
      fs.readFileSync('./executor/controller.log')
  )
}

// Resolve dependency such that the request's body, which always is generated RailSL code, can easily be decoded.
app.use(bodyParser.json())

/**
 * Listens to localhost:5001/api/pipe, executes the appropriate program on the local machine or returns logs.
 *
 * @param {Request} req -- the request send by the frontend.
 * @param {Response} res -- the response send to the frontend.
 */
app.post('/api/pipe', (req, res) => {
  // Parse the generated RailSL from the request body json.
  const code = req.body.code
  // Parse the string representing which button has been pressed.
  const buttonElementId = req.body.elementId

  // Save the generated code to a local file.
  fs.writeFileSync('./executor/saved.railsl', code)

  // Execute different programs based on which button has been pressed.
  if (buttonElementId === 'button_run') {
    // If the "Run" button has been pressed, open another shell that cds into the executor directory
    // and executes the deployment script.
    exec('sh -c "cd executor && ./build_and_run_deploy.sh"', () => {
      // When the script finished notify the user.
      sendLogs(res)
    })
  } else if (buttonElementId === 'button_sim') {
    // If the "Simulate" button has been pressed, open another shell in the executor directory
    // and run the build script that simulates the generated code inside the GUI.
    exec('sh -c "cd executor && ./build_and_run.sh"', () => {
      // ...
      sendLogs(res)
    })
  }
})

// Configure the server to listen at 5001 and notify the node log that the backend has started.
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`)
})
