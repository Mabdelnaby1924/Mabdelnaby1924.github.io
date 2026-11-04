---
title: "Initialization Systems in Linux"

description: "A practical guide to Linux service management, covering initialization systems, SysVinit, systemd, service units, target units, runlevels, dependencies, and managing services throughout their lifecycle."

date: "2026-10-25"  
tags:
  - Linux
  - Linux Administration
  - System Administration
  - RHCSA
  - systemd
  - SysVinit
  - Service Management
  - Daemons

thumbnail: "/images/articles/Init_systems/thumbnail.png"

readingTime: 15min
category: "Linux Administration"
topics:
  - Initialization Systems
  - Init and systemd
  - Daemons and Services
  - SysVinit Runlevels
  - systemd Units
  - Service Units
  - Target Units
  - Unit Dependencies
  - Service Status Monitoring
  - Starting and Stopping Services
  - Restarting and Reloading Services
  - Enabling and Disabling Services
  - Masking and Unmasking Services
  - Default Runlevel and Target
  - Creating Custom Services
  - SysVinit Service Scripts
  - Custom systemd Unit Files
source:
  book: "Linux Bible"
  author: "Christopher Negus"
  edition: "10th"
  chapter: 15
  chapterTitle: "Starting and Stopping Services"
---



The primary job of a Linux server system is to offer services to local or remote users. A server can provide access to web pages, files, database information, streaming music, or other types of content. Name servers can provide access to lists of host computer or usernames. Hundreds of these and other types of services can be configured on your Linux systems.

Ongoing services offered by a Linux system, such as access to a printer service or login service, are typically implemented by what is referred to as a daemon process. Most Linux systems have a method of managing each daemon process as a service using one of several popular initialization systems (also referred to as init systems).

Advantages of using init systems include the ability to do the following:

- ##### Identify runlevels

  Put together sets of services in what are referred to as runlevels or targets.

- ##### Establish dependencies

  Set service dependencies so, for example, a service that requires network interfaces won’t start until all network startup services have started successfully.

- ##### Set the default runlevel

  Select which runlevel or target starts up when the system boots (a default runlevel).

- ##### Manage services

  Run commands that tell individual services to start, stop, pause, restart, or even reload configuration files.

## Understanding the Initialization Daemon (init or systemd)  

In order to understand service management, you need to understand the initialization daemon. The initialization daemon can be thought of as the “mother of all processes.” This daemon is the first process to be started by the kernel on the Linux server. For Linux distributions that use SysVinit, the init daemon is literally named init. For systemd, the init daemon is named systemd.

The Linux kernel has a process ID (PID) of 0. Thus, the initialization process (init or systemd) daemon has a parent process ID (PPID) of 0, and a PID of 1. Once started, init is responsible for spawning (launching) processes configured to be started at the server’s boot time, such as the login shell (getty or mingetty process). It is also responsible for managing services.

The init daemon is not part of the Linux kernel. Therefore, it can come in different flavors, and Linux distributions can choose which flavor to use. Another classic init daemon was based on Berkeley UNIX, also called BSD. Therefore, the two original Linux init daemons were BSD init and SysVinit.

In order to manage your services properly, you need to know which initialization daemon your server has. Figuring that out can be a little tricky. The initialization process running on a SysVinit or Upstart is named init. For the first systemd systems, it was also called init but is now named systemd.

```bash
ps -e | head 
PID TTY TIME      CMD 
1    ?  00:04:36  systemd 
2    ?  00:00:03  kthreadd 
3    ?  00:00:15  ksoftirqd/0
```

### Understanding the classic init daemons  

SysVinit daemon, the BSD init daemon’s configuration information file:`/etc/inittab`

![runlevels](/images/articles/Init_systems/runlevels.png)

> [! CAUTION]
> The only runlevels that should be used in the `/etc/inittab` file are 2 through 5. The other runlevels could cause problems.
> For example, if you put runlevel 6 in the `/etc/inittab` file as the default,
> when the server reboots, it would go into a loop and continue to reboot over and over again

runelvels can also be called directly using the init daemon itself.

```bash
init 0      # System going down for system halt NOW!    

# you can use the telinit command, which is functionally the same as init.
telinit 6

# result
INIT: Sending processes the TERM signal
Shutting down smartd:                         [ OK ]
Shutting down Avahi daemon:                   [ OK ]
Stopping dhcdbd:                              [ OK ]
Stopping HAL daemon:                          [ OK ]
...
Starting killall:
Sending all processes the TERM signal...      [ OK ]
Sending all processes the KILL signal...      [ OK ]
...
Unmounting filesystems                        [ OK ]
Please stand by while rebooting the system
```

To see your Linux server’s current runlevel,  

- The first item displayed is the server’s previous runlevel.
- The second item displayed shows the server’s current runlevel,
which in this example is

```bash
runlevel 
# result 
5 3
```

On a freshly booted Linux server, The N stands for “Nonexistent” and indicates that the server was freshly booted to the current runlevel.

```bash
runlevel
# result
N 5
```

##### How does the server know which services to stop and which ones to start when a particular runlevel is chosen?

### Understanding systemd initialization  

The systemd initialization daemon is the newer replacement for the SysVinit and the Upstart init daemons. This modern initialization daemon was introduced in Fedora 15 and RHEL 7, and it is still in use today. It is backward compatible with both SysVinit and Upstart. System initialization time is reduced by systemd because it can start services in a parallel manner

#### Learning systemd basics

With the SysVinit daemon, services are stopped and started based upon runlevels.
The systemd service is concerned with runlevels, but it implements them in a different way with what are called **target units**.

Although the main job of systemd is to start and stop services, it can manage other types of things referred to as **units**.

> A unit is a group consisting of a name, type, and configuration file, and it is focused on a particular service or action.

The two primary systemd units with which you need to be concerned for dealing with services are

- service units
- target units.

> A **service unit** is for managing daemons on your Linux server.
> A **target unit** is simply a group of other units.

```bash
systemctl list-units | grep .service

systemctl list-units | grep .target
```

The Linux system unit configuration files are located in these directories:

- `/lib/systemd/system`
- `/etc/systemd/system`  

```bash
systemctl list-unit-files --type=service

systemctl list-unit-files --type=service
```

Units Status:

- **enabled** status means that the unit is currently enabled.
- **disabled** status means that the unit is currently disabled.
- **static** It stands for “statically enabled,” and it means that the unit is enabled by default and cannot be disabled, even by root.

```bash
cat /lib/systemd/system/sshd.service

[Unit]
Description=OpenSSH server daemon
Documentation=man:sshd(8) man:sshd_config(5)
After=network.target sshd-keygen.target

[Service]
Type=notify
EnvironmentFile=-/etc/crypto-policies/back-ends/opensshserver.config
EnvironmentFile=-/etc/sysconfig/sshd
ExecStart=/usr/sbin/sshd -D $OPTIONS $CRYPTO_POLICY
ExecReload=/bin/kill -HUP $MAINPID
KillMode=process
Restart=on-failure
RestartSec=42s

[Install]
WantedBy=multi-user.target

[Install]
WantedBy=multi-user.target
```

this basic service unit configuration file has the following options:

- ##### Description

  A free-form description (comment line) of the service.

- ##### Documentation

  Lists man pages for the sshd daemon and configuration file.

- ##### After

  Configures ordering. In other words, it lists which units should be activated before this service is started.

- ##### Environment File

  The service’s configuration files.

- ##### ExecStart

  The command used to start this service.

- ##### ExecReload

  The command used to reload this service.

- ##### WantedBy

  The target unit to which this service belongs.

##### WANTS & REQUIRES

A target unit has both Wants and requirements, called Requires.

- A Wants means that all of the units listed are triggered to activate (start). If they fail or cannot be started, no problem—the target unit continues on its merry way.

```bash
systemctl show --property "Wants" multi-user.target \
 | fmt -10 | sed 's/Wants=//g' | sort
```

- A Requires means that all of the units listed are triggered to activate (start). If they fail or cannot be started, the entire unit (group of units) is deactivated

```bash
systemctl show --property "Requires" multi-user.target \
 | fmt -10 | sed 's/Requires=//g' | sort
```

> [!NOTE]
> For the Linux server using systemd, At boot, systemd activates the `default.target` unit. This unit is aliased either to `multi-user.target` or `graphical.target`.
Thus, depending upon the alias set, the services targeted by the target unit are started.

#### Learning systemd's backward compatibility to SysVinit  

The systemd daemon has maintained backward compatibility to the SysVinit daemon. This allows Linux distributions time to migrate slowly to systemd.

While runlevels are not truly part of systemd, the systemd infrastructure has been cre ated to provide compatibility with the concept of runlevels.

There are seven target unit configuration files specifically created for backward compatibility to SysVinit:

- runlevel0.target
- runlevel1.target
- runlevel2.target
- runlevel3.target
- runlevel4.target
- runlevel5.target
- runlevel6.target

there is a target unit configuration file for each of the seven classic SysVinit runlevels. These target unit configuration files are symbolically linked to target unit configuration files that most closely match the idea of the original runlevel.

```bash
ls -l /lib/systemd/system/runlevel*.target
lrwxrwxrwx 1 root root 15 Oct 12 10:36 /lib/systemd/system/runlevel0.target -> poweroff.target
lrwxrwxrwx 1 root root 13 Oct 12 10:36 /lib/systemd/system/runlevel1.target -> rescue.target
lrwxrwxrwx 1 root root 17 Oct 12 10:36 /lib/systemd/system/runlevel2.target -> multi-user.target
lrwxrwxrwx 1 root root 17 Oct 12 10:36 /lib/systemd/system/runlevel3.target -> multi-user.target
lrwxrwxrwx 1 root root 17 Oct 12 10:36 /lib/systemd/system/runlevel4.target -> multi-user.target
lrwxrwxrwx 1 root root 16 Oct 12 10:36 /lib/systemd/system/runlevel5.target -> graphical.target
lrwxrwxrwx 1 root root 13 Oct 12 10:36 /lib/systemd/system/runlevel6.target -> reboot.target
```

## Checking the Status of Services  

A **service** is a background function provided by a Linux system, such as SSH access, printing, or scheduled jobs.

As a Linux administrator, you should be able to answer three questions:

1. **Is the service configured to start automatically?**
2. **Is the service running right now?**
3. **How do I start, stop, restart, or reload it?**

Linux uses different service-management commands depending on the initialization system:

- **SysVinit:** `service`, `chkconfig`
- **systemd:** `systemctl`

#### Checking services for SysVinit systems  

Use `chkconfig` to list services and their configured states across runlevels.

```bash
chkconfig --list 

# result
ConsoleKit      0:off  1:off  2:off  3:on  4:on  5:on  6:off
crond           0:off  1:off  2:on   3:on  4:on   5:on  6:off
sshd            0:off  1:off  2:on   3:on  4:on   5:on  6:off
vncserver       0:off  1:off  2:off  3:off 4:off  5:off 6:off
```

**How to interpret it:**

- `on`: configured to start at that runlevel.
- `off`: not configured to start at that runlevel.
- Runlevels `0–6` represent different system operating states.

**inspect one service:**

```bash
chkconfig --list cups
```

#### Check Currently Running Services

Use `service --status-all` to request the status of all services.

```bash
service --status-all
```

To filter for running services and sort the results:

```bash
service --status-all | grep running... | sort

# result 
anacron (pid 2162) is running...
auditd (pid 1653) is running...
crond (pid 2118) is running...
cupsd (pid 1988) is running...
sshd (pid 2002) is running...
```

Check one service directly:

```bash
service cups status

# result
cupsd (pid 1988) is running...
```

#### systemd: List Services and Their Configuration States

 to inspect service unit files and their startup states.

```bash
systemctl list-unit-files --type=service
```

To hide services whose state is `disabled`:

```bash
systemctl list-unit-files --type=service | grep -v disabled
```

#### systemd: Check Whether a Service Is Running

```bash
systemctl status cups.service

# result
cups.service - CUPS Scheduler
Loaded: loaded (/lib/systemd/system/cups.service; enabled)
Active: active (running) since ...
Main PID: 874 (cupsd)
Tasks: 1
Memory: 3.1M
```

## Stopping and Starting Services  

### Starting and Stopping Services with SysVinit

The general syntax is:

```bash
service SERVICE_NAME ACTION
```

Common actions are `status`, `start`, `stop`, `restart`, and `reload`.

##### Stop a Service

```bash
service cups status
service cups stop
service cups status

# result
cupsd (pid 5857) is running...
Stopping cups: [ OK ]
cupsd is stopped
```

##### Start a Service

```bash
service cups start
service cups status

# result
Starting cups: [ OK ]
cupsd (pid 6860) is running...
```

##### Restart a Service

Restarting means stopping the service and starting it again.

```bash
service cups restart
service cups status

# result 
Stopping cups: [ OK ]
Starting cups: [ OK ]
cupsd (pid 7955) is running...
```

If the service is already stopped, the stop portion of the restart can fail while the start portion succeeds:

```bash
service cups stop
service cups restart

# result
Stopping cups: [ OK ]
Stopping cups: [FAILED]
Starting cups: [ OK ]

service cups status

# result 
cupsd (pid 8236) is running...
```

Example:

```text

```

The important point is that the service ended up running, even though the attempt to stop it again failed.

##### Reload a Service

Reloading asks a service to load its configuration again without stopping the service itself.

```bash
service cups status

service cups reload
# result
cupsd (pid 8236) is running...
Reloading cups: [ OK ]

service cups status
# result
cupsd (pid 8236) is running...
```

If the service is stopped, a reload may fail:

```bash
service cups status
# result 
cupsd is stopped

service cups reload
# result
Reloading cups: [FAILED]
```

### Starting and Stopping Services with systemd

The general syntax is:

```bash
systemctl ACTION SERVICE_NAME
```

For example:

```bash
systemctl status cups.service
```

##### Stop a Service

```bash
systemctl stop cups.service
systemctl status cups.service

# result
cups.service - CUPS Printing Service
    Loaded: loaded (/lib/systemd/system/cups.service; enabled)
    Active: inactive (dead) since Tue, 21 Apr 2020 04:43:4...
    Process: 1315 ExecStart=/usr/sbin/cupsd -f (code=exited, status=0/SUCCESS)
    CGroup: name=systemd:/system/cups.service
```

##### Start a Service

```bash
systemctl start cups.service
systemctl status cups.service
# result
cups.service - CUPS Printing Service
    Loaded: loaded (/lib/systemd/system/cups.service; enabled)
    Active: active (running) since Tue, 21 Apr 2020 04:43:5...
  Main PID: 17003 (cupsd)
    CGroup: name=systemd:/system/cups.service
           └  17003 /usr/sbin/cupsd -f
```

##### Restart a Service

```bash
systemctl restart cups.service
systemctl status cups.service
# result
cups.service - CUPS Printing Service
   Loaded: loaded (/lib/systemd/system/cups.service; enabled)
   Active: active (running) since Tue, 21 Apr 2020 04:45:2...
   Main PID: 17015 (cupsd)
   CGroup: name=systemd:/system/cups.service
          └  17015 /usr/sbin/cupsd -f

```

Restarting stops and starts the service again. If the service was inactive beforehand, `restart` starts it.

##### Conditional Restart

A conditional restart only restarts a service if it is currently running. Any service in an inactive state is not started.

```bash
systemctl status cups.service
# result
cups.service - CUPS Printing Service
  Loaded: loaded (/lib/systemd/system/cups.service; enabled)
  Active: inactive (dead) since Tue, 21 Apr 2020 06:03:32...
 Process: 17108 ExecStart=/usr/sbin/cupsd -f
 (code=exited, status=0/SUCCESS)
  CGroup: name=systemd:/system/cups.service


systemctl condrestart cups.service
systemctl status cups.service
# result
cups.service - CUPS Printing Service
  Loaded: loaded (/lib/systemd/system/cups.service; enabled)
  Active: inactive (dead) since Tue, 21 Apr 2020 06:03:32...
 Process: 17108 ExecStart=/usr/sbin/cupsd -f
 (code=exited, status=0/SUCCESS)
  CGroup: name=systemd:/system/cups.service
```

##### Reload a Service

Reloading a service is different from restarting a service. When you reload a service, the service itself is not stopped. Only the service’s configuration files are loaded again. Note that not all services are implemented to use the reload feature.

```bash
systemctl status sshd.service
# result
sshd.service - OpenSSH server daemon
   Loaded: loaded (/usr/lib/systemd/system/sshd.service; enabled)
   Active: active (running) since Wed 2019-09-18 17:32:27 EDT; 3 days ago
 Main PID: 1675 (sshd)
   CGroup: /system.slice/sshd.service
           └─1675 /usr/sbin/sshd -D

systemctl reload sshd.service
systemctl status sshd.service
# result
sshd.service - OpenSSH server daemon
   Loaded: loaded (/lib/systemd/system/sshd.service; enabled)
   Active: active (running) since Wed 2019-09-18 17:32:27 EDT; 3 days ago
  Process: 21770 ExecReload=/bin/kill -HUP $MAINPID (code=exited, status=0/SUCCESS)
      (code=exited, status=0/SUCCESSd)
  Main PID: 1675 (sshd)
  CGroup: /system.slice/sshd.service
           └─1675 /usr/sbin/sshd -D ...
```

- A successful reload leaves the service running. The output includes an `ExecReload` entry indicating that the reload operation was executed.
- Not every service supports reload.
- Reloading can be preferable on a busy server because it can avoid interrupting the service and aborting pending operations, as described in the chapter.

## Enabling Persistent Services

### What Is a Persistent Service?

A persistent service is configured to start automatically when the system boots.

There is an important difference between:

- **Starting a service:** runs it now.
- **Enabling a service:** configures it to start automatically.
- **Stopping a service:** stops it now.
- **Disabling a service:** removes its automatic startup configuration.

For example, a service can be `inactive (dead)` but `enabled`. It is stopped now, yet configured to start at boot.

### SysVinit: Enable a Service at Specific Runlevels

SysVinit uses `chkconfig` to configure the runlevels at which a service starts.

Check the current configuration:

```
# chkconfig --list cups
cups  0:off  1:off  2:off  3:off  4:off  5:off  6:off
```

Enable the service at runlevel 3:

```
# chkconfig --level 3 cups on
# chkconfig --list cups
cups  0:off  1:off  2:off  3:on  4:off  5:off  6:off

# ls /etc/rc.d/rc3.d/S*cups
/etc/rc.d/rc3.d/S56cups
```

The `S`-prefixed symbolic link indicates that the service is configured to start at that runlevel.

Enable it at runlevels 2, 3, 4, and 5:

```
# chkconfig --level 2345 cups on
# chkconfig --list cups
cups  0:off  1:off  2:on  3:on  4:on  5:on  6:off

# ls /etc/rc.d/rc?.d/S*cups
/etc/rc.d/rc2.d/S56cups
/etc/rc.d/rc3.d/S56cups
/etc/rc.d/rc4.d/S56cups
/etc/rc.d/rc5.d/S56cups
```

Disable it at runlevel 5:

```
# chkconfig --level 5 cups off
# chkconfig --list cups
cups  0:off  1:off  2:on  3:on  4:on  5:off  6:off

# ls /etc/rc.d/rc5.d/S*cups
ls: cannot access '/etc/rc.d/rc5.d/S*cups': No such file or directory
```

### systemd: Enable a Service at Boot

Use `systemctl enable` to configure automatic startup.

```
# systemctl status cups.service
cups.service - CUPS Printing Service
Loaded: loaded (/lib/systemd/system/cups.service; disabled)
Active: inactive (dead)

# systemctl enable cups.service
Created symlink /etc/systemd/system/printer.target.wants/cups.service
  → /usr/lib/systemd/system/cups.service.
Created symlink /etc/systemd/system/sockets.target.wants/cups.socket
  → /usr/lib/systemd/system/cups.socket.
Created symlink /etc/systemd/system/multi-user.target.wants/cups.path
  → /usr/lib/systemd/system/cups.path.

# systemctl status cups.service
cups.service - CUPS Printing Service
Loaded: loaded (/lib/systemd/system/cups.service; enabled)
Active: inactive (dead)
```

### systemd: Disable a Service

Use `systemctl disable` to remove its automatic startup configuration.

```
# systemctl disable cups.service
Removed '/etc/systemd/system/printer.target.wants/cups.service'
Removed '/etc/systemd/system/sockets.target.wants/cups.socket'
Removed '/etc/systemd/system/multi-user.target.wants/cups.path'

# systemctl status cups.service
cups.service - CUPS Printing Service
Loaded: loaded (...; disabled)
Active: active (running)
Main PID: 17172 (cupsd)
```

The service is still running even though it is now disabled.

### What Does `static` Mean?

Some systemd service units are marked `static`. They cannot be enabled in the usual way and are commonly activated through dependencies or other units.

```
# systemctl status dbus.service
dbus.service - D-Bus System Message Bus
Loaded: loaded (...; static)
Active: active (running)
Main PID: 707 (dbus-daemon)

# systemctl disable dbus.service
# systemctl status dbus.service
dbus.service - D-Bus System Message Bus
Loaded: loaded (...; static)
Active: active (running)
Main PID: 707 (dbus-daemon)
```

The `disable` operation does not change the unit's `static` state.

### `disable` vs `mask`

Disabling a service does not necessarily prevent another service from starting it as a dependency.

To prevent the service from being started through normal systemd activation:

```
# systemctl mask NetworkManager.service
ln -s '/dev/null' '/etc/systemd/system/NetworkManager.service'

# systemctl unmask NetworkManager.service
```

- `disable`: removes automatic startup links.
- `mask`: links the unit to `/dev/null`, preventing normal activation.
- `unmask`: removes the mask so the service can be used again.

**Use masking carefully:** a service may be required by networking or other system components.

## Configuring a Default Runlevel or Target Unit

### What Is a Default Runlevel or Target?

A persistent service is an individual service configured to start at boot.

A **default runlevel or target** determines a group of services and system functions activated during startup.

- **SysVinit:** uses runlevels.
- **systemd:** uses target units.

The source chapter provides these systemd target mappings:

|systemd target|Legacy runlevel equivalent|
|---|---|
|`multi-user.target`|`runlevel2.target`, `runlevel3.target`, `runlevel4.target`|
|`graphical.target`|`runlevel5.target`|

### SysVinit: Configure the Default Runlevel

In SysVinit, the default runlevel is configured in `/etc/inittab`.
Inspect the file:

```
# cat /etc/inittab

# inittab This file describes how the INIT process should
# set up the system in a certain run-level.
...
id:5:initdefault:
...
```

The line `id:5:initdefault:` indicates that the default runlevel is 5 in this example.
To change it, edit `/etc/inittab` with a text editor and modify the runlevel number.

For example, to use runlevel 3:

```
# vi /etc/inittab
# Set the default runlevel to 3:
id:3:initdefault:
```

The chapter identifies runlevels 2, 3, and 4 as alternatives to runlevel 5. It warns against setting the default to runlevel 0 or 6 because those runlevels halt or reboot the system.

### systemd: Understand `default.target`

systemd uses the `default.target` symbolic link to determine the target activated by default at boot.
Inspect the link:

```
# ls -l /etc/systemd/system/default.target
lrwxrwxrwx. 1 root root 36 Mar 13 17:27 /etc/systemd/system/default.target -> /lib/systemd/system/runlevel5.target

# ls -l /lib/systemd/system/runlevel5.target
lrwxrwxrwx. 1 root root 16 Mar 27 15:39 /lib/systemd/system/runlevel5.target -> graphical.target
```

In this example, `default.target` points to `runlevel5.target`, which in turn points to `graphical.target`.

Therefore, the effective default target is `graphical.target`.

### Check the Current Default Target

Use `systemctl get-default`:

```
# systemctl get-default
graphical.target
```

This indicates that the system is configured to boot into the graphical target.

### Change the Default Target

Use `systemctl set-default` to configure a different target.

The chapter demonstrates switching to the multi-user target through the legacy-compatible runlevel target name:

```
# systemctl set-default runlevel3.target
Removed /etc/systemd/system/default.target.
Created symlink /etc/systemd/system/default.target → /usr/lib/systemd/system/multi-user.target.

# systemctl get-default
multi-user.target
```

The new default target is `multi-user.target`.

The change affects the target used at the next boot. It does not, by itself, immediately switch the currently running system to that target.

**Practical distinction:**

- `systemctl get-default`: inspect the configured default target.
- `systemctl set-default TARGET`: configure the target used at boot.
- `systemctl isolate TARGET`: switch the running system to a target, which can stop other services and should be used carefully.

## Adding New or Customized Services

Sometimes a server needs a service that does not already exist, or an existing service needs customization. The procedure depends on whether the system uses SysVinit or systemd.

### Adding a Service to SysVinit

There are four steps:

1. Create or customize a service script.
2. Place the script in `/etc/rc.d/init.d`.
3. Set its permissions.
4. Register it with the appropriate runlevels.

#### Step 1: Create or Customize the Service Script

copy an existing service script and modify it rather than creating everything from scratch.

Example: inspect the existing CUPS service script.

```
# cat /etc/rc.d/init.d/cups

#!/bin/sh
...
# chkconfig: 2345 25 10
...
start () {
    echo -n $"Starting $prog: "
    # start daemon
    daemon $DAEMON
    RETVAL=$?
    echo
    [ $RETVAL = 0 ] && touch /var/lock/subsys/cups
    return $RETVAL
}
...
stop () {
    # stop daemon
    echo -n $"Stopping $prog: "
    killproc $DAEMON
    RETVAL=$?
    echo
    [ $RETVAL = 0 ] && rm -f /var/lock/subsys/cups
    return $RETVAL
}
...
restart() {
    stop
    start
}
...
```

##### Understand the `chkconfig` Header

The example header is:

```
# chkconfig: 2345 25 10
```

It defines:

- `2345`: runlevels where the service is configured to start.
- `25`: startup order.
- `10`: shutdown order.

The startup number helps determine where the script appears relative to other startup scripts.
A smaller number generally me
ans earlier startup; a larger number means later startup.

The chapter recommends inspecting the default runlevel's startup order before adding a new service:

```
# ls /etc/rc5.d
...
/etc/rc5.d/S22messagebus
/etc/rc5.d/S23NetworkManager
/etc/rc5.d/S24nfslock
/etc/rc5.d/S25blk-availability
/etc/rc5.d/S25cups
/etc/rc5.d/S25netfs
/etc/rc5.d/S26acpid
...
```

A header using startup order `25` places the new script around the other `S25` entries. The exact ordering depends on the existing scripts and system implementation.

#### Step 2: Place the Script in the Correct Directory

After creating and testing the script, copy it into `/etc/rc.d/init.d`.

```
# cp My_New_Service /etc/rc.d/init.d
# ls /etc/rc.d/init.d/My_New_Service
/etc/rc.d/init.d/My_New_Service
```

#### Step 3: Set Executable Permissions

Set the script's permissions:

```
# chmod 755 /etc/rc.d/init.d/My_New_Service
# ls -l /etc/rc.d/init.d/My_New_Service
-rwxr-xr-x. 1 root root ... /etc/rc.d/init.d/My_New_Service
```

#### Step 4: Register the Service with SysVinit

Run `chkconfig --add` to register the script using the runlevels and order specified in its header.

```
# chkconfig --add My_New_Service
# ls /etc/rc?.d/*My_New_Service
/etc/rc0.d/K10My_New_Service
/etc/rc1.d/K10My_New_Service
/etc/rc2.d/S25My_New_Service
/etc/rc3.d/S25My_New_Service
/etc/rc4.d/S25My_New_Service
/etc/rc5.d/S25My_New_Service
/etc/rc6.d/K10My_New_Service
```

The `S25` links configure startup at runlevels 2, 3, 4, and 5. The `K10` links configure stop behavior at runlevels 0, 1, and 6.

Test the service manually before rebooting:

```
# service My_New_Service start
Starting My_New_Service: [ OK ]

# service My_New_Service stop
Stopping My_New_Service: [ OK ]
```

The output above illustrates the expected success messages; actual output depends on the script.

Once registered, the service can be started or stopped manually using `service`, and its runlevel links control its SysVinit startup behavior.

---

### Adding a Service to systemd

There are three main steps:

1. Create a service unit file.
2. Place the file in the correct systemd directory.
3. Configure its relationship to a target if it should start automatically with that target.

#### Step 1: Create a Service Unit File

A systemd service unit is a configuration file ending in `.service`.

```
# cat My_New_Service.service
[Unit]
Description=My New Service

[Service]
ExecStart=/usr/bin/My_New_Service
```

The essential fields in this example are:

- `[Unit]`: general information about the unit.
- `Description`: human-readable description.
- `[Service]`: service-specific configuration.
- `ExecStart`: command used to start the service.

`/usr/bin/My_New_Service` is a placeholder path in the example. For a real service, the executable must exist and be appropriate for the service.

For additional configuration options, consult the systemd service manual:

```
# man systemd.service
```

#### Step 2: Place the Unit File in the Correct Directory

The chapter describes two locations:

|Directory|Purpose|
|---|---|
|`/etc/systemd/system`|Local or customized unit files; preferred by the chapter for custom services.|
|`/lib/systemd/system`|System-provided unit files, which may be overwritten during software installation or upgrades.|

The chapter recommends `/etc/systemd/system` for custom service files because local configuration is not overwritten by ordinary software upgrades in the way system-provided files may be.

Copy the unit file:

```
# cp My_New_Service.service /etc/systemd/system/
# ls /etc/systemd/system/My_New_Service.service
/etc/systemd/system/My_New_Service.service
```

After creating or changing a unit file, ask systemd to reload its unit configuration:

```
# systemctl daemon-reload
```

This makes systemd reread unit definitions without requiring a server reboot.

#### Step 3: Configure Automatic Startup Through a Target

If the service should start automatically when a particular target is activated, the unit needs an `[Install]` section.

The chapter uses `multi-user.target`:

```
# cat /etc/systemd/system/My_New_Service.service
[Unit]
Description=My New Fake Service

[Service]
ExecStart=/usr/bin/My_New_Service

[Install]
WantedBy=multi-user.target
```

`WantedBy=multi-user.target` specifies the target associated with the service when it is enabled.

Reload the configuration and enable the service:

```
# systemctl daemon-reload
# systemctl enable My_New_Service.service
Created symlink /etc/systemd/system/multi-user.target.wants/My_New_Service.service 
-> /etc/systemd/system/My_New_Service.service.
```

The symbolic link in `multi-user.target.wants` establishes the relationship between the target and the service.

Inspect the directory:

```
# ls -l /etc/systemd/system/multi-user.target.wants/My_New_Service.service
lrwxrwxrwx. 1 root root ... /etc/systemd/system/multi-user.target.wants/My_New_Service.service -> /etc/systemd/system/My_New_Service.service
```

The chapter also demonstrates creating the link manually:

```
# ln -s /etc/systemd/system/My_New_Service.service /etc/systemd/system/multi-user.target.wants/My_New_Service.service
```

**Preferred operational approach:** use `systemctl enable` when the unit has an appropriate `[Install]` section. It creates the necessary enablement links through systemd's management interface.

> [!NOTE]
> If changing the target associated with a manually created link, the chapter mentions `ln -sf` to replace an existing link. When possible, use systemd's own enablement commands rather than manually maintaining links.

### Start the New Service Without Rebooting

The chapter notes that adding the unit and its target relationship does not necessarily start the service immediately.

Start it explicitly:

```
# systemctl start My_New_Service.service
# systemctl status My_New_Service.service
My_New_Service.service - My New Fake Service
Loaded: loaded (/etc/systemd/system/My_New_Service.service; enabled)
Active: active (running)
```

This is illustrative output. The service will start successfully only if its executable and configuration are valid.
If the unit fails, inspect its status and logs to investigate the cause.

---

## References

- **Linux Bible - Christopher Negus (Tenth Edition)**
  - **CHAPTER 15: Starting and Stopping Services**
