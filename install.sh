#!/bin/bash

# ==============================================================================
# Reboot to Windows (GNOME Extension) - Installer
# https://github.com/lagunamanuel/gnome-extension-reboot-to-windows
# ==============================================================================

set -e

EXTENSION_UUID="reboot-to-windows@lagunamanuel.github.com"
EXTENSION_DIR="$HOME/.local/share/gnome-shell/extensions/$EXTENSION_UUID"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# --- Colors ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo ""
echo -e "${BLUE}╔══════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     Reboot to Windows — Installer        ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════╝${NC}"
echo ""

# --- Pre-flight checks ---

# Must NOT run as root (extension install is per-user)
if [ "$EUID" -eq 0 ]; then
    echo -e "${RED}✗ Error: Do not run this script as root.${NC}"
    echo "  Run it as your normal user: bash install.sh"
    exit 1
fi

# Check efibootmgr is installed
if ! command -v efibootmgr &> /dev/null; then
    echo -e "${RED}✗ Error: efibootmgr is not installed.${NC}"
    echo ""
    echo "  Install it with:"
    echo "    Fedora/RHEL:    sudo dnf install efibootmgr"
    echo "    Ubuntu/Debian:  sudo apt install efibootmgr"
    exit 1
fi

# Check Windows Boot Manager is actually detectable
if ! efibootmgr | grep -q "Windows Boot Manager"; then
    echo -e "${YELLOW}⚠ Warning: 'Windows Boot Manager' was not found in efibootmgr output.${NC}"
    echo "  The extension will be installed but may not work correctly."
    echo ""
    read -rp "  Continue anyway? [y/N] " response
    echo ""
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "Installation cancelled."
        exit 0
    fi
fi

# --- Step 1: System-level setup ---
echo -e "${GREEN}[1/3] Setting up system components (requires sudo)...${NC}"
sudo bash "$SCRIPT_DIR/setup.sh"
echo ""

# --- Step 2: Install extension files ---
echo -e "${GREEN}[2/3] Installing extension files...${NC}"
mkdir -p "$EXTENSION_DIR"
cp "$SCRIPT_DIR/extension.js"  "$EXTENSION_DIR/"
cp "$SCRIPT_DIR/metadata.json" "$EXTENSION_DIR/"
echo "  Files copied to: $EXTENSION_DIR"
echo ""

# --- Step 3: Enable the extension ---
echo -e "${GREEN}[3/3] Enabling extension...${NC}"
# gnome-extensions enable may fail on Wayland before re-login, so we allow it
gnome-extensions enable "$EXTENSION_UUID" 2>/dev/null && \
    echo "  Extension enabled successfully." || \
    echo -e "  ${YELLOW}Could not enable automatically — will activate after re-login.${NC}"
echo ""

# --- Done ---
echo -e "${GREEN}✓ Installation complete!${NC}"
echo ""
echo -e "${YELLOW}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${YELLOW}║  ACTION REQUIRED: Log out and log back in to activate    ║${NC}"
echo -e "${YELLOW}║  the extension. This is required on Wayland.             ║${NC}"
echo -e "${YELLOW}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""
echo "  After re-login, verify with:"
echo "    gnome-extensions list --enabled | grep reboot"
echo ""
