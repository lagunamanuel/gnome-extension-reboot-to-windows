# Reboot to Windows (GNOME Extension)

A lightweight GNOME Shell extension that adds a native option to reboot directly
into Windows on a dual-boot system. Built for GNOME 45–50 (Wayland).

## 🚀 Features

- **Seamless UI Integration:** Injects a "Reboot to Windows" option directly into
  the native GNOME Power submenu.
- **Confirmation Dialog:** Shows a 60-second countdown before rebooting, with the
  option to cancel or reboot immediately.
- **Dynamic Boot Detection:** Automatically parses `efibootmgr` to find the correct
  Windows Boot Manager entry — no hardcoded boot numbers.
- **Smart Visibility:** The button only appears if a Windows Boot Manager entry is
  actually detected on the system.
- **Security First:** Uses a strictly scoped `sudoers.d` rule following the
  Principle of Least Privilege.

## 🔐 Security Design

This extension uses a `sudoers.d` rule instead of `pkexec` intentionally.
A strictly scoped rule grants passwordless execution **only** for the reboot
wrapper binary at `/usr/local/bin/reboot-to-windows`, with `chmod 440` applied
to the rule file as required by sudo.

This avoids the overhead of PolicyKit while maintaining a minimal and auditable
attack surface. The wrapper itself validates the efibootmgr output before
executing anything, preventing execution if no Windows entry is found.

## 🛠️ Prerequisites

- A dual-boot system with Linux (Fedora/Ubuntu/etc.) and Windows using UEFI.
- `efibootmgr` installed on your system.

## ⚙️ Installation

Download the latest release and run:

```bash
bash install.sh
```

## 🗑️ Uninstallation

```bash
sudo ./uninstall.sh
```

## 📄 License

This project is licensed under the GPL-3.0 License — see the [LICENSE](LICENSE)
file for details.