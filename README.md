# RailBlocks
#### A Blockly RailSL Implementation
_RailBlocks_ is a visual programming language (VPL) and integrated development environment (IDE) using Google Blockly that translates to _RailSL_ (the Railway-specific language), a textual domain-specific language, used by the Kieler University to teach about real-time and embedded systems.

The VPL is designed to simplify the original RailSL grammar to make it usable by anyone.

### Features
- Simple block-based programming
- Translation to RailSL
- Automatic simulation and deployment of generated RailSL code
- Visual warnings and tooltips for each block

![IDE Screenshot](https://i.imgur.com/LLmYfnN.png "IDE")

### Requirements
- Linux-based operating system, tested on Arch Linux and Ubuntu 24.04 LTS
- Node.js, tested versions: `24.1.0`, `22.16.0`
    - https://nodejs.org/en
- KIELER Compiler CLI (kico) binary with modern RailSL grammar support
    - Place inside [backend/executor](backend/executor)
    - Has known bug that prevents deploy if path to binary contains whitespaces
    - [https://rtsys.informatik.uni-kiel.de/~kieler/files/blockly-compiler/](https://rtsys.informatik.uni-kiel.de/~kieler/files/blockly-compiler/)
- A Java runtime in PATH, tested with Ubuntu's `openjdk-21-jre` package.

### Installation
1. Clone this repository and cd into it.
2. Install npm dependencies with `npm install`.
3. Start with `npm run start`.

#### Attributions
Icons and animations created by user jucy_fish (train icon), Freepik (hourglass gif) and distributed by [Flaticon](https://www.flaticon.com).
