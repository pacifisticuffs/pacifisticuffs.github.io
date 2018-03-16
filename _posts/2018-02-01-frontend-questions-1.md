---
title: "Answering FEE Interview Questions"
date: 2018-02-01
categories: [HTML]
---

The main impetus behind setting this site up was to get my head back to thinking about the web as more than an [eternal consumption engine](https://www.youtube.com/watch?v=FkiqaGsSSYw){:target="_blank"}. I'm hoping to get back into tech, and to do so I will have to pass roughly 97 years of tech interviews, a daunting task even when you've been neck deep in this stuff everyday. I've been gone for 3 years, so I _really_ have some work to do.

My friend pointed me toward some resources, and I'd like to use this as a staging site to think about the questions and answer them, and hopefully sandbox some of the stuff encountered. I'm starting with a popular [GitHub Repo](https://github.com/h5bp/Front-end-Developer-Interview-Questions){:target="_blank"} that has a long outline of questions to ponder, and I'll be chiseling away at some of them over the next few posts.

<dl>
  <dt><h5><b>Q.</b> What'd I learn this week?</h5></dt>
  <dd>
    <p>Quite a bit! For starters, I've been learning <a href="https://daringfireball.net/projects/markdown/syntax" target="_blank">Markdown</a> syntax. I've forever hated the thought of things like Markdown, TypeScript, CoffeeScript, etc. HTML is easy enough as it is, and the thought of littering my Javascript with something as inane as <em>significant indentation</em> makes my blood run cold. I also freaking hate the phrase "syntactic sugar," so those things can go suck an egg.</p>

    <p>Fooling with Markdown for a few days now though has made me appreciate that it <em>does</em> allow an author to focus on what he's writing, rather than the exact semantics behind the words. I still care a ton about the semantics, but I can go back and add more appropriate elements in where needed, and Markdown gives me the freedom to mix plaintext with HTML, so it's not bad!</p>

    <p><small>(heh, as I wrote and previewed this, I saw that Markdown wasn't going to let me use its syntax inside the definition list I think is a wonderful element for a Q&amp;A. Oh whale.)</small></p>
  </dd>
  <dt><h5><b>Q.</b> When building a new web site or maintaining one, can you explain some techniques you have used to increase performance?</h5></dt>
  <dd>
  <p>One thing that used to plague larger sites was linking to a lot of external resources &mdash; CSS, JS, icons. Granted, several years ago we were quite limited with only a literal handful of concurrent requests available, there are still considerations to be made today when modern browsers can have around 17 simultaneous connections (especially when, as of this writing, only 6-13 are available per hostname).</p>
  <p>Some of the biggest performance gains were made with minifying and concatenation, that is obfuscating your JS and CSS with terse variable and function names, removing white space and linefeeds, and mushing several files into one larger one. Gzip over your HTTP connection further improves the speed of this download. For things like icons, we introduced CSS sprites, which put several icons into one file and then shift its position via the <code>background-position</code> CSS property. </p>
  <p>There's a helluva lot more to this than just managing downloads though. Other strategies involve bottom-loading JS, delayed image downloads (which rely upon JS), prioritizing content above the fold, or using things like <abbr title="Accelerated Mobile Pages">AMP</abbr>.</p>
  </dd>
  <dt><h5><b>Q.</b> Can you describe your workflow when you create a web page?</h5></dt>
  <dd>
  <p>My workflow has always been to attack the content first, making sure that I'm using the most semantically-appropriate elements and that the page's hierarchy or its structure makes sense even in the absence of styling. I'll never forget years ago at LinkedIn we had a CDN outage, and someone on Twitter had commented that despite there being little to no graphical or layout styles, the content, navigation and (most of) the functionality were still present. We took great pride in using progressive enhancement to make sure that the site remains useable even when things go to shit.</p>
  </dd>
  <dt><h5><b>Q.</b> If you jumped on a project and they used tabs and you used spaces, what would you do?</h5></dt>
  <dd>
  <p>I'd burn the place to the ground, along with any of the tab-using Philistines.</p>
  </dd>
  <dt><h5><b>Q.</b> Describe how you would create a simple slideshow page.</h5></dt>
  <dd>
  <p>I'd start with an ordered list, including markup for each image in the slideshow. This allows the full content to be available to screen readers, search engines, and any other tools someone might want to throw at the page.</p>
  <p>Using CSS, I'd change the visibility to hide all but the first image in the slide show and position it all absolutely. To prevent bouncing as images change, the parent element housing the images would be given a static size. I'd animate the opacity for each transition, fading out then in as the images changed.</p>
  <p>Javascript would be required to set a timer for each image's display, and to swap styles to make one image invisible and another visible, probably with a classname swap.</p>
  </dd>
  <dt><h5><b>Q.</b> Explain what ARIA and screenreaders are, and how to make a website accessible.</h5></dt>
  <dd>
  <p>Accessible Rich Internet Applications, duh.</p>
  <p><abbr title="Accessible Rich Internet Applications">ARIA</abbr> implementations involve using attributes in your markup to make your content and applications more accessible to people with disabilities. For instance, though we have a dedicated <code>&lt;footer&gt;</code> element now to denote the end of an article, section, or document, there might be several on a single page. Using the ARIA attribute <code>role="contentinfo"</code>, we can denote the main template's footer where our contact info or privacy or copyright statements reside.</p>
  <p>ARIA's very useful for applications where state changes alter the content and layout of a page, or change a control's visibility or disabled state.</p>
  </dd>
  <dt><h5><b>Q.</b> Explain some of the pros and cons for CSS animations versus JavaScript animations.</h5></dt>
  <dd>
  <p>Due to web browsers' threading, you may get some performance gains using CSS to animate simple properties, specifically <code>transform</code> and <code>opacity</code>. In this scenario, the browser's main thread may be occupied by some intense Javascript operations, but it can still handle our small changes in a side thread that will go uninterrupted.</p>
  <p>It's likely that you're already using a JS library for your site's functionality, which typically includes competent animation support. The interface for animation via JS is often simpler and more intuitive than that provided by CSS.</p>
  </dd>
  <dt><h5><b>Q.</b> What does CORS stand for and what issue does it address?</h5></dt>
  <dd>
  <p>Cross-Origin Resource Sharing (<abbr title="Cross-Origin Resource Sharing">CORS</abbr>). Essentially, any request for a resource that extends beyond the current domain. Could be simple <code>GET</code>s for CSS, images, or Javascript, or form submissions and XHR requests. It allows the browser to send certain HTTP headers to the server to see if it's allowed to access a resource, what it's allowed to do with that resource, and what HTTP headers it's allowed to modify.</p>
  </dd>
</dl>

Damn, that went long! But it was a great exercise for me, reacquainting myself with CORS, ARIA, and the ways in which I used to develop stuff.
