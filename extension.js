import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

export default class RebootToWindowsExtension extends Extension {
    // Se ejecuta cuando el usuario activa la extensión
    enable() {
        console.log('Extensión Reboot to Windows activada');
    }

    // Se ejecuta cuando se desactiva (limpieza)
    disable() {
        console.log('Extensión Reboot to Windows desactivada');
    }
}
