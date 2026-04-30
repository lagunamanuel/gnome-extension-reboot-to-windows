#!/bin/bash

# Check if the script is run with sudo (root privileges)
if [ "$EUID" -ne 0 ]; then
  echo "Error: Please run this script with sudo."
  exit 1
fi

TARGET_USER=$SUDO_USER
RULE_FILE="/etc/sudoers.d/gnome-extension-reboot-to-windows"
WRAPPER_BIN="/usr/local/bin/reboot-to-windows"

# 1. Install the wrapper script into the system and grant execution permissions
cp reboot-wrapper.sh "$WRAPPER_BIN"
chmod +x "$WRAPPER_BIN"

# 2. Write the secure rule into the sudoers file to only allow this specific script
echo "$TARGET_USER ALL=(root) NOPASSWD: $WRAPPER_BIN" > "$RULE_FILE"

# Apply strict permissions (440 is mandatory for sudoers files)
chmod 440 "$RULE_FILE"

echo "Setup complete! $TARGET_USER can now reboot dynamically to Windows."