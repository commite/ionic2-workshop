# Loftsmart App (ionic app)

Loftsmart mobile application.

## Setup environment:

Install dependencies:

  * For linux:

    $ curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
    $ sudo apt-get -y install nodejs
    $ sudo ln -s /usr/bin/nodejs /usr/sbin/node

  * For MacOS: Download the pkg file from https://nodejs.org/en/download/

Install gulp:

    $ sudo npm install -g gulp

Install ionic 2 (See http://ionicframework.com/docs/v2/getting-started/installation/):

    $ sudo npm install -g ionic

Install/upgrade Cordova:

    $ sudo npm install -g cordova

Install all the npm dependences:

    $ npm install

Install the Android SDK

Link Android SDK executables to the user PATH:

* For Linux:

    $ export PATH=$PATH:$HOME/Android/Sdk/platform-tools >> $HOME/.bash_profile

* For MacOS:

    $ export PATH=$PATH:$HOME/Library/Android/sdk/platform-tools >> $HOME/.bash_profile

Enable the USB debugging in the Android device

## Add the android platform

    $ ionic platform add android

## Add the crosswalk browser (optional, do not do it on Mac OS)

    $ ionic plugin add cordova-plugin-crosswalk-webview

## Add the Cordova whitelist plugin

    $ cordova plugin add https://github.com/apache/cordova-plugin-whitelist.git

## Run app in an Android device:

Connect an Android device in the USB

Run this command:

    (Linux)
    $ export ANDROID_HOME=~/Android/Sdk/

    (MacOS)
    $ export ANDROID_HOME=~/Library/Android/Sdk/

    $ ionic run android

If the device is not detected (after enable USB debugging), try to restart adb:

    $ adb kill-server
    $ adb start-server

To list the devices detected:

    $ adb devices
    List of devices attached
    ZH8005ND10  device

To log the device:

    $ adb logcat


## Testing the App in a Chromium browser

Run the ionic http server:

    $ ionic serve

Open the chromium-browser disabling web security to be able to access the backend:

    $ chromium-browser --disable-web-security


## Build the APK

    $ ionic build android

The apk files will be in platforms/android/build/outputs/apk directory.
