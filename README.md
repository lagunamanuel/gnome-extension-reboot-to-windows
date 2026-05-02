# Reboot to Windows (GNOME Extension)

A lightweight GNOME Shell extension that adds a native option to reboot directly into Windows on a dual-boot system. Built for GNOME 45+ (Wayland/X11).

## 🚀 Features
* **Seamless UI Integration:** Injects a "Reboot to Windows" option directly into the native GNOME Power submenu (between Restart and Power Off).
* **Dynamic Boot Detection:** Automatically parses `efibootmgr` to find the correct Windows Boot Manager entry, eliminating the need for hardcoded boot numbers.
* **Security First:** Uses a secure wrapper script located in `/usr/local/bin` with a strictly scoped `sudoers.d` rule. This grants passwordless execution **only** for this specific wrapper script, adhering to the Principle of Least Privilege.

## 🛠️ Prerequisites
* A dual-boot system with Linux (Fedora/Ubuntu/etc.) and Windows using UEFI.
* `efibootmgr` installed on your system.

## ⚙️ Installation

Download the latest release and run:

```bash
bash install.sh
```

## 🗑️ Uninstallation

To completely remove the extension and its system-level permissions, follow these steps:

1. Remove the secure wrapper and `sudoers` rule:

```bash
sudo ./uninstall.sh
```
2. Remove the GNOME extension files:
```bash
rm -rf ~/.local/share/gnome-shell/extensions/reboot-to-windows@lagunamanuel.github.com/
```

## 📄 License
This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.