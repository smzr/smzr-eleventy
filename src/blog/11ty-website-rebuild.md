---
title: 'Yet another website rebuild - 11ty'
date: '2021-09-12'
---

So I decided to rebuild my website... I've stuck to the Jamstack but this time I've decided to use the static site generator Elevently. In this post I wanted to cover how I came to this descision and what my inital thoughts of 11ty are.

## What I was using before

Previously, I was using [Gatsby](https://www.gatsbyjs.com/) hooked up to [Contentful](https://www.contentful.com/). At the time I chose to use Gatsby because I had just started to become interested in static site generators and the [Jamstack](https://jamstack.org/), Gatsby was the obvious choice as I had prior experience with React.

- - - 

There wasn't much content on the website, just some of my projects and the details to contact me. It was good for hosting my portfolio but was lacking in personality _for sure_. I did enjoy setting up contentful and it was great to be able to update content without having to update the repository for the website. I definitely want to explore that again and get some sort of CMS hooked up to this website, I'm leaning towards Netlify CMS **- more on that soon 😄**

## Why did I decide to rebuild

The Gatsby site served it's purpose for almost 2 years, in the time since launch I mainly focused on client work and subsequently I had picked up new preferences and practices for building websites. I wasn't really happy with the design of the website, the primary colour was a very saturated purple for some reason and everything was just a bit too big. I had new content I wanted to start putting out (such as posts like this) and wanted to refresh my personal branding, so I decided to go for a full rebuild.

React/Gatsby are great, and I would use both again. But for my personal website which is almost entirely static I felt that React was a bit overkill and the build times were frustrating at times. I played around with Eleventy a bit and decided to give it a try.

## Eleventy / 11ty

Eleventy is also static site generator (like Gatsby). It's super flexible and it has zero boilerplate client-side JavaScript. So it allows me to have fine-grained control and set up my codebase exactly how I want.

I configured 11ty to use Nunjucks for templating and markdown for my page content / posts. There's a few features I have sprinkled in which allow the site to load really fast:

- Seperated styling between components and served minified, inline to respective pages along with site-wide styles
- Used a cool trick to [asynchronously load font css](https://www.filamentgroup.com/lab/async-css.html#async-css-loading-approaches), this is why you can see the font change when loading this page
- On top of that, I've minified the final html output

 - - - 

I want to keep the performance a main priority for this website so I'm keeping it in mind with anything I add, I haven't used images much at all which has helped but I do plan to get some in.

## Simply put

The transition to 11ty was 100% worth it. It took me a few days to get everything in place and I'm glad it's live. 11ty has so much to offer and I want to fully utilise the features that come with it. My site has scored 100 in all areas of lighthouse, so I aim to get it on the [Eleventy Leaderboards](https://www.11ty.dev/speedlify/) next! 