#!/bin/sh

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
