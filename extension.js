import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';
import * as ModalDialog from 'resource:///org/gnome/shell/ui/modalDialog.js';
import GLib from 'gi://GLib';
import Clutter from 'gi://Clutter';
import St from 'gi://St';

const COUNTDOWN_SECONDS = 60;

export default class RebootToWindowsExtension extends Extension {
    enable() {
        // Only inject the button if Windows Boot Manager is actually detectable
        if (!this._windowsDetected()) {
            console.log('[RebootToWindows] Windows Boot Manager not found. Button will not be shown.');
            return;
        }

        this._item = new PopupMenu.PopupMenuItem('Reboot to Windows');
        this._item.connect('activate', () => this._showConfirmDialog());

        const systemIndicator = Main.panel.statusArea.quickSettings?._system;
        if (systemIndicator?._systemItem?.menu) {
            systemIndicator._systemItem.menu.addMenuItem(this._item, 3);
        } else {
            console.error('[RebootToWindows] Could not locate the native GNOME Power menu.');
        }
    }

    _windowsDetected() {
        try {
            const [ok, stdout] = GLib.spawn_command_line_sync('efibootmgr');
            if (!ok) return false;

            const output = new TextDecoder().decode(stdout);
            return output.includes('Windows Boot Manager');
        } catch (e) {
            console.error('[RebootToWindows] Failed to run efibootmgr:', e);
            return false;
        }
    }

    _showConfirmDialog() {
        let countdown = COUNTDOWN_SECONDS;

        const dialog = new ModalDialog.ModalDialog({});

        const title = new St.Label({
            text: 'Reboot to Windows',
            style: 'font-size: 1.2em; font-weight: bold; margin-bottom: 8px;',
        });

        const countdownLabel = new St.Label({
            text: `The system will restart in ${countdown} seconds.`,
        });

        dialog.contentLayout.add_child(title);
        dialog.contentLayout.add_child(countdownLabel);

        dialog.setButtons([
            {
                label: 'Cancel',
                key: Clutter.KEY_Escape,
                action: () => {
                    this._clearTimer();
                    dialog.close();
                },
            },
            {
                label: 'Reboot Now',
                action: () => {
                    this._clearTimer();
                    dialog.close();
                    this._executeReboot();
                },
            },
        ]);

        this._timerId = GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, 1, () => {
            countdown--;
            countdownLabel.set_text(`The system will restart in ${countdown} seconds.`);

            if (countdown <= 0) {
                dialog.close();
                this._executeReboot();
                this._timerId = null;
                return GLib.SOURCE_REMOVE;
            }

            return GLib.SOURCE_CONTINUE;
        });

        dialog.open();
    }

    _executeReboot() {
        try {
            GLib.spawn_command_line_async('sudo /usr/local/bin/reboot-to-windows');
        } catch (e) {
            console.error('[RebootToWindows] Failed to execute reboot command:', e);
        }
    }

    _clearTimer() {
        if (this._timerId) {
            GLib.source_remove(this._timerId);
            this._timerId = null;
        }
    }

    disable() {
        this._clearTimer();
        if (this._item) {
            this._item.destroy();
            this._item = null;
        }
    }
}