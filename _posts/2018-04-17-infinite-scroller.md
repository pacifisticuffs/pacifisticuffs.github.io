---
title: Building an Infinite Scroller
categories: [js]
excerpt: <p><a href="https://dxprog.com/" target="_blank">My friend</a> mentioned that building an infinite scroller was a good exercise for a technical interview. I'd never done it, so I figured I'd give it a try.</p>
image: /images/posts/IMG_9839.jpg
caption: Me and my wife, along with a couple friends, <em>finitely</em> scrolling in Cabo San Lucas
# date: 2018-04-04
---

This is a task I've never had to do in my professional career. I think if I were asked to implement one, I'd likely look for an existing jQuery plugin or React component, depending on what was already available in our codebase. I've been trying to approach all my exercises here in vanilla JS, so that's the route I took with this as well.

#### Why Build an Infinite Scroller?
The main reason for this sort of feature is to capture a visitor's attention and present more content without the user having to explicitly request it. It's used quite successfully on Facebook, Twitter, and Pinterest, sites that have an abundance of content and an explicit business requirement to increase a visitor's dwell time and engagement.

When we implemented this at LinkedIn on the network update stream several years ago, one major oversight we had was that there were important links in the footer of the page that the user could no longer get to. As soon as the footer became visible, another bunch of posts was retrieved from the fire hose, forever pushing the footer below the fold.

#### Requirements &amp; Variables
As I set out to start building this, here are some of the requirements and limitations I need to work with.

##### Design Considerations
- need a container element in which to continue to put content that's fetched
- need a triggering element, whose presence in the viewport means the user has reached the end of a post
  - need a way to determine if this element is in the viewport
- need to "debounce" the fetch behavior:
  - if fetching, don't do anything else
  - if the scroll happened within some number of milliseconds, don't fetch
  - if we're at the end of the available content (i.e., no more stories), don't fetch (otherwise we'll attempt to grab /null and get the 404.html)
- need to determine scroll height of an article
- if we want to have history management as well:
  - alter the browser history
  - alter the window url
  - alter the window's title
- what flavor of JS (ES5, ES2015)?
- what pattern to use?
- how should it handle scripts within the article?
  - if it has a `src` attribute, create a new script element and set its `src` to the same and append it
  - if it's inline, we can either `eval()` it, or take its content and append it in a new script tag
    - seems like concatenating all the script content into a new inline script and appending that is the best way to go, especially since `eval()` can no longer create variable

##### Data Needs
- what's the "next" story? chronological or reverse chron?
  - Jekyll has both concepts baked in, fortunately
  - chose chronological
- need the URL for the next story
- need a place to store that url
  - global JS var?
  - `data-` attribute on the article?
    - this is ultimately what I chose to work with
  - use jekyll's data stores and build json blobs?
- use `XMLHttpRequest` or `fetch` API?
  - chose XHR because of its built-in capability to parse the response as a full HTML document via `xhr.responseType = 'document'`
  - `fetch` would've required a lot of additional parsing
- Content:
  - Jekyll is static, so I can't pass request params
  - Jekyll also has a data store that I could potentially use to build json blobs of all the content
  - Or I could just do full page requests and parse that HTML into a document
    - `XMLHttpRequest` has this functionality built in! Awesome
  - get the article from the returned html page
  - get any scripts that are present in the article content
    - since a lot of my posts will have inline JS, that will need to be collected and appended as a new script tag to the article
    - any external scripts with a `src` attribute will also need to be appended to the document

##### Interaction
- some way to highlight the newly added content
  - fade in, or fade out a highlighted state
  - decided upon a simple opacity fade-in
- need a throbber to show the user something is happening
- maybe have a post template that's populated by dummy content?
- optionally have the fetch be triggered by a button rather than automatically do it once the footer is visible

#### How'd it Go?
You tell me! It's active on this page only, and it'll fetch all the articles older than this one as you continue to scroll down.

Or don't, I don't have any way to leave comments or feedback here, sucker.

It was a good exercise. I was happy to dig into `xhr` and discover that it can return a full html document, complete with its own DOM methods. I was also happy to write it all in vanilla JS, granted I'm relying upon modern stuff that is likely not at all cross-browser friendly.

You can <a href="" target="_blank">view the code for the scroller on GitHub</a>.

<script src="/js/infinite_scroll.js" defer></script>