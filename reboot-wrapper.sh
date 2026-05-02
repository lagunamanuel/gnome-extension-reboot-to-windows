#!/bin/bash

# Extract the dynamically assigned boot number for Windows Boot Manager
WIN_NUM=$(efibootmgr | grep "Windows Boot Manager" |head -1| cut -c 5-8)

# Error handling: check if the variable is empty (-z) to prevent breaking the boot
if [ -z "$WIN_NUM" ]; then
    echo "Error: 'Windows Boot Manager' not found in efibootmgr."
    exit 1
fi

# Execute the reboot sequence using the dynamically found number
/usr/sbin/efibootmgr -n "$WIN_NUM"
systemctl reboot