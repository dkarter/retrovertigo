---
slug: whats-my-public-ip-automation-linux-terminal
date: 2020-02-05 15:46:09Z
title: "What's my public IP? #automation #linux #terminal"
tags: command-line
original_link: https://til.hashrocket.com/posts/umaybdpg4v-whats-my-public-ip-automation-linux-terminal
---


Ever wonder what your public IP looks like? When I do, I usually [search duckduckgo.com for "what's my ip"](https://duckduckgo.com/?q=what%27s+my+ip) and it is nice enough to tell me that at the top above the search results.

But what if I want to do that at the terminal, and perhaps use that information in a script?

TIL about ipinfo.io! curl it and you get your ip, hostname, city, state, zipcode, country, ISP, timezone, even lat & lng coordinates of the rough location!

```bash
curl ipinfo.io
```

```json
{
  "ip": "111.111.111.111",
  "hostname": "redacted.comcast.com",
  "city": "Chicago",
  "region": "Illinois",
  "country": "US",
  "loc": "41.8500,-87.6500",
  "org": "AS7922 Comcast Cable Communications, LLC",
  "postal": "60666",
  "timezone": "America/Chicago",
  "readme": "https://ipinfo.io/missingauth"
}
```

This information is not fully accurate, but it's good enough for scripts, and because it comes back in json form you can pipe it to `jq` to extract info or read it directly into your scripts.
