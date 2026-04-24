// extension.js (ESM format for GNOME 45+)
import { Extension, gettext as _ } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';
import St from 'gi://St';
import Gio from 'gi://Gio';

export default class RebootToWindowsExtension extends Extension {
    // Runs when the extension is enabled
    enable() {
        console.log('Reboot to Windows UI extension enabled');

        // 1. Define our custom menu item (the actual visual element)
        // St.Label ensures it matches the styling of "Restart" or "Power Off"
        this._item = new PopupMenu.PopupMenuItem(_('Reboot to Windows'));
        
        // 2. Placeholder for action (we will implement the actual reboot later)
        this._item.connect('activate', () => {
            console.log('"Reboot to Windows" button clicked (No action defined yet)');
            // Keep the menu expanded to see our button
            // Main.panel.statusArea.quickSettings.menu.close(); // Uncomment later when logic is working
        });

        // 3. Insert our item into the native Power menu
        // Main.panel.statusArea.quickSettings._system holds the Power/Session menus.
        const systemMenu = Main.panel.statusArea.quickSettings._system;

        // In GNOME 45+, we add our new item to the end of the existing power sub-menu list.
        if (systemMenu && systemMenu.menu) {
            systemMenu.menu.addMenuItem(this._item);
        } else {
            console.error('Could not locate the native GNOME Power menu.');
        }
    }

    // Runs when the extension is disabled (essential for clean removal)
    disable() {
        console.log('Reboot to Windows UI extension disabled');
        if (this._item) {
            this._item.destroy();
            this._item = null;
        }
    }
}