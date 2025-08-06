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

# Kill already running controllers if the user opened too many.
killall --wait "RailController"

# Remove old binaries and logs.
rm -rf kieler-gen RailController compiler.log controller.log
# Create empty logs so that if something fails we do not get an error trying to fetch the logs
touch compiler.log controller.log

# Compile code
./kico-linux -s de.cau.cs.kieler.railsl.netlist.sim.scade ./saved.railsl > compiler.log

# Start controller in background
sh -c "cd ./kieler-gen/simulation/Executables/ && stdbuf -o0 ./RailController > ../../../controller.log" &

# Start GUI
sh -c "cd ./kieler-gen/simulation/GUI && java -jar ./modelgui-6b1.jar"


# Because the controller orphaned itself, we have to kill it here manually.
killall --wait "RailController"
