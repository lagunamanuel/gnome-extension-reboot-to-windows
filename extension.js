import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

export default class RebootToWindowsExtension extends Extension {
    // Runs when the user enables the extension
    enable() {
        console.log('Reboot to Windows extension enabled');
    }

    // Runs when the extension is disabled (cleanup)
    disable() {
        console.log('Reboot to Windows extension disabled');
    }
}
