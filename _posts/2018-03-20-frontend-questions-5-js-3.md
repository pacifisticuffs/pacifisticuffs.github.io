---
title: "Answering FEE Interview Questions - Part 4: JS the 3th"
date: 2018-03-20
categories: [JS]
excerpt: <p>In which I continue to stumble through the seemingly endless trove of <a href="https://github.com/h5bp/Front-end-Developer-Interview-Questions" target="_blank">Front-end Interview Questions</a> and maybe answer them.</p>
---

Previously: [part 4 - js #1]({% post_url 2018-03-06-frontend-questions-4-js %}) --- [part 4 - js #2]({% post_url 2018-03-15-frontend-questions-4-js-2 %})

The number of JS questions in the [Front-end Interview Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions){:target="_blank"} repo is pretty extensive, so I'm going to break them up into several blorg posts. This is part 3 of my JS answers.

<dl>
  <dt><h5><b>Q.</b> Difference between document <code>load</code> event and document <code>DOMContentLoaded</code> event? Why would you use something like the load event? Does this event have disadvantages? Do you know any alternatives, and why would you use those?</h5></dt>
  <dd>
    <p>I'm combining a couple questions in this answer since there's some overlap.</p>
    <h6><code>DOMContentLoaded</code></h6>
    <p>This event fires when the DOM from the inintial HTML has finished loading and parsing. It does not wait for external resources to load. This is a good event to hook to when you will be modifying the page's content, but you need to be sure that any structure you might need has already loaded.</p>
    <h6><code>load</code></h6>
    <p>This window event fires when all resources for the page have loaded, including subframes, images and style sheets. Because of its dependency on additional requests and possibly external servers, it can take significantly longer to fire than <code>DOMContentLoaded</code>.</p>
    <p>In the interest of speed and taking care of our users though, this is an ideal event to listen to to load our ads. They're not relevant to our content and usually just irritate anyone reading, so it's best to wait until the important pieces of our site have loaded and only then loading ads.</p>
  </dd>
  <dt><h5><b>Q.</b> What is the difference between <code>==</code> and <code>===</code>?</h5></dt>
  <dd>
    <p>The difference is that <code>==</code> does type conversion, attempting to make both sides of the equality check the same type before doing a value comparison, whereas <code>===</code> checks both type <em>and</em> value.</p>
    <button class="btn btn-success btn-sm" id="test1">Check yoself</button><br/>
    <textarea id="results1" rows="11" cols="30" class="pre">Results:</textarea>
<script>
(function() {
  var results = document.getElementById( 'results1' ),
      btn     = document.getElementById( 'test1' );

  btn.addEventListener( 'click', function() {
    var output = '';
    output += 'true ==  true:      ' + (true == true)       + '\n';
    output += 'true === true:      ' + (true === true)      + '\n';
    output += '1    ==  true:      ' + (1 == true)          + '\n';
    output += '1    === true:      ' + (1 === true)         + '\n';
    output += "'1'  ==  true:      " + ('1' == true)        + '\n';
    output += "'1'  === true:      " + ('1' === true)       + '\n';
    output += "'0'  ==  false:     " + ('0' == false)       + '\n';
    output += "'0'  === false:     " + ('0' === false)      + '\n';
    output += 'null ==  undefined: ' + (null == undefined)  + '\n';
    output += 'null === undefined: ' + (null === undefined) + '\n';

    results.innerHTML = output;
  });
})();
</script>
  </dd>
  <dt><h5><b>Q.</b> Explain the same-origin policy with regards to JavaScript.</h5></dt>
  <dd>
    <p>The same-origin policy exists to prevent cross-site scripting attacks. The origin of a page is defined by its protocol (http vs https), port, and domain name. Here's a table showing some comparisons from <a href="https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy" target="_blank">MDN</a>:</p>
    <figure class="figure">
      <figcaption class="figure-caption">The table gives examples of origin comparisons to the URL <code>http://store.example.com/dir/page.html</code>:</figcaption>
      <table class="table-sm table-bordered">
        <thead class="thead">
          <tr>
            <th>URL</th>
            <th>Outcome</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>http://store.example.com/dir2/other.html</code></td>
            <td>Success</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td><code>http://store.example.com/dir/inner/another.html</code></td>
            <td>Success</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td><code>https://store.example.com/secure.html</code></td>
            <td>Failure</td>
            <td>Different protocol</td>
          </tr>
          <tr>
            <td><code>http://store.example.com:81/dir/etc.html</code></td>
            <td>Failure</td>
            <td>Different port</td>
          </tr>
          <tr>
            <td><code>http://news.example.com/dir/other.html</code></td>
            <td>Failure</td>
            <td>Different host</td>
          </tr>
          </tbody>
      </table>
    </figure>
    <p>In two of the failures above (not when attempting cross-protocol), we would not be able to use <code>XMLHttpRequest</code>s to those URLs without first setting <code>document.domain = 'example.com'</code> on both the requesting page and the destination URL.</p>
  </dd>
  <dt><h5><b>Q.</b> Make this work:
<code>duplicate([1,2,3,4,5]); // [1,2,3,4,5,1,2,3,4,5]</code></h5></dt>
  <dd>
  <p>This is a pretty easy one. There seems to be one subtle detail though, in that we want to include the brackets around our string.</p>
{% highlight js linenos %}
function duplicate( arr ) {
  return arr.concat( arr );
}
// use JSON.stringify() to include the brackets for the literal
console.log( JSON.stringify( duplicate([1,2,3,4,5]) ) );
{% endhighlight %}
    <p>
    <button class="btn btn-success btn-sm" id="dupe">Duplicate!</button><br/>
    <textarea class="pre" id="results2" rows="3" cols="30"></textarea>
<script>
(function() {
  var btn     = document.getElementById( 'dupe' ),
      results = document.getElementById( 'results2' );

  function duplicate( arr ) {
    return arr.concat( arr );
  }
  btn.addEventListener( 'click', function() {
    results.innerHTML = JSON.stringify( duplicate([1,2,3,4,5]) )
  });
})();
</script>
    </p>
  </dd>
  <dt><h5><b>Q.</b> Why is it called a Ternary operator, what does the word "Ternary" indicate?</h5></dt>
  <dd>
    <p><em>Ternerary</em> indicates 3, <em>binary</em> 2, and <em>unary</em> 1. In a ternary operator, there are three parts to the operation:</p>
    <code>conditional logic ? evals to true : evals to false</code>
    <table class="table table-bordered table-sm">
      <thead>
        <tr>
          <th>1</th>
          <th>2</th>
          <th>3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>conditional logic ?</td>
          <td>evals to true :</td>
          <td>evals to false</td>
        </tr>
      </tbody>
    </table>
    <p>It's a nice concise way to perform <code>if...then...else</code> statements, particularly useful when doing variable assignments:</p>
{% highlight js linenos %}
function isEven( num ) {
  var result = num % 2 ? false : true;
  return result;
}
{% endhighlight %}
  </dd>
  <dt><h5><b>Q.</b> What is <code>"use strict";</code>? what are the advantages and disadvantages to using it?</h5></dt>
  <dd>
    <p>Introduced in ECMAScript 5, <code>"use strict";</code> enables strict mode in your code. It can be used either at the function level, or globally at the top of an included script file. It's intended to get rid of the some of the assumed behavior in JS by throwing more errors where the engine previously ignored bad behavior or made assumptions about intent.</p>
    <p><a href="https://johnresig.com/blog/ecmascript-5-strict-mode-json-and-more/" target="_blank">John Resig</a> has an oft-cited write up from several years ago that details strict mode quite well, but in a nutshell:</p>
    <ul>
      <li><code>foo = 1</code> will throw an error; requires <code>var</code> statement or explicitly making it a property of <code>window</code>. E.g., <code>window.foo = 1;</code></li>
      <li><code>{ foo: true, foo: false }</code> will result in an error because you're redefining a property</li>
      <li>using "eval" as a property, variable, or function name will throw an error; additionally, no new variables can be defined via <code>eval()</code></li>
      <li><code>.caller</code> and <code>.callee</code> will throw an error</li>
      <li><code>with() {}</code> statements are completely deprecated</li>
    </ul>
    <p>Strict mode is mostly beneficial to our development, as it forces developers to be more explicit in their intentions. The only major downside to it is that if it's turned on globally, there are likely many libraries and legacy code that will throw errors where they used to hum along just fine.</p>
  </dd>
  <dt><h5><b>Q.</b> Create a <code>for</code> loop that iterates up to 100 while outputting <output>"fizz"</output> at multiples of 3, <output>"buzz"</output> at multiples of 5 and <output>"fizzbuzz"</output> at multiples of 3 and 5</h5></dt>
  <dd>
    <p>This is an old standard:</p>
{% highlight js linenos %}
(function() {
  'use strict';
  var output;

  for ( var x = 1; x <= 100; x++ ) {
    output = x + ': ';
    output += ( x % 3  ) ? '' : 'fizz';
    output += ( x % 5  ) ? '' : 'buzz';
    console.log( output );
  }
})();
{% endhighlight %}
    <p>
      <button id="bizz" class="btn btn-small btn-success">bizz buzz</button><br/>
      <textarea id="results3" class="pre" cols="20" rows="10">Results:</textarea>
<script>
(function() {
  'use strict';
  var btn     = document.getElementById( 'bizz' ),
      results = document.getElementById( 'results3' );

  btn.addEventListener( 'click', function() {
    var output  = '';
    for ( var x = 1; x <= 100; x++ ) {
      output += x + ': ';
      output += ( x % 3  ) ? '' : 'fizz';
      output += ( x % 5  ) ? '' : 'buzz';
      output += '\n';
    }
    results.innerHTML = output;
  });
})();
</script>
    </p>
  </dd>
  <dt><h5><b>Q.</b> Why is it, in general, a good idea to leave the global scope of a website as-is and never touch it?</h5></dt>
  <dd>
    <p>If you've read through more of my answers to these JS questions, you may have noticed that I'm big on removing ambiguity from code. This means using shunning languages that rely on significant indentation, using curly braces, semicolons, <code>'use strict';</code>, and explicitly defining variables where they're used. One of the original sins of JS is that it assumes global (<code>window</code>) scope, meaning that if I just randomly typed <code>blurt = 10;</code> in my code somewhere, that variable will become global, polluting the namespace and confusing the poor bastard maintaining it after me. Additionally, if that maintainer were also a fan of onomatopoeia and used the variable <code>blurt</code>, he would clobber mine, leading to some silly and easily-prevented bugs in our code.</p>
    <p>Fortunately, strict mode has made the omission of <code>var</code> throw errors now, so that mistake should eventually vanish from most code. There're still the significant issues of maintenance, context, and collisions. With so many libraries in use now, it's important that they (and we as consumers) do not rely upon globals for our code. When using the module pattern, we should instead be passing in as parameters any potential global library variables we'll need in our module. This gives a future reader of our code important context down the road when maintenance becomes important.</p>
  </dd>
  <dt><h5><b>Q.</b> Explain what a single page app is and how to make one SEO-friendly.</h5></dt>
  <dd>
    <h6>What it is</h6>
    <p>It's a helluva lot of JS, usually relying upon a library like <a href="http://emberjs.com/" target="_blank">Ember</a> or <a href="https://angularjs.org/" target="_blank">Angular</a>. It has state, models, routing (and bookmarking!), and history. It distributes some of the processing onus on the client instead of the server, but usually relies upon a well-written RESTful server API (which is good for everyone involved for longevity). As far as the UX goes, pages are comprised of components and templates and requests happen asynchronously, so full-page refreshes are not required, making the page responsive and snappy for the user.</p>

    <h6>SEO and Single-Page Apps</h6>
    <p>For cross-browser friendliness, URLs in webapps have traditionally been managed using the hash: <code>/posts/#post-title</code>, <code>/posts/#another-post-title</code>. Now that older browsers that didn't fully support HTML5's history management have been deprecated though, apps can finally use <code>history.pushState()</code> to provide the world with pretty URLs and perhaps become easier for search engines to crawl.</p>
    <p>Beyond the address bar, there are other issues with crawlers. Because the payload when navigating a webapp is typically just JSON, a search engine may not know that a page has completed loading and may only index a small amount of content. There are some solutions to this though, as many frameworks now support server-side rendering.</p>
  </dd>
  <dt><h5><b>Q.</b> What is the extent of your experience with Promises and/or their polyfills? What are the pros and cons of using Promises instead of callbacks?</h5></dt>
  <dd>
    <p>My experience is admittedly limited. I was introduced to promises back in 2013 at LinkedIn, when we were working on a major rewrite of the profile page. The rewrite included JS templating, tons of async calls to fetch individual sections, edit-in-place, I think drag-and-drop as well. As promises weren't yet a part of vanilla JS, we were using jQuery's implementation, which as I understand it wasn't entirely true to what is now the standard.</p>
    <p>Because of my limited experience with them, I can't strongly argue in favor of or oppose their use. I read <a href="https://developers.google.com/web/fundamentals/primers/promises" target="_blank">this great introduction</a> to them, and while I was happy to be following along, as the example progressed and got more complex, I found that just reading the code, let alone understanding its flow, became pretty tiresome. The major benefit of promises is that they're intended to save us from "callback hell," where we may be cascading async functionality through a series of nested callbacks. This sucks, but chaining a bunch of <code>.then()</code> and <code>.catch()</code> statements together also makes for a pretty confusing flow.</p>
    <p>At the <a href="https://developers.google.com/web/fundamentals/primers/promises#bonus_round_promises_and_generators" target="_blank">bottom of that intro to promises</a>, there is another introduction, this time to generators, a new feature in ES6. Now <strong>this</strong> looks like something I could get behind. The rewritten code to fetch all the content on his sample page using the generator functions makes a lot more sense to me. I look forward to getting more familiar with these and <a href="https://developers.google.com/web/fundamentals/primers/async-functions" target="_blank">async functions</a>.</p>
  </dd>
  <dt><h5><b>Q.</b> What are some of the advantages/disadvantages of writing JavaScript code in a language that compiles to JavaScript?</h5></dt>
  <dd>
    <h6>Cons, as I see them (having never used a transpiler):</h6>
    <ol>
      <li>I know how to write JS (ok, well, I sort of know it). Why do I need to learn <em>another</em> language to write a language I already know?</li>
      <li>I should be using a <a href="http://jshint.com/" target="_blank">linter</a> already that <a href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.jshint" target="_blank">integrates with my IDE of choice</a>, so I can avoid silly mistakes like omitting a <code>var</code> statement, and presumably that linter can be configured to adhere to your organization's coding patterns.</li>
      <li>I don't find the syntax of CoffeeScript to be any easier to understand than vanilla JS.</li>
      <li>I don't want to have to install yet another freaking developer tool to handle compilation.</li>
      <li>I think significant indentation is one of the dumbest concepts ever conceived in a programming language.</li>
      <li>I ALREADY KNOW JS! (being terrible at it doesn't <em>usually</em> make me understand its syntax less)</li>
    </ol>
    <h6>Pros?</h6>
    <p>I have never used a language that compiles into JS, so I don't know!</p>
  </dd>
  <dt><h5><b>Q.</b> What tools and techniques do you use debugging JavaScript code?</h5></dt>
  <dd>
    <p>Chrome's devtools, Firebug (when it was a thing), Safari's dev console, <code>debugger</code> statements, <code>console.log()</code>.</p>
    <p>Firebug was my first foray into JS debugging, and it's probably the tool that led me to actually <em>liking</em> JS development. Microsoft's attempts at debugging tools were so riddled with bugs themselves that they were no more useful than putting a bunch of <code>alert()</code>s in your code. Chrome has since supplanted my love of Mozilla products.</p>
  </dd>
</dl>
