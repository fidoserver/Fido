# About

Fido is a program that will monitor temperatures on Temper1 USB sensors and send text messages to user defined phone number, temperature max, and temperature min.  It broadcasts a Web UI on the LAN it's connected to where the device can be configured.  The UI offers additional settings for joining Wifi networks, configuring the URL of the device on the LAN, and setting the GPS location of the device.

https://github.com/rjsteinert/Fido


# Install

```
npm install -g forever;
cd /root;
git clone https://github.com/rjsteinert/Fido.git; 
mkdir /srv/tmp
echo "tmpfs /srv/tmp tmpfs rw,nosuid,noexec,relatime,size=1024k,mode=755 0 0" >> /etc/fstab;
sudo ln -s /usr/local/bin/node /usr/bin/node;
cp /root/Fido/util/init.d/fido /etc/init.d/;
update-rc.d fido defaults;
cd /root/Fido;
npm install;
cp /root/Fido/util/settings.default.json /root/Fido/settings.json
cp /root/Fido/util/config.default.json /root/Fido/config.json
reboot;
```

# Credits and License

Copyright (C) 2014 Stefan Unterhauser and R.J. Steinert

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

Contact Info : stefan@unterhauser.name, rj@rjsteinert.com
Source Code: http://github.com/rjsteinert/Fido

