---
title: "Answering FEE Interview Questions - Part 3: CSS"
date: 2018-02-06
categories: [CSS]
---

Previously: [part 1 - general]({% post_url 2018-02-01-frontend-questions-1 %}) --- [part 2 - html]({% post_url 2018-02-01-frontend-questions-2-html %})

In this post I'm going to work through some of the CSS questions posed in the [Front-end Interview Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions){:target="_blank"} repo.

<dl>
  <dt><h5><b>Q.</b> What is CSS selector specificity and how does it work?</h5></dt>
  <dd>
    <p>Specificity (and the cascade, given equal specificity) determines what CSS rules will be applied to an element. In order of precedence:</p>
    <ol>
      <li>Type selectors (e.g. <code>&lt;h1&gt;</code>)</li>
      <li>Class selectors (e.g. <code>.post</code>), attribute selectors and pseudo classes (e.g. <code>[type="password"]</code> and <code>:disabled</code>)</li>
      <li>ID selectors (e.g. <code>#main</code>)</li>
      <li>Inline styles (e.g. <code>&lt;span style="color:#0f0"&gt;...&lt;/span&gt;</code>)</li>
      <li><code>!important</code> declarations on your style rules</li>
    </ol>
  </dd>
  <dt><h5><b>Q.</b> What's the difference between "resetting" and "normalizing" CSS? Which would you choose, and why?</h5></dt>
  <dd>
  <p>Reset style sheets aim to remove all browser styles, bringing every element to an even level, upon which you'd layer your site's own styles. That is, all headers, body text, strong, italics, etc. will be stripped of size, decoration, margins, and padding.</p>
  <p>A normalize style sheet aims to make all those values consistent among browsers, while maintaining some of the browsers' sane choices. For example, an <code>&lt;h1&gt;</code> will be 16px, bold, and have a margin and padding. It's opinionated, so you have to agree with their choices or override them.</p>
  <p>I think I'd use one or the other depending on the scope of the project I'm working on. For a small site where I can more easily pick and choose which modules I'd like to include, I'd probably opt for a normalize CSS. For a large enterprise site where we'd have standards that span across the organization, I'd probably go for a reset. Though resets can be annoying given the layer upon layer of cascade that you have to sift through while debugging, the flattened and predictable result is great to build upon.</p>
  </dd>
  <dt><h5><b>Q.</b> Describe floats and how they work.</h5></dt>
  <dd>
  <p>After the world figured out that tables were intended for data, we needed another way to achieve columnar layouts. Floats did this pretty well, but came with some headaches. To its parent, a floated element pretty much doesn't exist. That is, its dimensions are ignored and unless the parent has a block formatting context, it will collapse. Floats were great at some things. For instance, throwing out a list of thumbnails all floated left will stack them in line, and once the width of its parent is reached, they'll intelligently wrap themselves. <code>clear</code>ing floats is where a lot of developers would encounter trouble. You could add a non-semantic block-level element after your floats and have it <code>clear: both;</code>, but this screwed up all our beautiful semantic, non-presentational markup. It wasn't until this beauty was widely distributed that working with floats became easy and common:</p>
{% highlight css linenos %}
.clearfix::after {
  content: "";
  display: table;
  clear:   both;
}
{% endhighlight %}
  </dd>
  <dt><h5><b>Q.</b> Describe z-index and how stacking context is formed.</h5></dt>
  <dd>
  <p>The stacking context defines the context from which elements with a different <code>z-index</code> value will be layered along the z axis. Given a common stacking index, the lower the <code>z-index</code>, the further from the user the element will be. MDN has a great analogy to help conceptualize the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context" target="_blank">stacking context</a>:</p>
  <blockquote class="blockquote">An easy way to figure out the rendering order of stacked elements along the Z axis is to think of it as a "version number" of sorts, where child elements are minor version numbers underneath their parent's major version numbers. </blockquote>
  <p>Some of the common CSS properties which will trigger a stacking context:</p>
  <ul>
    <li>An element with a position of <code>absolute</code> or <code>relative</code></li>
    <li>An element with an <code>opacity</code> less than 1</li>
    <li>An element whose <code>transform</code>, <code>filter</code> or <code>clip-path</code> properties have a value other than none</li>
  </ul>
  </dd>
  <dt><h5><b>Q.</b> Describe BFC (Block Formatting Context) and how it works.</h5></dt>
  <dd>
  <p>I think anyone who has implemented a layout in CSS has tangled with this, whether they knew the term or not. I guess the best way to describe it is having a box that contains its child elements (both floated and non-floated) without collapsing entirely or collapsing margins on its children. Common ways to achieve this are setting <code>overflow: auto;</code> on the parent, or using the clearfix <code>:after</code> hack (though this won't fix your margins collapsing).</p>
  <p>There's also a new property, <code>display: flow-root;</code>, designed to fix just this annoying issue, but its support is still pretty limited</p>
  </dd>
  <dt><h5><b>Q.</b> How would you approach fixing browser-specific styling issues?</h5></dt>
  <dd>
  <p>The two best strategies I can think of are Using vendor prefixes where required, and using conditional comments to target IE (which, let's face it, is usually the problem). Beyond that, frequenting sites like <a href="https://caniuse.com/" target="_blank">Caniuse</a> to get a solid understanding of what you can and can't do is always necessary.</p>
  </dd>
  <dt><h5><b>Q.</b> How do you serve your pages for feature-constrained browsers?</h5></dt>
  <dd>
  <p>I always try to build my pages using progressive enhancement, layering cool stuff on top of base-level functionality. Beyond that, using Polyfills is a great way to get browsers on an even keel. </p>
  </dd>
  <dt><h5><b>Q.</b> What are the different ways to visually hide content (and make it available only for screen readers)?</h5></dt>
  <dd>
  <p>A common thing we used to do before webfonts were around was to use image replacement on (typically) headers. You can still provide the text on the page with its appropriate semantics, and use <code>text-indent: -9999px;</code> to throw the content outside the viewport. Then you'd set a <code>background-image</code> in your CSS to provide the pretty fonts. The plaintext will still be accessible to screen readers.</p>
  <p>Another way, if the content is intended just for screen readers, is to position it off screen:</p>
{% highlight css linenos %}
.help-text {
  position: absolute;
  left: -9999px;
}
{% endhighlight %}
  <p>Or by turning it into an almost non-existent box:</p>
{% highlight css linenos %}
.help-text {
  clip: rect( 0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  overflow: hidden;
  position: absolute;  
}
{% endhighlight %}  
  </dd>
  <dt><h5><b>Q.</b> Have you ever used a grid system, and if so, what do you prefer?</h5></dt>
  <dd>
  <p>Nope! I've been <a href="https://medium.com/actualize-network/modern-css-explained-for-dinosaurs-5226febe3525" target="_blank">reading about</a> them a <a href="https://medium.com/podible-engineering/pixels-are-tech-debt-ff4ff4fdeb4c" target="_blank">bit lately</a>, and frankly they sound freaking great!</p>
  <p>Bootstrap, which I'm using for the first time with any regularity here, also has added a grid system to its package. I will probably fool with that to change this layout from its current flex-base to grid.</p>
  </dd>
  <dt><h5><b>Q.</b> Are you familiar with styling SVG?</h5></dt>
  <dd>
  <p>Very little! On an older version of the LinkedIn profile, I used RaphaelJS to generate SVG for some small graphs, so I did very little manual editing.</p>
  </dd>
  <dt><h5><b>Q.</b> Can you give an example of an <code>@media</code> property other than screen?</h5></dt>
  <dd>
  <p>Sure, you can do <code>@media print</code> to alter styles for when a user prints a page. </p>
  </dd>
  <dt><h5><b>Q.</b> What are the advantages/disadvantages of using CSS preprocessors?</h5></dt>
  <dd>
  <p>My only experience with a preprocessor is SCSS, which we used at LinkedIn during my last year or so there. For a large organization dealing with the challenges of fractured code-bases, attempting to standardize iconography, typography, and layout, and making tools that are easy for all developers to use them consistently, SCSS was great! We had mixins to do common things like clearfix, variables to provide consistent fonts and sizes, and ways to size containers so that they'd adhere to the same media queries used throughout the site.</p>
  <p>My major complaint in using these things was the extent to which it abstracted the CSS rules. It <em>was</em> great that we finally had a simple and easy way to implement standards across the company. But it makes developers lack awareness of potential bloat created by throwing too many mixins around, and it distances us from what's <em>really</em> going on in our CSS, leading to over-reliance and ultimately an unfortunate ignorance (except on the part of the standards creators within the org).</p>
  </dd>
  <dt><h5><b>Q.</b> Explain how a browser determines what elements match a CSS selector.</h5></dt>
  <dd>
  <p>A browser will work from right-to-left when matching a CSS selector. That is, given the rule:</p>
{% highlight css linenos %}
.main section .time {
  background-color: #ccc;  
}
{% endhighlight %}
  <p>The browser will first seek out any elements with a classname of <code>.time</code>, then traverse up the DOM tree to look for an ancestor <code>&lt;section&gt;</code> element, and then finally traverse up again looking for an ancestor with a classname of <code>.main</code>. This traversal allows it to quickly discard non-matches or only partial matches.</p>
  </dd>
  <dt><h5><b>Q.</b> Describe pseudo-elements and discuss what they are used for (also looking at pseudo-classes here)</h5></dt>
  <dd>
  <p>Pseudo-elements are used to select specific parts of an element. The selectors are pretty self-explanatory. Here are some that are commonly-used:</p>
  <ul>
    <li><code>::first-letter</code></li>
    <li><code>::first-line</code></li>
    <li><code>::after</code></li>
    <li><code>::before</code></li>
  </ul>
  <p>Pseudo-classes are used to select only in a certain state. Some commonly-used selectors are:</p>
  <ul>
    <li><code>:active</code></li>
    <li><code>:checked</code></li>
    <li><code>:disabled</code></li>
    <li><code>:focus</code></li>
    <li><code>:hover</code></li>
    <li><code>:invalid</code></li>
    <li><code>:read-only</code></li>
    <li><code>:required</code></li>
    <li><code>:valid</code></li>
    <li><code>:visited</code></li>
  </ul>
  </dd>
  <dt><h5><b>Q.</b> Explain your understanding of the box model and how you would tell the browser in CSS to render your layout in different box models.<br />What does <code>* { box-sizing: border-box; }</code> do? What are its advantages?</h5></dt>
  <dd>
  <p>Believe it or not, box sizing was one thing that good ol' IE6 got right. It adhered to what is now called <code>border-box</code> sizing. That is, if you stated an element's width as 200px, then the <em>overall</em> width of that element was 200px, <em>including</em> borders and padding. Competing browsers at the time (and the default box-sizing method for CSS today) used the <code>content-box</code> method, which stated that padding and border were added to the declared width of an element. Enter in all the backslash hacks to get IE to play nice with your floated layouts. Ugh.</p>
  <p>Fortunately, sanity took hold, and we agreed upon the universal reset that works great:</p>
{% highlight css linenos %}
* { box-sizing: border-box; }
{% endhighlight %}
  <p>This wonderful rule tells every element to include in its width calculation an element's border and padding, giving developer's a predictable and level playing field.</p>
  </dd>  
</dl>

All right, I think that covers enough material for this post. There are more questions remaining in the repo, but I think I've touched on a few of the subjects already that they're asking about.
