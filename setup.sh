#!/bin/bash

# Check if the script is run with sudo (root privileges)
if [ "$EUID" -ne 0 ]; then
  echo "Error: Please run this script with sudo."
  exit 1
fi

# Get the real username of the person running sudo
TARGET_USER=$SUDO_USER

# Define the sudoers file path
RULE_FILE="/etc/sudoers.d/gnome-extension-reboot-to-windows"

# Write the rule to the file
echo "$TARGET_USER ALL=(root) NOPASSWD: /usr/sbin/efibootmgr -n 0003" > "$RULE_FILE"

# Apply strict permissions (440 is mandatory for sudoers files)
chmod 440 "$RULE_FILE"

echo "Setup complete! $TARGET_USER can now reboot to Windows without a password."
