import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';
import St from 'gi://St';
import GLib from 'gi://GLib';

export default class RebootToWindowsExtension extends Extension {
    enable() {
        console.log('Enabling Reboot to Windows MVP');

        // 1. Create a top panel button
        this._indicator = new PanelMenu.Button(0.0, this.metadata.name, false);

        // 2. Add a standard system icon (the reboot symbol)
        const icon = new St.Icon({
            icon_name: 'system-reboot-symbolic',
            style_class: 'system-status-icon',
        });
        this._indicator.add_child(icon);

        // 3. Create the drop-down menu item
        const item = new PopupMenu.PopupMenuItem('Reboot to Windows Now');
        
        // 4. The core logic: What happens when clicked
        item.connect('activate', () => {
            console.log('Executing reboot sequence...');
            try {
                // Using GLib to launch our sudoers-approved command and reboot
                const command = 'sh -c "sudo /usr/sbin/efibootmgr -n 0003 && systemctl reboot"';
                GLib.spawn_command_line_async(command);
            } catch (e) {
                console.error('Failed to execute reboot command:', e);
            }
        });

        this._indicator.menu.addMenuItem(item);

        // 5. Inject the whole indicator into the right side of the top panel
        Main.panel.addToStatusArea(this.uuid, this._indicator, 1, 'right');
    }

    disable() {
        console.log('Disabling Reboot to Windows MVP');
        if (this._indicator) {
            this._indicator.destroy();
            this._indicator = null;
        }
    }
}