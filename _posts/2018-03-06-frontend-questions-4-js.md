---
title: "Answering FEE Interview Questions - Part 4: JS"
date: 2018-03-06
categories: [JS]
excerpt: In this post I'm going to work through some of the JS questions posed in the <a href="https://github.com/h5bp/Front-end-Developer-Interview-Questions" target="_blank">Front-end Interview Questions</a> repo.
---

Previously: [part 2 - html]({% post_url 2018-02-01-frontend-questions-2-html %}) --- [part 3 - css]({% post_url 2018-02-06-frontend-questions-3-css %})

In this post I'm going to work through some of the JS questions posed in the [Front-end Interview Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions){:target="_blank"} repo.

<dl>
  <dt><h5><b>Q.</b> Explain event delegation. Describe event bubbling.</h5></dt>
  <dd>
    <h6>Bubbling</h6>
    <p>Javascript events occur on the element with which a user interacts, and then they progress up that element's ancestors until the <code>document</code> is reached. This bubbling action is what makes event delegation possible. Bubbling is the default behavior for events, however you can stop an event from moving up its ancestors by using <code>event.stopPropagation()</code>.</p>
{% highlight html linenos %}
<div class="example-1">
  <span class="grandpa">
    <span class="pops">
      <button class="btn btn-success btn-sm">please to click</button>
    </span>
  </span><br />
  <textarea rows="4" cols="50"></textarea>
</div>
{% endhighlight %}
{% highlight js linenos %}
(function(){
  function handler( evt ) {
    var el = document.querySelector( '.example-1 textarea' );
    el.innerHTML += this.nodeName + ' class="' + this.className + '"' + '\n';
  }
  var els = document.querySelectorAll( '.example-1 button, .example-1 div' );
  for( i = 0; i < els.length; i++ ){
    els[ i ].addEventListener( 'click', handler );
  }
})();
{% endhighlight %}
<div class="example-1">
  <span class="grandpa">
    <span class="pops">
      <button class="btn btn-success btn-sm">please to click</button>
    </span>
  </span>
  <p><small>Output:</small><br />
  <textarea rows="4" cols="50"></textarea></p>
</div>
<script>
(function(){
  function handler( evt ) {
    var el = document.querySelector( '.example-1 textarea' );
    el.innerHTML += this.nodeName + ' class="' + this.className + '"' + '\n';
  }
  var els = document.querySelectorAll( '.example-1 button, .example-1 span' );
  for( i = 0; i < els.length; i++ ){
    els[ i ].addEventListener( 'click', handler );
  }
})();
</script>

  <p>Using <code>stopPropagation()</code>, we can stop the event from traveling up to its ancestors. The only difference I've added here is a check to see who the target of the event is:</p>
{% highlight js linenos %}
if ( this.nodeName == 'BUTTON' ) {
  evt.stopPropagation();
}
{% endhighlight %}
<div class="example-2">
  <span class="grandpa">
    <span class="pops">
      <button class="btn btn-success btn-sm">please to click also</button>
    </span>
  </span><br />
  <textarea rows="4" cols="50"></textarea>
</div>
<script>
(function(){
  function handler( evt ) {
      var el = document.querySelector( '.example-2 textarea' );
      if ( this.nodeName == 'BUTTON' ) {
        evt.stopPropagation();
      }
      el.innerHTML += this.nodeName + ' class="' + this.className + '"' + '\n';
    }
  var els = document.querySelectorAll( '.example-2 button, .example-2 span' );
  for( i = 0; i < els.length; i++ ){
    els[ i ].addEventListener( 'click', handler );
  }
})();
</script>
<hr />
  <h6>Event delegation</h6>
  <p>Delegation relies upon bubbling and is an efficient way of handling events on many elements, without having to listen to each one.</p>
{% highlight html linenos %}
<ul class="example-3">
  <li><span>I'm text in a <code>span</code></span></li>
  <li>And I'm just in a <code>li</code></li>
  <li><button class="btn btn-success btn-sm">I have a pretty lame
      <code>button</code> el</button></li>
  <li><p>I'm text in a <code>p</code></p></li>
</ul>
{% endhighlight %}
{% highlight js linenos %}
(function() {
    // listen to the parent list
var el  = document.querySelector( '.example-3' ),
    cls = 'bg-info',
    prev;

function handler( evt ) {
  // since there are children, we only want to work
  // with the nearest parent LI
  var target = evt.target.closest( 'li' );
  if ( !target | prev == target ) {
    return;
  }
  if ( prev ) {
    prev.classList.remove( cls );
  }
  target.classList.add( cls );
  prev = target;
}
el.addEventListener( 'click', handler );
})();
{% endhighlight %}
  <p>Give it a try by clicking the LIs below:</p>
  <ul class="example-3">
    <li><span>I'm text in a <code>span</code></span></li>
    <li>And I'm just in a <code>li</code></li>
    <li><button class="btn btn-success btn-sm">I have a pretty lame <code>button</code> el</button></li>
    <li><p>I'm text in a <code>p</code></p></li>
  </ul>
  <button class="btn btn-info btn-sm" id="add">Click me to add new LIs</button>
  <p>Using the add button, we can dynamically add new items to the list without having to rebind the event handler. This makes debugging easier, your pages more performant, and can help prevent nasty memory issues down the road.</p>
  <script>
  (function() {
    var counter = 0;
    document.querySelector( '#add' ).addEventListener( 'click', function() {
      var child = document.createElement( 'li' );
      child.innerHTML = "I'm new child " + ++counter;
      // counter++;
      el.appendChild( child );
    });
        // listen to the parent list
    var el  = document.querySelector( '.example-3' ),
        cls = 'bg-info',
        prev;

    function handler( evt ) {
      // since there are children, we only want to work
      // with the nearest parent LI
      var target = evt.target.closest( 'li' );
      if ( !target | prev == target ) {
        return;
      }
      if ( prev ) {
        prev.classList.remove( cls );
      }
      target.classList.add( cls );
      prev = target;
    }
    el.addEventListener( 'click', handler );
  })();
</script>
  </dd>
  <dt><h5><b>Q.</b> Explain how <code>this</code> works in JavaScript</h5></dt>
  <dd>
    <p>The value of <code>this</code> depends on the context in which it's referenced. In a global context, outside of a function or another object, it refers to the <code>window</code> object.</p>
    <p>Inside of a function when no <code>bind</code>, <code>call</code>, or <code>apply</code> has been used to invoke the function, <code>this</code> will also refer to the <code>window</code> object, unless you're operating in strict mode, in which case it will return <code>undefined</code>.</p>
    <p>When a function is invoked using <code>call</code>, or <code>apply</code>, the object that's passed in as the first argument becomes the <code>this</code> context of that function:</p>
{% highlight js linenos %}
function blurt() {
  return this.a;
}

blurt(); // undefined, unless it was previously in the window object
blurt.call( { a: 99 } ); // 99
blurt.apply( { a: 'hi mom!' } ); // hi mom!
blurt(); // still undefined
{% endhighlight %}
    <p>When <code>this</code> is referenced in a function that is a member of an object, the context takes that of the object:</p>
{% highlight js linenos %}
var obj = {
  a: 'TIMMEH!',
  b: function() {
    return this.a;
  }
};
obj.a; //'TIMMEH!'
obj.b(); //'TIMMEH!'
obj.a === obj.b(); // true
{% endhighlight %}
    <p>In event handlers, <code>this</code> will refer to the element from which the event fired.</p>
{% highlight html linenos %}<p id="dum">I'm a paragraph with a <span class="text-danger">span</span>
tag and a <button class="btn btn-success btn-sm">button</button>.
You should click somewhere in here.</p>
{% endhighlight %}
{% highlight js linenos %}
(function() {
  var el  = document.getElementById( 'dum' ),
      out = document.getElementById( 'this-out' );
  el.addEventListener( 'click', function( evt ) {
    out.innerHTML = 'this.nodeName = ' + this.nodeName + '\n';
    out.innerHTML += 'evt.target.nodeName = ' + evt.target.nodeName + '\n';
    out.innerHTML += 'evt.currentTarget.nodeName = ' + evt.currentTarget.nodeName;
  })
})();
{% endhighlight %}
    <p id="dum">I'm a paragraph with a <span class="text-danger">span</span> tag and a <button class="btn btn-success btn-sm">button</button>. You should click somewhere in here.</p>
    <textarea id="this-out" rows="3" cols="50"></textarea>
<script>
(function() {
  var el  = document.getElementById( 'dum' ),
      out = document.getElementById( 'this-out' );
  el.addEventListener( 'click', function( evt ) {
    out.innerHTML = 'this.nodeName = ' + this.nodeName + '\n';
    out.innerHTML += 'evt.target.nodeName = ' + evt.target.nodeName + '\n';
    out.innerHTML += 'evt.currentTarget.nodeName = ' + evt.currentTarget.nodeName;
  })
})();
</script>
  </dd>
{% comment %}
  <dt><h5><b>Q.</b> Explain how prototypal inheritance works</h5></dt>
  <dd>
    <p>There are a couple ways for objects to inherit a prototype. The older way which I was more familiar with was using <code>new</code> with a constructor function:</p>
{% highlight js linenos %}
function F() {
  this.a = 'hi';
  this.b = 'mom';
}
F.prototype = {
  greet: function() {
    return this.a + ', ' + this.b;
  }
};
var instance = new F();
instance.greet() // 'hi, mom'
{% endhighlight %}
    <p>In this way, any new instances of object F will share the same prototype, and any changes to that prototype will be instantly reflected in all instances:</p>
{% highlight js linenos %}
F.prototype.greet = function() { return 'OH HELLO'; };
instance.greet() // OH HELLO
{% endhighlight %}
    <p>You can also use <code>Object.create()</code> to create a prototype chain:</p>
{% highlight js linenos %}
var Square = {
  area: function() {
    return this.height * this.width;
  },
  create: function( side ) {
    this.height = side;
    this.width = side;
    return Object.create( this );
  }
};

var instance = Square.create( 5 );
instance.area(); // 25
{% endhighlight %}
  </dd>
{% endcomment %}
  <dt><h5><b>Q.</b> What do you think of AMD vs CommonJS?</h5></dt>
  <dd>
    <p>I'm likely going to show my age, and confess that I feel about them the same way I do transpilers, the labyrinth of build systems required to do pretty much anything anymore, and the plethora of redundant libraries that are now available. That is, I find them unnecessarily complex, overly niche, and typically overkill when seen from the perspective of my previous development experience. Despite that, my obstinateness can take a backseat because I understand that there are valid applications of this technology.</p>
    <p>I have very little practical experience with either technology, so explanations here are all derived from my research. CommonJS was originally intended for applications outside the browser, one notable implementation was in <a href="https://nodejs.org/docs/latest/api/modules.html" target="_blank">NodeJS</a>. <a href="https://github.com/amdjs/amdjs-api/blob/master/AMD.md" target="_blank"><abbr title="Asynchronous Module Definition">AMD</abbr></a> was written to target the async capabilities of the browser, allowing an author to define dependencies, and providing a fairly simple and common API (to the developer) to create modules that operate on fairly discrete pieces of app functionality.</p>
    <p>I think my criticism of these technologies lies in that it requires yet another layer of, not really abstraction, but domain knowledge in order to get them to work. Previously, we just had to make sure that in our concatenated site-wide JS, things were loaded in order: base libraries first that are used across the entire organization, and then app-specific code. Your app code could be written in a common pattern that didn't require additional knowledge of your loader.</p>
    <p>And despite that, I see the benefits of using a loader. You have async loading, explicit definitions of dependencies, and a fairly obvious idea at a glance of what your code is doing since it's supposed to be small and have a targeted purpose. This is definitely an area where I need to play with the technology to get a greater familiarity with it.</p>
  </dd>
  <dt><h5><b>Q.</b> Explain why the following doesn't work as an <abbr title="Immediately-Invoked Function Expression">IIFE</abbr>: <code>function foo(){ }();</code> What needs to be changed to properly make it an IIFE?</h5></dt>
  <dd>
    <p>The reason it doesn't work is that it's syntactically incorrect. When cleaned up a little, it looks like:</p>
{% highlight js linenos %}
// function declaration
function foo() {
  // nothing in here
}
(); // do...what!?
{% endhighlight %}
    <p>When the parser hits that empty pair of parentheses, there's nothing there for it to execute. To make this a valid IIFE, you'd have to add some parens:</p>
{% highlight js linenos %}
(function foo() {
  console.log( 'I executed all by myself!' );
})();
{% endhighlight %}
    <p>Note the order of the parens in the corrected version, <code>(function foo() {})();</code>. This can also be written as <code>(function foo() {}());</code>. While this difference isn't typically an issue, it can be when you have IIFEs in minified code that rely upon parameters being passed in. If you're missing a semicolon, then the value of <code>undefined</code> can be passed in as a parameter, leading to run-time errors or unintended values being passed in. The short answer to this discussion though is just use your damn semicolons (and curlies, and parens, and anything else that removes ambiguity from your code).</p>
  </dd>
  <dt><h5><b>Q.</b> What's the difference between a variable that is: <code>null</code>, <code>undefined</code> or undeclared? How do you go about checking for these states?</h5></dt>
  <dd>
    <h6>Let's start with undeclared</h6>
    <p>JS doesn't have an undeclared type. That is, if you're attempting to access a variable that hasn't been declared, you'll get a reference error:</p>
{% highlight js linenos %}
if ( duh ) { // reference error, stop execution
  console.log( true );
}
else {
  console.log( false );
}
{% endhighlight %}
    <h6><code>undefined</code> variables</h6>
    <p><code>undefined</code> is a primitive type that is used for variables that have been <em>declared</em>, but not assigned a value, or variables that have been explicitly given <code>undefined</code> as their value:</p>
{% highlight js linenos %}
var duh; // declared, not given a value
console.log( duh ); // undefined
console.log( typeof duh === 'undefined' ); // true
duh = undefined;
console.log( typeof duh === 'undefined' ); // still true
{% endhighlight %}
    <h6><code>null</code> variables</h6>
    <p>You can think of <code>null</code> as the explicit absence of value, rather than an implicit absence. A developer might use <code>null</code> to indicate that an object is no longer needed by the application and can be marked for garbage collection. Or he might use it when querying a database, where the user may expect an array but instead has an object whose value is <code>null</code>, meaning there were no records returned.</p>

    <h6>How do you check for these states?</h6>
    <p><code>null</code> has some neat quirks about it:</p>
{% highlight js linenos %}
var duh = null;
duh;               // null
typeof duh;        // "object"
duh == undefined;  // true
duh === undefined; // false
duh == null;       // true
duh === null;      // true
!duh;              // true
{% endhighlight %}
    <p>So the best bet when dealing with <code>null</code> is to explicitly check for it using <code>===</code>, so no type coercion takes place.</p>
    <p>As for <code>undefined</code> and undeclared variables, it's easiest to stick with using <code>typeof</code>. In the event a variable has not been declared, it will not throw an error, allowing you to continue your app's execution.</p>
  </dd>
  <dt><h5><b>Q.</b> What is a closure, and how/why would you use one?</h5></dt>
  <dd>
    <p>Closures are often used to create a public/private interface for objects. Let's use the oft-cited example of counting the number of times a button was clicked.</p>
{% highlight html linenos %}
<div>
  <button id="btn">CLICK ME!</button>
  <p id="count">You've clicked the button 0 times.</p>
</div>
{% endhighlight %}
{% highlight js linenos %}
var button = document.getElementById( 'btn' ),
    count  = 0;

function update() {
  var msg = document.getElementById( 'count' );
  msg.innerHTML = msg.innerHTML.replace( /\d+/g, ++count );
}

button.addEventListener( 'click', update );
{% endhighlight %}
<div>
  <button id="btn" class="btn btn-success btn-sm">CLICK ME!</button>
  <p id="count">You've clicked the button 0 times.</p>
<script>
var button = document.getElementById( 'btn' ),
    count  = 0;

function update() {
  var msg = document.getElementById( 'count' );
  msg.innerHTML = msg.innerHTML.replace( /\d+/g, ++count );
}

button.addEventListener( 'click', update );
</script>
</div>
    <p>There are some obvious problems with this script. First, it's relying on global variables and polluting our namespace. Second, it's a bit inefficient in that it's grabbing the <code>innerHTML</code> for our output message each time the function runs. An <abbr title="immediately-invoked function expression">IIFE</abbr> could solve those two problems easily, but there's another problem. The interesting and important parts of the function (our count and message) are easily edited by anyone who looks at the variable names. If we can protect those from the global namespace and only expose a simple public method to update the count, we'll be golden. This is where a closure comes in play. This example is pretty contrived as it could've all been easily contained within our IIFE (I'm still using globals here), but it does illustrate a public interface editing private vars.</p>
{% highlight html linenos %}
<div>
  <button id="btn2">CLICK ME TOO!</button>
  <button id="reset">reset</button>
  <p id="count2">You've clicked the button 0 times.</p>
</div>
{% endhighlight %}
{% highlight js linenos %}
// The return value of the IIFE will be assigned to update
var update = (function() {
      // private vars only edited within the scope of the IIFE
  var out    = document.getElementById( 'count2' ),
      msg    = out.innerHTML,
      count  = 0;

      // handles all editing of private stuff
      function setMsg( ctr ) {
        count = ctr;
        out.innerHTML = msg.replace( /\d+/g, ctr );
      }

      // our public interface. both rely upon a private
      // function to do all editing, simply passing in
      // values
      return {
        inc: function() {
          setMsg( count + 1 );
        },
        reset: function() {
          setMsg( 0 );
        }
      };
})();
var button = document.getElementById( 'btn2' ),
    reset  = document.getElementById( 'reset' );
button.addEventListener( 'click', update.inc );
reset.addEventListener( 'click', update.reset );
{% endhighlight %}
<div>
  <button id="btn2" class="btn btn-success btn-sm">CLICK ME TOO!</button>
  <button id="reset" class="btn btn-primary btn-sm">reset</button>
  <p id="count2">You've clicked the button 0 times.</p>
<script>
// The return value of the IIFE will be assigned to update
var update = (function() {
      // private vars only edited within the scope of the IIFE
  var out    = document.getElementById( 'count2' ),
      msg    = out.innerHTML,
      count  = 0;

      // handles all editing of private stuff
      function setMsg( ctr ) {
        count = ctr;
        out.innerHTML = msg.replace( /\d+/g, ctr );
      }

      // our public interface. both rely upon a private
      // function to do all editing, simply passing in
      // values
      return {
        inc: function() {
          setMsg( count + 1 );
        },
        reset: function() {
          setMsg( 0 );
        }
      };
})();
var button = document.getElementById( 'btn2' ),
    reset  = document.getElementById( 'reset' );
button.addEventListener( 'click', update.inc );
reset.addEventListener( 'click', update.reset );
</script>
</div>
  </dd>
  <dt><h5><b>Q.</b> Can you describe the main difference between a <code>.forEach()</code> loop and a <code>.map()</code> loop and why you would pick one versus the other?</h5></dt>
  <dd>
    <p>Similar to a <code>for</code> loop, <code>.forEach()</code> is used to iterate over items in an array and execute a function of the value provided. After the execution of <code>.forEach()</code>, <code>undefined</code> is always returned, even if the original array is mutated.</p>
{% highlight js linenos %}
var arr = [0,1,2,3];
arr.forEach(function( val ) {
  console.log( val );
});
{% endhighlight %}
    <p><code>.map()</code> on the other hand always returns a new array with the items in the array modified by the callback provided:</p>
{% highlight js linenos %}
var arr = [0, 1, 2, 3];
// stupid note: this is my first fat arrow notation!
var squares = arr.map( x => x ** 2 );
console.log( arr ); // [0, 1, 2, 3]
console.log( squares ); // [0, 1, 4, 9]
{% endhighlight %}
    <p>As for which to use and when, use <code>.map()</code> when you want a new array of values derived from values in a source array, and use <code>.forEach()</code> when you don't care what's returned from the callback, or use it if you prefer its syntax to a <code>for</code> loop's.</p>
  </dd>
  <dt><h5><b>Q.</b> What's a typical use case for anonymous functions?</h5></dt>
  <dd>
    <p>Callbacks are probably the most-common use I've had for them in the past:</p>
{% highlight js linenos %}
var arr = [0, 1, 2, 3];
// use an anonymous function as our callback to .map()
var squares = arr.map( function( val ) {
  val = val ** 2;
  return val;
});

// this could also be rewritten as:
function square( val ) {
  val = val ** 2;
  return val;
}
var squares = arr.map( square );
{% endhighlight %}
    <p>In this case, moving <code>square()</code> to a named function would be somewhat useful, since it's a pretty generic piece of functionality and could be applied to areas outside that callback. But typically, callbacks are specific to that instance and don't really need a named or referenced function. I find anonymous functions also aid in readability, as you don't have to track down a function definition elsewhere in the code.</p>
  </dd>
  <dt><h5><b>Q.</b> How do you organize your code? (module pattern, classical inheritance?)</h5></dt>
  <dd>
    <p>I'm a big fan of the module pattern for its simplicity in understanding and implementation. I've previously used classical when at LinkedIn, but I much prefer working with modules. A pretty fantastic primer on modules is available from <a href="http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html" target="_blank">Ben Cherry</a>, which despite being almost 8 years old, is still immensely useful.</p>
  </dd>
  <dt><h5><b>Q.</b> What's the difference between host objects and native objects?</h5></dt>
  <dd>
    <p><em>Native objects</em> are those defined by the ECMAScript engine: Object, Array, String, Function, etc. They exist regardless of where a program is running (e.g., server or browser).</p>
    <p><em>Host objects</em> are reliant upon the environment in which a program is running. In the browser, we have <code>window</code>, <code>document</code>, <code>history</code>. In an environment like NodeJS, we might have <code>fs</code> to access the local filesystem, but no concept of <code>window</code>.</p>
  </dd>
</dl>

I'll close this post for now. It's gone on way too long, and there's still a ton of questions to work through. More later!
