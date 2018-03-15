---
title: "Remembering Stuff I Used to Know"
date: 2018-01-17
categories: [HTML]
---

As I read through the docs for Jekyll and Bootstrap, I'm naturally going off on tangents and reading more about things that I haven't touched in a while and forgotten. While none of what I'm writing is groundbreaking stuff, it's good to read about it and be reminded of their intended uses and limitations.

- - -

##### HTML Sectioning Elements
HTML5 introduced some improved semantic elements that allow an author to explicitly define page structures, as well as some elements that define their own discrete outlines that don't necessarily contribute to the outline of the entire document. Whereas in HTML4 we relied on the cascade of header elements to define a page's structure implicitly, we can now explicitly construct it.

From a visual perspective, these enhancements don't make a lot of difference, but from a semantics POV, the explicit definition of sections and hierarchy should allow tool makers (search engines, assistive technology, scrapers) to better parse and understand what authors are writing. 


##### Explicit Sections
Elements that lead to new sections within a page's outline:

    <section></section>
    <article></article>


##### Sectioning Roots
These are elements that may have their own outlines, but they don't affect the outline of their ancestor. They may consist of external content like blockquotes and images, or things like form fields which don't define the structure of a page.

###### New guys

    <figure></figure>
    <details></details>

###### Old faithfuls

    <blockquote></blockquote>
    <fieldset></fieldset>
    <td></td>

- - -

##### Other Neat Things
The `<picture>` element is a cool one, giving an author a very extensive and explicit means to provide image sources for different viewing contexts, or provide different image content-types to browsers that support them (like WebP or JPEG-XR). There are also the `srcset` and `sizes` attributes now available on the `<img>` element which provide the browser everything it needs to intelligently pick an image based on viewport or pixel density. Yoav Weiss' [article](https://dev.opera.com/articles/native-responsive-images/){:target="_blank"} was quite helpful in helping me decipher the main differences between the features.


###### The `<progress>` and `<meter>` Tags
I know this isn't groundbreaking or anything, but it was interesting to see these have browser support behind them now. Both of these elements were always previously mimicked/hacked using scaled images or maybe table cells or nested elements, with their width adjusted via CSS.

<p><span style="width:70%" data-value="66">You are about&nbsp;</span>
<progress max="100" value="66" class="html5">66</progress>
done reading my stupid post.</p>

<p>Here's my anxiety level when I'm having a G&amp;T:
<meter class="styled" min="0" max="100" low="25" high="75" optimum="50" value="10">10%</meter></p>

<p>Here's my anxiety level when I realize I have so much to learn before I set foot in an interview:
<meter class="styled" min="0" max="100" low="25" high="50" optimum="10" value="95">95%</meter></p>

- - -

##### A Very Good Friend
It's been a long time since I've had to worry about clearing floats, and I'd forgotten what a headache it could be. Then I stumbled upon the following CSS, and remembered what a revelation it was:
{% highlight css %}
    .clear:after { 
      content: ''; 
      display: block; 
      clear: both; 
    }
{% endhighlight %}
Using Sass at LinkedIn, we used to just have to do `@include clearfix;` and like magic, things just worked. Of course, some mixins can lead to a lot of bloat in your CSS, in addition to developers like me getting rusty and too reliant on tooling.

- - -

##### Some Other Fun Stuff
Just a few other things I found interesting.

###### `<mark>`
There's a tag just for marking highlights! I'm a sucker for semantics, so I'm always excited to see new tags in response to new use cases. `<mark>` just <mark>highlights text</mark>, particularly useful if you're, say, working on an app for annotating educational material.

###### `<details>` &amp; `<summary>`
This is one of the few tags I can think of that produce a native widget in the browser. This show/hide functionality has forever been the job of JS, but it's really cool that it's been turned into native functionality. What's unfortunate though, is that with a native implementation comes native designs, making it difficult to add the interface and design your designers will desire (see also `<meter>`, `<progress>`, `<modal>`).
A demonstration:
<details>
    <summary>Things Tim Likes</summary>
    <ol>
        <li>Whiskey</li>
        <li>Semantics</li>
        <li>Gin</li>
    </ol>
</details>
<p></p>

###### `<fieldset disabled>`
I'm quite familiar with fieldsets, but the ability to put the `disabled` attribute on it and have that apply to the `<fieldset>`'s children is pretty cool! I imagine there are pages of JS out there does just this functionality.

###### `<input type="search" />`
Searching has become required functionality on most sites, so this provides cross-domain autocomplete for previously-entered phrases, also sporting the little "x" icon to clear the box instantly. More stuff that used to require JS but is now being done better by the browser. HTML5 introduced a few new and very useful input types, and it's awesome that UAs have started using this functionality.

###### The [Page Visibility](https://www.w3.org/TR/page-visibility/){:target="_blank"} API
One of the features I appreciate about new browsers in this age of auto-playing nonsense is that they often won't begin unless the document is visible. It'd be super cool to see this functionality extended to the viewport, so that you can easily add this same auto-play/stop functionality without looking at the dimensions of an element with respect to the viewport.

##### In Summation
Fun stuff. This took me days to write, because each link I followed led to another and another, screwing around with a code block somewhere and then trying something out here. It's great thinking about these things again!

<style>
    meter { width: 100%; }
    progress[value] {
        appearance: none;
        border: none;	
        width: 100%; 
        height: 20px;	
        background-color: whiteSmoke;
        border-radius: 3px;
        box-shadow: 0 2px 3px rgba(0,0,0,.5) inset;
        color: royalblue;	
        position: relative;
        margin: 0; 
    }

    progress[value]::-webkit-progress-bar {
        background-color: whiteSmoke;
        border-radius: 3px;
        box-shadow: 0 2px 3px rgba(0,0,0,.5) inset;
    }

    progress[value]::-webkit-progress-value {
        position: relative;	
        background-size: 35px 20px, 100% 100%, 100% 100%;
        border-radius: 3px;
    }

    progress[value]::-webkit-progress-value:after {
        content: '';
        position: absolute;	
        width: 5px; 
        height: 5px;
        top: 7px; 
        right: 7px;	
        background-color: white;
        border-radius: 100%;
    }


    progress[value]::-moz-progress-bar {
        background-image: 
            -moz-linear-gradient( 135deg, transparent, transparent 33%, rgba(0,0,0,.1) 33%, rgba(0,0,0,.1) 66%, transparent 66%), 
            -moz-linear-gradient( top, rgba(255, 255, 255, .25), rgba(0,0,0,.2)), 
            -moz-linear-gradient( left, #09c, #f44);	
        background-size: 35px 20px, 100% 100%, 100% 100%;
        border-radius: 3px;	
    }

    span[data-value] {   
    position: relative; 
    }

    span[data-value]:after {
        content: attr(data-value) '%';
        position: absolute;
    }

    progress::-webkit-progress-value {
        background-image: 
            -webkit-linear-gradient( 135deg, transparent, transparent 33%, rgba(0,0,0,.1) 33%, rgba(0,0,0,.1) 66%, transparent 66%), 
            -webkit-linear-gradient( top, rgba(255, 255, 255, .25), rgba(0,0,0,.2)), 
            -webkit-linear-gradient( left, #09c, #f44);
    }
    progress::-moz-progress-bar {
        background-image: 
            -moz-linear-gradient( 135deg, transparent, transparent 33%, rgba(0,0,0,.1) 33%, rgba(0,0,0,.1) 66%, transparent 66%), 
            -moz-linear-gradient( top, gba(255, 255, 255, .25), rgba(0,0,0,.2)), 
            -moz-linear-gradient( left, #09c, #f44);
    }
</style>