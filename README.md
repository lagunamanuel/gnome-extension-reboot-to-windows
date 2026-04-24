# Reboot to Windows (GNOME Extension)

A lightweight GNOME Shell extension that adds a quick panel indicator to reboot directly into Windows on a dual-boot system. Built for GNOME 45+ (Wayland/X11).

## 🚀 Features
* **One-Click Reboot:** Adds a dedicated system indicator to the top panel.
* **Seamless Integration:** Uses GNOME's native `GLib` library to execute system commands asynchronously without freezing the UI.
* **Security First:** Runs entirely in user-space. It uses a strictly scoped `sudoers` rule to grant passwordless execution **only** for the exact `efibootmgr` command, adhering to the Principle of Least Privilege.

## 🛠️ Prerequisites
* A dual-boot system with Linux (Fedora/Ubuntu/etc.) and Windows using UEFI.
* `efibootmgr` installed on your system.

## ⚙️ Installation

### 1. System Configuration
Before installing the extension, you must allow your user to execute the specific boot command.
Run the provided setup script to securely configure the `sudoers.d` rule:

```bash
chmod +x setup.sh
sudo ./setup.sh
```

### 2. Extension Installation
Copy the extension files to your local GNOME extensions directory:

```bash
mkdir -p ~/.local/share/gnome-shell/extensions/reboot-to-windows@lagunamanuel.github.com
cp extension.js metadata.json ~/.local/share/gnome-shell/extensions/reboot-to-windows@lagunamanuel.github.com/
```

### 3. Enable the Extension
If you are on **Wayland**, you must **log out and log back in** for GNOME to detect the new extension files. 
Then, enable it via terminal:

```bash
gnome-extensions enable reboot-to-windows@lagunamanuel.github.com
```
Alternatively, you can enable it using the "Extensions" GUI app.
If It's not working, try logging out and logging back in another time

## 📄 License
This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.