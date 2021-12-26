---
slug: fix-internet-connection-after-reboot-with-protonvpn
date: 2021-12-26
title: "Fix internet connection after reboot with ProtonVPN"
tags: linux, vpn
---

If you're using ProtonVPN with the kill switch on a Debian based operating
system, you may find yourself unable to connect to the internet after restarting
your computer or resuming from sleep (if you did not disconnect from the VPN
server first).

To fix this issue you will need to remove the kill switch virtual network device
(or whatever it is..). First list all your internet connections using `nmcli`:

```bash
nmcli connection show
```

You'll see something like this:

```
NAME                      UUID                                  TYPE   DEVICE
MyWifiSSID                298398sj-9829-djk1-jskj-1uiidkjs1988  wifi   wlp0s20f1
pvpn-killswitch           209092dj-2989-duue-2898-2989sj29isj2  dummy  pvpnksintrf0
pvpn-ipv6leak-protection  00f7e209-2898-djkj-2892-289be298f298  dummy  ipv6leakintrf0
```

You'll need to delete the two interfaces starting with `pvpn` like so:

```bash
nmcli connection delete pvpn-killswitch
nmcli connection delete pvpn-ipv6leak-protection
```

And as always here's a way to script this:

```bash
nmcli connection show | awk '{ print $1 }' | grep pvpn | xargs nmcli connection delete
```
