---
layout: post
title: Setting up android development environment on Ubuntu
date: '2015-11-22 12:08:00 am'
categories: Android Java Linux Ubuntu
author: kady
cover: android-studio-logo.png
reading-time: 10
disqus: true
---

This is a simple walk-through that will guide you to a convenient and easy steps to setup your Android development environment on your Ubuntu machine.


### Requirements :

- • Minimum of 2 Gb of RAM

- • JDK 1.7+ you can install JDK 1.8 with `apt` using [webupd8's repository][jdk-8-download]    

  > Note that android studio uses **JDK 1.7**, using a higher version will work but you will be limited to the features that are in 1.7 only in your development

- • Install build essentials to manage c,c++ dependencies to install it run    
    `sudo apt-get update && sudo apt-get install build-essential`

<br>
1.
Now you are ready to start setting up your development environment, first we need to start with Downloading Android Studio, go and [download][android-studio-download] the latest version .

After Downloading the archive you need to extract it somewhere, it's up to you where to extract the folder, but it's a [good practice][where-to-install-software] to install user programs in `/opt/` or `/usr/local` on Linux machines, for me I choose `/opt/` to move the extracted directory to

{% highlight shell %}
$ cd /your/installation/path
$ sudo mv android-studio /opt/
{% endhighlight %}

<br>
2. If you are running a 64-bit machine Install `lib32ncurses5-dev` and `lib32stdc++6` packages as it's required for building your apps, you can install it by running the following commands :

{% highlight shell %}
$ sudo apt-get install lib32ncurses5-dev
$ sudo apt-get install lib32stdc++6
$ sudo apt-get install lib32z1
{% endhighlight %}

<br>
3. Navigate to location that you have the extracted directory and run `bin/studio.sh` executable to run android studio
{% highlight shell %}
$ cd path/of/extracted/android-studio/bin
$ ./studio.sh
{% endhighlight %}

<br>
4. For instance you will need to install at least one of the system images to be able to run your virtual device (If you are going to use the emulator), If you don't have a specific requirements you can install the latest **stable** version, you can also install an old version (Like Android 4.0.3) to test your backward compatibility.

![system-images]({{site.basebtwurl}}/assets/images/sdk-platforms.png){: .post-image}
*API images*

> Tip: If you are going to use the emulator you are advised to enable hardware acceleration which will be shown later, if your device supports hardware acceleration please install the intel x86 images after enabling `show packages details` ![x86-images]({{site.basebtwurl}}/assets/images/x86-image.png){: .post-image}

<br>
5. Choose the sdk-tools tab and install the following packages in the SDK tools, those are important for building your app and supporting backward compatibility with support classes
![sdk-tools]({{site.basebtwurl}}/assets/images/sdk-tools.png){: .post-image}

<br>
6. Now if you are managing to work with the emulator and your machine is capable of running hardware acceleration you should go for it, it will increase the performance of your emulated device and you will be **happy!** , [here][haxm] you can find how to manage kvm on Linux in order to enable hardware acceleration, in general you can check whether your machine is supporting hardware acceleration using this commands

{% highlight shell %}
$ sudo apt-get install cpu-checker
$ kvm-ok
{%endhighlight%}

You should get a response like :
{% highlight console %}
$ INFO: /dev/kvm exists    

$ KVM acceleration can be used
{%endhighlight%}

If your machine supports acceleration you can follow [this guideline][kvm-installation] to install KVM on your machine

<br>
7. Create a new project now, use the default settings, let gradle download it's dependencies and build the project _this could take a while in the first run_ create the AVD or connect your device in debugging mode and try to run the app on your machine (If you are enabling hardware acceleration please check [this][haxm] in order to create your AVD correctly )

<br>
8. You can now create a desktop entry in order to run Android studio from your launcher directly later without the need to execute studio.sh again
![desktop-entry]({{site.basebtwurl}}/assets/images/desktop-entry.png){: .post-image}
*Desktop entry creation*

That's it, you have completed setting up the basics for your android development journey, happy coding and hacking

[jdk-8-download]: http://www.webupd8.org/2012/09/install-oracle-java-8-in-ubuntu-via-ppa.html
[android-studio-download]:http://developer.android.com/sdk/index.html
[where-to-install-software]:http://askubuntu.com/questions/1148/what-is-the-best-place-to-install-user-apps
[haxm]:http://developer.android.com/tools/devices/emulator.html#accel-vm
[kvm-installation]:https://help.ubuntu.com/community/KVM/Installation
