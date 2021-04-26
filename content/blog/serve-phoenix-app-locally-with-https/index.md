---
slug: serve-phoenix-app-locally-with-https
date: 2019-08-20 15:11:04Z
title: "🔒 Serve Phoenix App Locally with HTTPS 🔒"
tags: elixir
original_link: https://til.hashrocket.com/posts/b8p5oalouz--serve-phoenix-app-locally-with-https-
---


The Phoenix Framework provides an easy mix task to automatically generate a self-signed SSL cert. This is useful if you want to test the app locally with HTTPS.

```bash
mix phx.gen.cert
```

The self-sigend certs will be stored in `priv/cert`	so make sure you add that path to your `.gitignore`.

When finished the command will prompt you to update your endpoint configuration and a few imporant warnings:

```
If you have not already done so, please update your HTTPS Endpoint
configuration in config/dev.exs:

  config :tilex, TilexWeb.Endpoint,
    http: [port: 4000],
    https: [
      port: 4001,
      cipher_suite: :strong,
      certfile: "priv/cert/selfsigned.pem",
      keyfile: "priv/cert/selfsigned_key.pem"
    ],
    ...

WARNING: only use the generated certificate for testing in a closed network
environment, such as running a development server on `localhost`.
For production, staging, or testing servers on the public internet, obtain a
proper certificate, for example from [Let's Encrypt](https://letsencrypt.org).

NOTE: when using Google Chrome, open chrome://flags/#allow-insecure-localhost
to enable the use of self-signed certificates on `localhost`.
```
