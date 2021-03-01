---
slug: customize-vims-gx-mapping
date: 2021-02-28
title: "Customize Vim's gx mapping"
---

One of my favorite Vim mappings is <kbd>g</kbd><kbd>x</kbd>, when hovering a URL with the cursor in normal mode and using this mapping, Vim will open the URL under the cursor with your default browser.

To learn more about this mapping which is part of the built-in NETRW plugin type `:h gx` inside Vim.

## What if we could take this a step further?

When you're in a `package.json` file or `mix.exs`, what if you could press `gx` and have Vim open the [npmjs.org](https://www.npmjs.com/) or [hexdocs.pm](https://hexdocs.pm/) page for the package under the cursor? Turns out it's not that hard to do!

## JavaScript: package.json + gx

For package.json we will need to parse the package name, then construct the npm url and pass it to `netrw#BrowseX` function, which in turn will open it in the default browser. First let's create a function that will do just that:

```vim
function! PackageJsonGx() abort
  let l:line = getline('.')
  let l:package = matchlist(l:line, '\v"(.*)": "(.*)"')

  if len(l:package) > 0
    let l:package_name = l:package[1]
    let l:url = 'https://www.npmjs.com/package/' . l:package_name
    call netrw#BrowseX(l:url, 0)
  endif
endfunction
```

Then we need to override the <kbd>g</kbd><kbd>x</kbd> mappings to call our function whenever we are inside of a `package.json` file:

```vim
augroup PackageJsonGx
  autocmd!
  autocmd BufRead,BufNewFile package.json nnoremap <buffer> <silent> gx :call PackageJsonGx()<cr>
augroup END
```

## Elixir: mix.exs + gx
Thankfully there is an [Elixir plugin](https://github.com/lucidstack/hex.vim) that will allow us to open the hexdocs.pm page or Github page for the package under the cursor already, so all we have to do is create the mappings to activate whenever we are in a `mix.exs` file.

First, make sure you install the plugin:

```vim
Plug 'lucidstack/hex.vim'
```

Then add the following to your vimrc to have <kbd>g</kbd><kbd>x</kbd> open the Hex Docs page, and <kbd>g</kbd><kbd>h</kbd> for opening the Github page:

```vim
" Elixir mix.exs
augroup MixExsGx
  autocmd!
  autocmd BufRead,BufNewFile mix.exs nnoremap <buffer> <silent> gx :HexOpenHexDocs<cr>
  autocmd BufRead,BufNewFile mix.exs nnoremap <buffer> <silent> gh :HexOpenGithub<cr>
augroup END
" }}}
```


## Bonus: VimPlug
If you're using VimPlug as your Vim plugin manager you can also get the <kbd>g</kbd><kbd>x</kbd> mapping to work inside Plug windows (like the one that opens when you update your plugins with `:PlugUpdate`). This code was originally posted in VimPlug's wiki (and was my inspiration for customizing gx for other scenarios), but I modified it so it also works inside my plugin definition file (`~/.vimrc.bundles`):

```vim
" For VimPlug
function! PlugGx()
  let l:line = getline('.')
  let l:sha  = matchstr(l:line, '^  \X*\zs\x\{7,9}\ze ')

  if (&filetype ==# 'vim-plug')
    " inside vim plug splits such as :PlugStatus
    let l:name = empty(l:sha)
                  \ ? matchstr(l:line, '^[-x+] \zs[^:]\+\ze:')
                  \ : getline(search('^- .*:$', 'bn'))[2:-2]
  else
    " in .vimrc.bundles
    let l:name = matchlist(l:line, '\v/([A-Za-z0-9\-_\.]+)')[1]
  endif

  let l:uri  = get(get(g:plugs, l:name, {}), 'uri', '')
  if l:uri !~? 'github.com'
    return
  endif
  let l:repo = matchstr(l:uri, '[^:/]*/'.l:name)
  let l:url  = empty(l:sha)
              \ ? 'https://github.com/'.l:repo
              \ : printf('https://github.com/%s/commit/%s', l:repo, l:sha)
  call netrw#BrowseX(l:url, 0)
endfunction

augroup PlugGxGroup
  autocmd!
  autocmd BufRead,BufNewFile .vimrc.bundles nnoremap <buffer> <silent> gx :call PlugGx()<cr>
  autocmd FileType vim-plug nnoremap <buffer> <silent> gx :call PlugGx()<cr>
augroup END
```

Hope you find it this post useful and that it inspires you to customize <kbd>g</kbd><kbd>x</kbd> to support your favorite package manager / programming language. If you do write your own customization please [@/DM me on Twitter](https://twitter.com/dorian_escplan) - I'm interested to hear what you come up with.
