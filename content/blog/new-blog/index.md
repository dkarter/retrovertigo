---
slug: new-blog
date: '2021-02-13T00:00:00.000Z'
title: "New Blog!"
description: "Read about why I started a new blog, technologies used, and my publishing philosophy"
tags: meta
---

## Why a new blog?

> The shoemaker's children go barefoot

My previous blog was built using Jekyll in 2014 and hosted on Github Pages. This blog was causing a cognitive dissonance; At work I utilize Elixir, React and TypeScript, modern technologies at which I'm very adept. So why am I using Jekyll, a Ruby based static site generator, with outdated typography for my blog? One of my favorite quotes to describe this situation is ["The shoemaker's children go barefoot"](https://en.wiktionary.org/wiki/the_shoemaker%27s_children_go_barefoot), it means "one often neglects those closest to oneself".

Over the years I've gotten busier and busier and every time I did feel like writing something I knew that a more modern blog platform would be necessary to allow me to iterate over it quickly, but using a modern platform meant I needed to do some heavy lifting. At least initially.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Want to blog more? Lower the bar for ideas and the barriers to publishing.</p>&mdash; Jake Worth (@jwworth) <a href="https://twitter.com/jwworth/status/1356329692387807232?ref_src=twsrc%5Etfw">February 1, 2021</a></blockquote>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">+1 Sometimes I want to post, realize I hate my blog, try to setup a new one but need to decide what theme to use, typescript/ JavaScript, what framework / CMS to use / where to host. End up losing interest and forgetting about what I wanted to post. The struggle is real!</p>&mdash; Ⅾогiап EscPlan (@dorian_escplan) <a href="https://twitter.com/dorian_escplan/status/1356340871520776193?ref_src=twsrc%5Etfw">February 1, 2021</a></blockquote>


So what did I want this time around:
- Built with a technologies that I use every day at work (React, TypeScript, StyledComponents)
- Write the posts using Markdown (in NeoVim/iA Writer)
- Manage posts using Github
  - Posts are iterated on as PRs
  - Pushing `master` branch should deploy to production
- Tooling:
  - Script to spin up a new blog post quickly so I can get my ideas on "paper" and not
    fight with the platform
- Zero monthly hosting costs (Deploy to Netlify/Vercel)

## A Modern Solution
This time I chose [Gatsby](https://www.gatsbyjs.com/) - a [JAMStack](https://jamstack.org/) solution! If you are not familiar, Gatsby is a React based content platform which is optimized for blogs and other static sites. It supports TypeScript out of the box (with minimal setup).

> A lot of the Gatsby templates out there are written in JavaScript, no StyledComponents, built around a specific CMS that costs money and are painful to setup

The first iteration is going to look pretty simple as I went with the most basic blog template. A lot of the Gatsby templates out there are written in JavaScript, no StyledComponents, built around a specific CMS that costs money and are painful to setup. It made me give up multiple times, until eventually I took a page from [Jake Worth](https://jakeworth.com)'s book and decided to go with the most basic template, [gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog).

## Writer's block? Nah, just ship it!

For some people writing comes naturally, and publishing something is an after thought. I am not one of those people! For me writing has always been a struggle, and the longer the piece, the greater the resistance I felt when writing it.

> The idea was to write short, bite sized posts breaking down our lessons learned from the day's work

When I worked at [Hashrocket](https://hashrocket.com) we had a micro blog platform system called [TIL](https://til.hashrocket.com/), short for "Today I Learned". The idea was to write short, bite sized posts breaking down our lessons learned from the day's work.

I remember my first TIL post, I was second guessing every sentence, every word, double and triple checking my spelling. I was missing the point! 

> Get something out there, typos and all.. Perfect is the enemy of done!

When I asked a co-worker (Chris Erin) to review one of my posts he shared his philosophy on TILs and publishing in general, which resonated with me: Chris' philosophy was to get something out there, typos and all.. Someone else posted about the same thing? Doesn't matter, write it in your own words, with your own perspectives and tone. When you write something, or teach something, you are more likely to remember it and feel that you had mastered the subject. And, like many other worthwhile endeavors, the more you write and publish - the easier it becomes and the better you get at it. In other words, "Perfect is the enemy of done!"

> Unlike a printed publication, online publications and software can be iterated upon after shipping the initial release.

This is the mindset that I want to remind myself of and continue to embrace for my personal / professional work, in particular publishing. This is the beauty of software and the internet as a publishing platform. Unlike a printed publication, online publications and software can be iterated upon after shipping the initial release.

The same applies to my personal blog. In its first iteration, it will not be perfect by any stretch of the imagination, and that's OK. I did decide on a few things that I cannot go live without, and needed to be improved in my fork of gatsby-starter-blog:

#### Formatter: Prettier

Prettier is configured out of the box on gatsby-starter-blog, but the defaults are not my cup of tea. It's funny to me how much this bothers me when in reality it is meaningless and does not affect the final product. I've worked as a consultant and have had to adapt to many different styles, but I still have my preferences and certain preferred aesthetics.

#### Static Typing: TypeScript

I love type systems, and have been using TypeScript a lot at work. It gives me confidence that the code I ship will work. As long as I don't make a logical error or write the wrong thing! While TypeScript is not the ultimate type system out there (Elm is more my jam), it is one of the best out there for JavaScript and I consider it an industry standard at this point.

Since the original gatsby-starter-blog is written with JavaScript, I used [Airbnb's ts-migrate](https://github.com/airbnb/ts-migrate). The migration was fairly straight forward. You can follow the [commit history in my repo](https://github.com/dkarter/retrovertigo/commits/master). Like with my professional projects I did my best to keep commits small and focused.

#### Linting: ESLint

ESLint was not configured out of the box for the template. To me this is a useful tool that I install on every JS/TS project when possible. It helps keep code consistent and consistency makes reading code easier and more predictable. It can also catch potential errors by enforcing best practices.

## Conclusion
There it is, typos and all... a WIP! It may not be perfect, I still have many TODOs, but I'm pretty happy with the result, and excited to be publishing again and learning in public. Hopefully Gatsby / React and TypeScript don't become outdated by the time I write the next one 😅. Cheers!
