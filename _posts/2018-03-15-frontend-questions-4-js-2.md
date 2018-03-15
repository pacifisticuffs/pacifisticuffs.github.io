---
title: "Answering FEE Interview Questions - Part 4: JS the 2rd"
date: 2018-03-15
categories: [JS]
---

Previously: [part 3 - css]({% post_url 2018-02-06-frontend-questions-3-css %}) --- [part 4 - js #1]({% post_url 2018-03-06-frontend-questions-4-js %})

The number of JS questions in the [Front-end Interview Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions){:target="_blank"} repo is pretty extensive, so I'm going to break them up into several blorg posts. This is part 2 of my JS answers.

<dl>
  <dt><h6><b>Q.</b> Difference between: <code>function Person(){}</code>, <code>var person = Person()</code>, and <code>var person = new Person()</code>?</h6></dt>
  <dd>
  <p><code>function Person(){}</code> is a function declaration, creating a named function that can later be called via <code>Person()</code>.</p>
  <p><code>var person = Person()</code> is executing the function named Person, and storing its return value in the variable named person.</p>
  <p><code>var person = new Person()</code> is creating an instance of the object (or class) Person via the constructor pattern. The new object will inherit Person's prototype.</p>
  </dd>
  <dt><h6><b>Q.</b> What's the difference between <code>.call</code> and <code>.apply</code>?</h6></dt>
  <dd>
  <p>The main function of these two methods is to set the context of a function call, so that <code>this</code> assumes the identity of the object that is passed in. Here's what happens without it:</p>
{% highlight js linenos %}
function openBeverage() {
  this.open = true;
}
function drinkBeverage( type ) {
  if ( !this.open ) {
    throw 'You poke yourself in the eye with an unopened bottle';
  }

  this.type = type;  
  return this.drink();
}
// no given context for this, it assumes window when not in strict mode
openBeverage(); 
drinkBeverage( 'whiskey' ); // error! this.drink is not a function!
{% endhighlight %}
    <p>Now let's give it some context:</p>
{% highlight js linenos %}
var obj = {
  open   : false,
  drink  : function() {
    if ( this.type == 'beer' ) {
      return this.guzzle();
    }
    else {
      return this.sip();
    }
  },
  guzzle : function() {
    return 'burp';
  },
  sip    : function() {
    return 'whiskey breath';
  }
};
// Uncaught: "You poke yourself in the eye with an unopened bottle
drinkBeverage.call( obj, 'beer' );
drinkBeverage.apply( obj, ['beer']);

// ok, let's open our bottle
openBeverage.call( obj );

// using .call(), we pass in csv of the necessary params
drinkBeverage.call( obj, 'beer' );

// using .apply(), we pass in a single array with our param values
drinkBeverage.apply( obj, ['whiskey']);
{% endhighlight %}
    <p>By passing in an object, our function now has a relevant value for <code>this</code>. The main difference now between <code>.call()</code> and <code>.apply()</code> is that <code>.call()</code> relies upon a list of parameters to be passed to the called function (e.g., <code>.call( obj, param1, param2, param3))</code>, and <code>.apply()</code> uses an array to send params, <code>.apply( obj, [param1, param2, param3])</code>.</p>
  </dd>
  <dt><h6><b>Q.</b> Explain <code>Function.prototype.bind</code>.</h6></dt>
  <dd>
  <p><code>.bind()</code> has a similarity with <code>.call()</code> and <code>.apply()</code>, in that it is used to pass in an object to give context to <code>this</code> within the bound function:</p>
{% highlight js linenos %}
function compute() {
  return this.x + this.y;
}
compute(); // NaN, referencing x and y within the window scope
var obj = {
  x : 1,
  y : 2
};
compute.bind( obj )(); // calls it immediately, returns 3
{% endhighlight %}
    <p>If you notice when we called <code>.bind()</code>, we had to throw some parentheses on the end to immediately invoke the newly-bound function. Unlike <code>.call()</code> and <code>.apply()</code>, which immediately execute the function, <code>.bind()</code> returns a new function with the permanently-bound context for <code>this</code>.</p>
    <p>Another cool feature is that you can apply partial parameters to a bound function:</p>
{% highlight js linenos %}
function drink() {
  var args = Array.prototype.slice.call( arguments ),
      last = args.pop();
  return args.join(', ') + ', and ' + last;
}
// no need for context with this example
drink = drink.bind( null, '1 Bourbon', '1 Scotch' );
drink( '1 Beer' ); // '1 Bourbon, 1 Scotch, and 1 Beer'
{% endhighlight %}     
  </dd>
  <dt><h6><b>Q.</b> When would you use <code>document.write()</code>?</h6></dt>
  <dd>
  <p>You...wouldn't? I honestly can't think of a reason to use it. It's slow, it's blocking, it can't be used after document load.</p>
  </dd>
  <dt><h6><b>Q.</b> What's the difference between feature detection, feature inference, and using the UA string?</h6></dt>
  <dd>
  <p>UA sniffing is a pretty dated practice, where we'd look at the UA of the request and make decisions based upon what we detected. Usually it was to make up for something silly that IE was about to do.</p>
  <p>Feature inference looks for the availability of some particular object or function, and then infers from its availability that something else is likely available:</p>
{% highlight js linenos %}
if ( localStorage ) {
  sessionStorage.setItem( 'key', 'value' );  
}  
else {
  // no sessionStorage :'(
}
{% endhighlight %}
    <p>Feature detection is somewhat similar to inference in that it checks that an object or function exists before attempting to use it, but it's explicitly checking for that functionality, and not making assumptions beyond that. Feature detection is extremely useful for things like polyfills.</p> 
  </dd>
  <dt><h5><b>Q.</b> Explain <abbr title="Asynchronous Java and XML">Ajax</abbr> in as much detail as possible. What are the advantages and disadvantages of using Ajax?</h5></dt>
  <dd>
  <p>Let's start with the acronym: <b>A</b>synchronous <b>J</b>avascript <b>a</b>nd <b>X</b>ML. It's a handy term used to describe making requests to the server (whether for creating or updating records, or modifying the UI) via the <code>XMLHttpRequest()</code> (XHR) API. This object allows the browser to asynchronously make a request and handle responses without requiring a full-page reload, leading to a faster and more responsive UI. Though XML is in the name, the response from the server can be anything: HTML, JSON, or even plaintext.</p>
  <h6>Advantages:</h6>
  <ul>
    <li><b>It's fast</b> &mdash; many pages on a site share a chrome, so if you can fetch just the changing parts of a page you greatly limit the amount of data you're moving</li>
    <li><b>It's responsive</b> &mdash; meaning the results of a user's interaction typically appear quickly. This has given rise to the number of single-page apps that exist on the web today</li>
  </ul>

  <h6>Disadvantages:</h6>
  <ul>
    <li><b>History is trashed</b> &mdash; the browser's default back/forward button functionality will not be present without additional work by the developer to support it. This will also affect a user's ability to bookmark pages or states in your app</li>
    <li><b>Forms require both Ajax and non-Ajax support</b> &mdash; JS breaks sometimes, and unless you want to block users from using your site, you need to support a full-page flow in addition to the Ajax flow</li>
    <li><b>Same-origin policy</b> &mdash; without some extra work on the front- and back-end, you will not be able to make any requests across domains</li>
  </ul>
  </dd>
  <dt><h5><b>Q.</b> Explain how JSONP works (and how it's not really Ajax).</h5></dt>
  <dd>
  <p><abbr title="Javascript Object Notation with Padding">JSONP</abbr> is a clever way to work around the same-origin policy of XHR by appending dynamically-generated script tags to your DOM whose contents execute a global callback on your page and inject data.</p>
  <p>First, you create a callback function on your page:</p>
{% highlight js linenos %}
window.cb = function( data ) {
  // we only want the data node of the returned blob
  data = data.data;

  // elements we'll be fooling with
  var img = document.createElement( 'img' ),
      txt = document.createElement( 'figcaption' ),
      fig = document.createElement( 'figure' );

  img.className = 'figure-img w-50 rounded';
  txt.className = 'figure-caption';
  fig.className = 'figure';

  // set the content of our new elements
  img.src = data.avatar_url;
  txt.innerHTML = data.name;

  // append them to our parent figure element
  fig.appendChild( img );
  fig.appendChild( txt );

  // insert the new element in the dom    
  btn.parentNode.insertBefore( fig, btn );
};
{% endhighlight %}
<p>Next we'll have an IIFE to contain our utility stuff:</p>
{% highlight js linenos %}
(function() {
  var btn = document.getElementById( 'fetch-json' );
  btn.addEventListener( 'click', function() {
    btn.classList.add( 'disabled' );
    btn.setAttribute( 'disabled', true );

    // creates the dom node we'll insert
    var script = document.createElement( 'script' );
    script.setAttribute( 'id', 'json-script' );
    script.setAttribute( 'src', 'https://api.github.com/users/pacifisticuffs?callback=cb' );
    
    // add the new script to the page's head
    document.getElementsByTagName( 'head' )[0].appendChild( script );
  });
})();
{% endhighlight %}
<p>We'll be hitting a fairly trustworthy API on Github that will retrieve my userdata and then pass it to the global function <code>cb()</code>, which will append a new image on the page. Go ahead and click!</p>
<button id="fetch-json" class="btn btn-small btn-success d-block">Fetch some data</button>
<br />
<script>
(function() {
  var btn = document.getElementById( 'fetch-json' );
  btn.addEventListener( 'click', function() {
    btn.classList.add( 'disabled' );
    btn.setAttribute( 'disabled', true );

    // creates the dom node we'll insert
    var script = document.createElement( 'script' );
    script.setAttribute( 'id', 'json-script' );
    script.setAttribute( 'src', 'https://api.github.com/users/pacifisticuffs?callback=cb' );
    
    // add the new script to the page's head
    document.getElementsByTagName( 'head' )[0].appendChild( script );
  });

  // registers a global callback
  window.cb = function( data ) {
    // we only want the data node of the returned blob
    data = data.data;

    // elements we'll be fooling with
    var img = document.createElement( 'img' ),
        txt = document.createElement( 'figcaption' ),
        fig = document.createElement( 'figure' );

    img.className = 'figure-img w-50 rounded';
    txt.className = 'figure-caption';
    fig.className = 'figure';

    // set the content of our new elements
    img.src = data.avatar_url;
    txt.innerHTML = data.name;

    // append them to our parent figure element
    fig.appendChild( img );
    fig.appendChild( txt );

    // insert the new element in the dom    
    btn.parentNode.insertBefore( fig, btn );
  };
})();
</script>
    <p>As to why JSONP isn't Ajax, that has to do with the capabilities of both. Ajax allows us to perform all sorts of verbs on the server (<code>HEAD</code>, <code>POST</code>, <code>GET</code> etc.) and then gives us full access to the headers of the request and those returned with each response. JSONP on the other hand only allows us to <code>GET</code> from a remote server with no insight on the inner-workings of that request.</p>
  </dd>
  <dt><h5><b>Q.</b> Explain "hoisting".</h5></dt>
  <dd>
    <p>Unlike languages like C, or C++, JS features function-level scoping instead of block-level scoping (or rather, it <em>did</em>, up until recently with <code>let</code>). This means that variables declared inside of loops (<code>for (var x = 0; x < arr.length; x++) {} </code> or <code>if ( condition ) {}</code> statements are available to their containing scope, whether that's a function or the <code>window</code> object.</p>
    <p>Though scripts are interpreted top-to-bottom, JS prioritizes certain things over others. In particular, function and variable declarations are "hoisted" from their position in the script to the top of their containing scope. This can be confusing if you're expecting things to proceed in order.</p>
{% highlight js linenos %}
blurt(); // logs undefined, then 'hork'
function blurt() {
  console.log( someVar );
  var someVar = 'hork';
  console.log( someVar );
}
{% endhighlight %}
    <p>Rather than encountering a reference error first, we got <code>undefined</code> instead. That's because JS reorders things a little bit inside the function:</p>
{% highlight js linenos %}
function blurt() {
  var someVar; // the declaration is hoisted up to here
  console.log( someVar );
  someVar = 'hork'; // now it gets a value
  console.log( someVar );
}
// we can execute the function here because the function
// declaration is hoisted above
blurt(); // logs undefined, then 'hork'
{% endhighlight %}
    <p>The declaration occurs before the log, and the assignment happens afterward. </p>
  </dd>
  <dt><h5><b>Q.</b> What's the difference between an "attribute" and a "property"?</h5></dt>
  <dd>
    <p><b>Attributes</b> exist in your markup, and <b>properties</b> exist in your JS (they're HTMLElement object properties). The attribute values present in your markup provide the initial values for the object properties. Attributes are accessed via <code>.getAttribute()</code>. For example, <code>element.getAttribute('value')</code> or <code>element.getAttribute('class')</code>, whereas properties usually have the same or similar name, <code>element.value</code> or <code>element.className</code></p>    
  </dd>
  <dt><h5><b>Q.</b> Why is extending built-in JavaScript objects not a good idea?</h5></dt>
  <dd>
    <p>This question is imposing its own opinion, but it's a valid concern. It's not always a bad idea when it's done safely. See every polyfill out there. What <em>is</em> a bad idea, particularly in multi-developer environments, is overwriting native functionality. Other developers might not be aware of what you've done, or your implementation may be buggy in some way.</p>
  </dd>
</dl>

{% comment %}
```
function duplicate( arr ) {
  return arr.concat( Array.prototype.slice.call( arr ) );
}
```
{% endcomment %}