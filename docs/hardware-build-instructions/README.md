# Fido on Raspberry Pi
**Fido on Raspberry Pi Development Team**: [R.J. Steinert](http://farmhack.net/users/rjsteinert-0), [Dogi Unterhauser]()

More documentation and tools to make this easy coming this summer.  If you have some command line skills then go for it, but if not then subscribe to changes on this Wiki and the Fido forum for updates.  Also, check out R.J. Steinert's [forum post all about this new model of Fido (includes a video)](http://farmhack.net/forums/checkout-video-new-raspberry-pi-based-fido-its-plug-and-play-temperature-alarm-sends-text).

## Setup

### Step 1- Get the hardware

|                                     Item                                 | Cost  |
| ------------------------------------------------------------------------ | ----- |
| [Raspberry Pi](http://www.mcmelectronics.com/product/83-14421)           | $35   |
| [Class 10 8GB SD Card](http://bit.ly/1t9vkIh)                            | $7    |
| [Micro USB male to USB male cord](http://bit.ly/1w2MxHB)                 | $1    |
| [USB Power Supply](http://www.mcmelectronics.com/product/58-16865)       | $4    |
| [USB Temper1 Sensor](http://bit.ly/1gtnt87)                              | $16.50|
| [TP-LINK 150Mbps Wireless N USB Adapter](http://bit.ly/S6oac7)           | $15   |
| ------------------------------------------------------------------------ | ----- |
| Total:                                                                   | $78.50|

### Step 2 - Install the software

***This part currently requires some command line skills. It will MUCH easier by the end of the summer***. We have a Raspberry Pi Disk Image coming soon that will make it easy to just copy it to the SD Card (hard drive) of the Raspberry Pi. Until then we have the [source code](https://github.com/rjsteinert/Fido) here that you can use to build your own image.  If you need help feel free to ask us!

### Step 3 - Assemble the hardware

Check out the picture above. The USB items go in the USB ports, the SD Card goes in the SD Card slot.

### Step 4 - Configure your Raspberry Pi based Fido

- Plug the Fido directly into your router using an Ethernet cord. 
- Plug in the power cord into your Raspberry Pi.
- On a separate computer or smart phone connected to your router, go to [http://raspberrypi.local/](http://raspberrypi.local/).  Note that URL only works for computers with Linux, Mac OS, or iPhones.  If you have a Windows computer you can install the following driver and then it will work -> http://support.apple.com/kb/dl999
- Click on the gear icon in the top left of the web app and configure the settings to connect to your WiFi. Click save.
- Unplug the Ethernet and power cable from the Fido.
- Connect the power cable to the Fido.
- Reload the http://raspberrypi.local page on your web browser and you'll see it is now connected!
- Follow closely on the rest of the settings to get text messages for temperature alerts configured.  When that looks ready try it out by holding the thermometer in your hand to trigger an alert.
- Deploy! We'll be filling out the WiFi farm tool on Farm Hack over the summer to give you some advice on how to get WiFi to those tricky spots on your farm. You can also use a [cheap android phone broadcasting it's own WiFI](http://bit.ly/SAtEN5) along with a pay as you go plan from T-Mobile. T-Mobile rocks because your credit lasts for 3-months as opposed to the usual 30 days that TracFone gives you.

