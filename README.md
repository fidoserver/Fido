
# Install


## install dependency of Hive for data logging 

git clone Hive to /root/Hive
Follow directions in /root/Hive/README.md


## install of Fido 

```
npm install -g forever;
cd /root;
git clone https://github.com/rjsteinert/Fido.git; 
mkdir /srv/tmp
echo "tmpfs /srv/tmp tmpfs rw,nosuid,noexec,relatime,size=1024k,mode=755 0 0" >> /etc/fstab;
sudo ln -s /usr/local/bin/node /usr/bin/node;
cp /root/Fido/util/init.d/node /etc/init.d/node;
cd /root/Fido;
npm install;
cp /root/Fido/util/settings.default.json /root/Fido/settings.json
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

