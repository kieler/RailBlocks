#!/bin/sh

<<LICENSE
RailBlocks - A Blockly RailSL Implementation

https://github.com/kieler/RailBlocks

Copyright 2025 by
 + Henri Heyden and
 + Kiel University
   + Department of Computer Science
     + Real-Time and Embedded Systems Group

This program and the accompanying materials are made
available under the terms of the MIT License which
is available at https://opensource.org/license/MIT.

SPDX-License-Identifier: MIT
LICENSE

# Kill still running rail controllers.
killall --wait "RailController.exe"

# Remove old binaries and logs.
rm -rf kieler-gen RailController.exe compiler.log controller.log
# Create empty logs so that if something fails we don't get an error trying to fetch the logs
touch compiler.log controller.log

# Compile code
./kico-linux -s de.cau.cs.kieler.railsl.netlist.deploy ./saved.railsl > compiler.log

# Deploy
./RailController.exe > controller.log
