cp /home/pi/Pimometer/lib/wpa_supplicant.conf.template /etc/wpa_supplicant/wpa_supplicant.conf; wpa_passphrase "$1" "$2" >> /etc/wpa_supplicant/wpa_supplicant.conf; sync;
