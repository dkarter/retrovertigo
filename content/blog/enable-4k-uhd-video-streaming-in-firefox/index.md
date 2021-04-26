---
slug: enable-4k-uhd-video-streaming-in-firefox
date: 2018-06-21 01:32:05Z
title: "Enable 4k UHD video streaming in Firefox"
tags: workflow
original_link: https://til.hashrocket.com/posts/f53lj8fzab-enable-4k-uhd-video-streaming-in-firefox
---


By default, Firefox does not support the VP9 WebM codec sites like YouTube use to deliver 4k quality video. If you visit a video that supports 4k you won't even see the option available under the Quality menu.

Test video: [https://www.youtube.com/watch?v=Bey4XXJAqS8](https://www.youtube.com/watch?v=Bey4XXJAqS8)

To enable it:

1. visit `about:config`
2. search for `webm`
3. double click `media.mediasource.webm.enabled`

![demo](https://i.imgur.com/6WeMRJW.gif)

And now refresh YouTube 
![result](https://i.imgur.com/ynFdxGr.gif)
