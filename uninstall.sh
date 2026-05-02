#!/bin/bash

if [ "$EUID" -ne 0 ]; then
  echo "Error: Please run this script with sudo."
  exit 1
fi

REAL_USER=$SUDO_USER
RULE_FILE="/etc/sudoers.d/gnome-extension-reboot-to-windows"
WRAPPER_BIN="/usr/local/bin/reboot-to-windows"
EXTENSION_DIR="/home/$REAL_USER/.local/share/gnome-shell/extensions/reboot-to-windows@lagunamanuel.github.com"

# 1. Disable the extension
sudo -u "$REAL_USER" gnome-extensions disable "reboot-to-windows@lagunamanuel.github.com" 2>/dev/null || true

# 2. Remove extension files
if [ -d "$EXTENSION_DIR" ]; then
    rm -rf "$EXTENSION_DIR"
    echo "Removed extension files."
fi

# 3. Remove sudoers rule
if [ -f "$RULE_FILE" ]; then
    rm -f "$RULE_FILE"
    echo "Removed sudoers rule."
fi

# 4. Remove wrapper script
if [ -f "$WRAPPER_BIN" ]; then
    rm -f "$WRAPPER_BIN"
    echo "Removed wrapper script."
fi

echo "Uninstallation complete. Log out and back in to apply changes."