#!/bin/bash

# Check if the script is run with sudo (root privileges)
if [ "$EUID" -ne 0 ]; then
  echo "Error: Please run this script with sudo."
  exit 1
fi

RULE_FILE="/etc/sudoers.d/gnome-extension-reboot-to-windows"
WRAPPER_BIN="/usr/local/bin/reboot-to-windows"

# 1. Remove the sudoers security rule if it exists
if [ -f "$RULE_FILE" ]; then
    rm -f "$RULE_FILE"
    echo "Removed sudoers rule: $RULE_FILE"
else
    echo "Sudoers rule not found, skipping."
fi

# 2. Remove the executable wrapper script if it exists
if [ -f "$WRAPPER_BIN" ]; then
    rm -f "$WRAPPER_BIN"
    echo "Removed wrapper script: $WRAPPER_BIN"
else
    echo "Wrapper script not found, skipping."
fi

echo "System-level uninstallation complete! Your system is clean."