import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';
import GLib from 'gi://GLib';

export default class RebootToWindowsExtension extends Extension {
    enable() {
        console.log('Enabling Reboot to Windows (Submenu Integration)');

        // 1. Create the standard menu item
        this._item = new PopupMenu.PopupMenuItem('Reboot to Windows');
        
        // 2. Attach the reboot logic
        this._item.connect('activate', () => {
            console.log('Executing reboot sequence to Windows...');
            try {
                const command = 'sh -c "sudo /usr/local/bin/reboot-to-windows"';
                GLib.spawn_command_line_async(command);
            } catch (e) {
                console.error('Failed to execute reboot command:', e);
            }
        });

        // 3. Locate the "Power" native menu using Looking Glass path
        const systemIndicator = Main.panel.statusArea.quickSettings._system;
        
        if (systemIndicator && systemIndicator._systemItem && systemIndicator._systemItem.menu) {
            // Inject our button into the native sub-menu
            systemIndicator._systemItem.menu.addMenuItem(this._item,3);
            console.log('Successfully injected button into native Power menu.');
        } else {
            console.error('Could not locate the native GNOME Power menu using the new path.');
        }
    }

    disable() {
        console.log('Disabling Reboot to Windows');
        if (this._item) {
            this._item.destroy();
            this._item = null;
        }
    }
}