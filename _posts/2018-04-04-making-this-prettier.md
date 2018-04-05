---
title: Making This Thing Prettier
categories: [setup, about, jekyll]
excerpt: <p>I wanted to make use of this template's nicer "featured posts" layout to get some more color and pop, but making liquid do what I want was an ugly mess. Here's how I did it.</p>
image: /images/posts/IMG_2125.jpg
date: 2018-04-04
---

I'm not a designer. Not by any stretch of the imagination. I like to think I have an appreciation for good design, but the truth is that I don't see color worth a damn and couldn't tell you which fonts are which. Leading is something bad you don't want while snacking on paint chips, and kerning is a frog that digs on swine.

This template was an <a href="https://getbootstrap.com/docs/4.0/examples/blog/" target="_blank">example</a> kindly provided by Bootstrap. It had a nice jumbotron section, with some featured posts below that I wasn't using. As I continued to write stuff for this site, I realized that my home page looked like, well, <em>ass</em>, and I needed some more color and stuff to make it not-so-assy.

The first thing I wanted was a way to prevent posts I didn't want featured from getting included into the featured section. Since Jekyll allows me to add <a href="https://jekyllrb.com/docs/frontmatter/" target="_blank">Frontmatter</a> to my pages, I can use that and add an arbitrary variable used to omit a post from the features:

{% highlight liquid linenos %}
---
title: This is a boring post with me whining
categories: [personal]
excerpt: I am so sad :'(
image: /images/posts/sadtim.jpg
omit: true
---
{% raw %}
{% for post in site.posts %}
  {% if post.omit %}
    {% continue %}
  {% endif %}
{% endfor %}
{% endraw %}
{% endhighlight %}

Easy enough. I can now loop through my posts and skip those I've explicitly marked to `omit`. This requires less screwing around with posts in the future, assuming that every new post will be featured.

Now I needed to grab the most-recent 3 posts by date, skipping those marked `omit`. Liquid has a `where_exp` array filter, but as far as I can tell, it's only useful for outputting stuff. So I couldn't do something like:

{% highlight liquid linenos %}
{% raw %}
{% for posts in site.posts | where_exp: "omit", "omit != true" %}
  # woohoo, break after 3
{% endfor %}
{% endraw %}
{% endhighlight %}

The best solution I could come up with was to create variables that indicated whether a feature had already been output, and then once all three of those variables are true, I know I'm done with features and can continue to the rest of the posts.

{% highlight liquid linenos %}
{% raw %}
{% assign feature1 = false %}
{% assign feature2 = false %}
{% assign feature3 = false %}
{% for post in site.posts %}
  # if we've output everything, bail!
  {% if feature1 and feature2 and feature3 %}
    {% break %}
  # check if we want to skip this post
  {% elsif post.omit %}
    {% continue %}
  {% endif %}

  {% if feature1 == false %}
    # output jumbotron
    # output some more markup needed for our next row
    {% assign feature1 = true %}
    {% continue %}
  {% endif %}

  {% unless feature2 and feature3 %}
    # these two have the same markup, so we'll loop and reuse it
    {% if feature2 == false %}
      {% assign feature2 = true %}
      {% continue %}
    {% elsif feature3 == false %}
      {% assign feature3 = true %}
      # we're done, bail!
      {% break %}
    {% endif %}

{% endfor %}
{% endraw %}
{% endhighlight %}

Finally, I have to skip the three featured stories I've already output and continue on with the rest of the posts. Fortunately, Liquid provides an easy param `offset` to do this:

{% highlight liquid linenos %}
{% raw %}
{% for post in site.posts offset: 3 %}
  # loop and output
{% endfor %}
{% endraw %}
{% endhighlight %}

Lots of seemingly redundant conditional logic, but it works. <em class="text-secondary">(Random aside: My first programming teacher had a poster on his wall that read "But it works!" with a big red line through it. It meant that there was always a better way to do what you've done, and in this case I'm almost certain that's true but he's not here to tell me. Hah.)</em>.

Finally, I had to add some styling to the featured boxes. This took a bit of playing, specifically getting a nice image background, figuring out how to position it, and making it do something cool to grab a reader's attention. It's been a while since I've worked with things like that, so it was actually fun.

Aside from the featured parts, I added a photo of my ugly mug and an HTML validator link in the footer (which, sadly, fails a lot with the `<code>` generator and some of my markup choices in my longer posts with definition lists). Next up I'd like to get the global nav working so you can get to a rollup of posts within a certain category, and pagination since the home page is getting pretty long.
