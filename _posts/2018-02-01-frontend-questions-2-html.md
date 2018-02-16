---
title: "Answering FEE Interview Questions - Part 2: HTML"
date: 2018-02-01
categories: [HTML]
---

Welcome to part 2 in my series of inarticulate ramblings where I'm working through a worthy collection of potential interview questions. In [part 1]({% post_url 2018-02-01-frontend-questions-1 %}) I worked through some general questions about security, accessibility and development style. Today's questions will be more targeted to HTML.

<dl>
  <dt><h6><b>Q.</b> What does a <code>doctype</code> do?</h6></dt>
  <dd>
    <p>
    The doctype is the very first tag a browser encounters when rendering a page. It tells the browser what version of HTML follows (which <abbr title="Document Type Definition">DTD</abbr> the page adheres to, if any). Since the introduction of HTML5, doctype's value has gotten ridiculously simple:
{% highlight html linenos %}
<!doctype html>
{% endhighlight %}
    </p>
    <p>IE used to have a fun bug where if you had any content prior to the doctype (white space, comments), it would render the page in quirks mode, often screwing up your page layout in fun and exciting ways.</p>
    <p>Since previous HTML standards relied upon a DTD to define the grammar allowed, there were several doctype variants available to us, depending on what sort of page was being authored, and to what level of standards we wanted to adhere to:
{% highlight html linenos %}
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" 
"http://www.w3.org/TR/html4/strict.dtd">

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 
Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" 
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
{% endhighlight %}
    </p>

  </dd>
  <dt><h6><b>Q.</b> How do you serve a page with content in multiple languages?</h6></dt>
  <dd>
    <p>This requires a few details, both in the UI and in the implementation. The biggest UI consideration is to provide a clear and commonly-used widget to prompt the user to change languages. Something like a dropdown with flags and translated language names is something that's seen on many websites.</p>
    <p>Another nice feature is to honor the user's <code>Accept-Language</code> HTTP header, which can contain a comma-separated list in order of preference of languages. So if the user's request comes with <code>Accept-Language: de, en</code>, then attempt to serve the page in German first, and fallback to English. In this case, it's important to give precedence to an explicit user choice if that's provided. For example, the first time that user visits the page, provide its content in German. But if he uses your selection widget, then allow that choice to take precedence in subsequent requests.</p>
    <p>Some servers will also attempt to determine locale by IP and automatically serve the page in that language. This is a nice convenience if it can be done accurately, but it's not always ideal (e.g., accessing a site through a VPN in another country).</p>
    <p>On the markup side, it's important to instruct the browser which language is being displayed by using the <code>lang</code> attribute on the page's <code>&lt;html&gt;</code> tag, for example <code>&lt;html lang="en"&gt;</code>. For languages in any direction other than left-to-right, you need to add the <code>dir</code> attribute, e.g. <code>&lt;html lang="ar" dir="rtl&gt;</code>. Finally, you need make sure that your page has a <code>charset</code> defined that will provide all the necessary characters for that language.</p>
  </dd>
  <dt><h6><b>Q.</b> What are <code>data-</code> attributes good for?</h6></dt>
  <dd>
    <p>It's like the crust in stuffed-crust pizza, you can put anything you want in there.</p>
    <p>The main uses I've had in the past are through JS, where, if you're a rational person and not worried about IE&lt;11, you can use the really sweet <code>dataset</code> property:</p>
{% highlight html linenos %}
<div id="example" data-value="3" data-is-dirty="false"></div>
{% endhighlight %}
{% highlight js linenos %}
var el = document.getElementById( 'example' );
if ( el.dataset.isDirty == 'true' ) {
  el.dataset.value++;
  el.dataset.isDirty = false;
}
{% endhighlight %}

    <p>The downside is that things like boolean evaluations need to be done as literals, because the values of <code>data-</code> attributes are treated as strings.</p>
    <p>Data attributes can also be used as styling hooks, using the attribute selectors.</p>
{% highlight css linenos %}
div[data-is-dirty='true'] {
  color: #f00;
}
div[data-is-dirty='false'] {
  color: #0f0;
}
{% endhighlight %}
  </dd>
  <dt><h6><b>Q.</b> Describe the difference between a cookie, sessionStorage and localStorage.</h6></dt>
  <dd>
    <p>Starting with <code>sessionStorage</code> and <code>localStorage</code> is easiest, because they are very similar, differing in that <code>localStorage</code> persists even after the tab or window is closed. The interface is super simple, setting or getting key:value pairs through the desired property:</p>
{% highlight js linenos %}
localStorage.setItem( 'name', 'Tim' );
sessionStorage.setItem( 'name', 'Tim' );
alert( localStorage.getItem( 'name' ) + ' ' 
       + sessionStorage.getItem( 'name' ) );
{% endhighlight %} 
    <p>Cookies are also key:value pairs, comprised of text strings and with an overall size limit of 4K per cookie. Cookies are sent with every request to the server, and are often used for authentication purposes. The implementor can set expiry times on cookies, so they may expire during an inactive user session (e.g., your banking site).</p>
  </dd>
  <dt><h6><b>Q.</b> Describe the difference between &lt;script&gt;, &lt;script async&gt; and &lt;script defer&gt;.</h6></dt>
  <dd>
    <code>&lt;script&gt;</code>: Since the document is parsed in order, as the script tag is encountered, it's downloaded and executed immediately. This can cause delays as a synchronous request is made for the resource (meaning the download of the rest of the resources is paused) and the script executes, after which, HTML parsing continues.
  </dd>
  <dd>
    With the <code>async</code> attribute, the script is fetched during HTML parsing, and then executed as soon as it's available. The execution will pause the document parser if it's still running, and scripts downloaded asynchronously could be executed out of order. This is the recommended attribute to use for non-essential scripts, like analytics and advertising.
  </dd>
  <dd>
    <code>defer</code> will download as the document is being parsed and will be executed in order after the document has been parsed, but prior to <code>DOMContentLoaded</code>.    
  </dd>
  <dt><h6><b>Q.</b> Why is it generally a good idea to position CSS <code>&lt;link&gt;</code>s between <code>&lt;head&gt;&lt;/head&gt;</code> and JS <code>&lt;script&gt;</code>s just before <code>&lt;/body&gt;</code>? Do you know any exceptions?</h6></dt>
  <dd>
    <p>While researching this answer, there are a lot of folks saying that the HTML spec says that's the only valid place for a <code>link</code> element, but if I'm reading <a href="https://www.w3.org/TR/2017/REC-html52-20171214/links.html#body-ok" target="_blank">this right</a>, it can appear anywhere:</p>
    <blockquote class="blockquote">Keywords that are body-ok affect whether link elements are allowed in the body. The body-ok keyword defined by this specification is stylesheet. Other specifications can also define body-ok keywords.</blockquote>
    <p>Pragmatically speaking, stylesheets belong in the head so that their rules can be applied to the document that will be immediately parsed below it. Imagine having a document fetched and parsed, and then suddenly applying a massive CSS file to it. You'd get a nasty <abbr title="Flash of Unstyled Content">FOUC</abbr>, as well as performance issues while the page is redrawn.</p>
    <p>As for loading <code>&lt;script&gt;</code> tags just before the body, this is very similar to using a <code>defer</code> attribute. As the document is parsed top-to-bottom, putting scripts down below will allow the document to be parsed prior to any scripts downloading and executing. Since <code>defer</code> achieves a similar effect (in addition to downloading while the HTML is also downloading), you can keep scripts in the <code>&lt;head&gt;</code> of your document with that attribute.</p>
    <p>The requirement for <code>defer</code> scripts though is that they must not contain <code>document.write();</code> as this will affect the document parsing.</p> 
  </dd>
  <dt><h6><b>Q.</b> Why you would use a <code>srcset</code> attribute in an <code>&lt;img&gt;</code> tag? Explain the process the browser uses when evaluating the content of this attribute.</h6></dt>
  <dd>
    <p>This is one of the cool new things I learned about last week. The <code>srcset</code> attribute allows you to provide responsive images to the browser, allowing it determine the best image source to use. When used with the <code>sizes</code> attribute, you can define breakpoints the browser can use to determine which image source to use for a particular element.</p>
    <p><code>srcset</code> is also useful for resolution switching. That is, the same sized image element, but providing a higher-res image for devices with higher pixel densities. This doesn't require the corresponding <code>sizes</code> attribute.</p>
  </dd>
</dl>