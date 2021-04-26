---
slug: stop-bash-script-on-error-linux-zsh
date: 2017-11-16 18:15:36Z
title: "Stop #bash script on error #linux #zsh"
tags: command-line
canonical: https://til.hashrocket.com/posts/cp1ovv8ovo-stop-bash-script-on-error-linux-zsh
---


If you are writing a procedural bash script, you may want to stop execution if one of the steps errored out.

You can write error handling for each step, but that can get quite verbose and make your script hard to read, or you might even miss something.

Fortunately bash provides another option:

```sh
set -e
```

Simply place the above code at the top of your script and bash should halt the script in case any of them returns a non-true exit code.

Caveats: this will not work in all cases, for example it does not work for short circuited commands using `&&`/`||`.

If you want it to work when one of your operations in a pipe fails you will need to add the pipefail flag (not supported on some systems `set -o | grep pipefail` to check your system):

```sh
set -e -o pipefail
```

If you have a script that always returns a non true return code and that's fine you can override `set -e` for that command with:

```sh
set +e
your_command_goes_here
set -e
```

At this point I consider it a best practice to include this statement in every script I write.
