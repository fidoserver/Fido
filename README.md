


# Install


## install dependency of Hive for data logging 

git clone Hive to /root/Hive
Follow directions in /root/Hive/README.md


## install of Fido 

```
npm install -g forever;
cd /root;
git clone https://github.com/rjsteinert/Fido.git; 
echo "tmpfs /srv/tmp tmpfs rw,nosuid,noexec,relatime,size=1024k,mode=755 0 0" >> /etc/fstab;
sudo ln -s /usr/local/bin/node /usr/bin/node;
cp /root/Fido/util/init.d/node /etc/init.d/node;
cd /root/Fido;
npm install;
/root/Hive/start;
node /root/Fido/Bee/birth.js;
reboot;
```




