---
title: "Answering FEE Interview Questions - Part 4: JS (el repo está muerto)"
categories: [JS]
excerpt: <p>In which I continue to stumble through the seemingly endless trove of <a href="https://github.com/h5bp/Front-end-Developer-Interview-Questions" target="_blank">Front-end Interview Questions</a> and maybe answer them.</p>
---

Previously: [part 4 - js #2]({% post_url 2018-03-15-frontend-questions-4-js-2 %}) --- [part 4 - js #3]({% post_url 2018-03-15-frontend-questions-4-js-2 %})

It's not really <em>muerto</em>, it's just that I'm finally done going through all the [Front-end Interview JS Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/master/questions/javascript-questions.md){:target="_blank"}! I will continue to write more stuff for more complex sample questions that I've stumbled upon, or just talking about the Flyers or something cool I learned.

<dl>
  <dt><h5><b>Q.</b> What language constructions do you use for iterating over object properties and array items?</h5></dt>
  <dd>
    <h6>Object properties:</h6>
    <ul>
      <li><code>for...in</code> along with <code>.hasOwnProperty()</code> to make sure we're not looking at the prototype</li>
      <li><code>Object.keys({}).forEach(function(key) {})</code>. It works similar to above, but removes the <code>.hasOwnProperty()</code> check.</li>
      <li><p>Even better than using <code>.forEach()</code> with <code>.keys()</code> is to do a <code>for</code> loop over the keys array:</p>
{%highlight js linenos %}
var keys = Object.keys(obj);
for ( var i = 0, l = keys.length; i < l; i++ ) {
  console.log( obj[ keys[ i ] ] );
}
{% endhighlight %}
      <a href="https://jsperf.com/object-keys-vs-for-in-with-closure/111" targer="_blank">jsperf</a> shows this to be quite a bit faster than other iteration methods.
      </li>
    </ul>
    <h6>Iterating arrays</h6>
    <ul>
      <li>The ever-trusty <code>for (var x = 0; x < arr.length; x++ >) {}</code> loop</li>
      <li><code>arr.forEach(function(val) {})</code></li>
    </ul>
    <p>There are other methods for working with arrays, particularly when you want to produce new arrays, but these are the two ways I typically iterate. There's a good collection of <a href="https://jsperf.com/fastest-array-loops-in-javascript/32" target="_blank">iteration tests on jsperf</a>, which surprisingly shows a <code>while</code> loop being much faster than other methods.</p>
  </dd>
  <dt><h5><b>Q.</b> Explain the difference between mutable and immutable objects. What is an example of an immutable object in JavaScript? What are the pros and cons of immutability? How can you achieve immutability in your own code?</h5></dt>
  <dd>
    <p>I had to do a bit more reading on this question. Inherently, I know that <em>mutability</em> just means that we can change its properties. We can create an object <code>var obj = { prop1 : true };</code>, and later modify that object, <code>obj.prop1 = false; obj.prop2 = true;</code>. If we state that <code>var obj2 = obj;</code>, then any modifications to either <code>obj</code> or <code>obj2</code> will still yield the same result of <code>obj === obj2; // true</code>.</p>
    <p><em>Immutability</em> is a little stranger to grasp. In JS, strings and numbers are immutable. All string and number operations return a new instance rather than modifying the original. <code>2 + 3</code> yields a new number rather than modifying the meaning or value of 2.</p>
    <p>Objects can be made immutable in JS through developer discipline, and significantly helped through the use of a library like <a href="https://facebook.github.io/immutable-js/" target="_blank">Immutable.js</a>. The basic gist is that any modification to an existing object yields a new object. The developer must stop using dot notation to mutate an object, and instead uses setter functions.</p>
    <p>The main benefit of immutability is the ability to check is the state of an object has changed. This is great for libraries like <a href="https://reactjs.org/" target="_blank">React</a>. The components on a page don't necessarily need to know <em>what</em> changed in an object's state, they just need to know that an object <em>has</em> changed, so it can then re-render. A component no longer needs to do a potentially-deep value check on an object. It can just look and see that <code>newState !== oldState</code> quickly and easily.</p>
    <p>The major downside to using immutable objects in JS is that it's a pretty foreign concept for most JS developers. It requires a developer and any team of developers to stop accessing an object's properties through traditional methods, and instead rely exclusively on mutation methods that always return a new object.</p>
  </dd>
  <dt><h5><b>Q.</b> Explain the difference between synchronous and asynchronous functions.</h5></dt>
  <dd>
    <h6>Synchronous functions</h6>
    <p>This is how functions have always worked in JS. They are executed line-by-line, with each subsequent line waiting for the previous to finish. </p>
    <h6>Asynchronous functions</h6>
    <p>JS has had some async operations for some time now, most notably the <code>XMLHttpRequest</code> object, which would spawn an HTTP request in a non-blocking manner, and then later execute some callback on the returned data. But async functions are a relatively new thing. They allow you to write functions with promises as if they were synchronous functions, which for me at least, makes promise-based code <em>much</em> easier to read and understand.</p>
    <p>Here is a quick example, taken from a <a href="https://developers.google.com/web/fundamentals/primers/async-functions" target="_blank">great primer</a> I read:</p>
<h6>Logging a fetch in promise-land</h6>
{% highlight js linenos %}
function logFetch(url) {
  return fetch(url)
    .then(response => response.text())
    .then(text => {
      console.log(text);
    }).catch(err => {
      console.error('fetch failed', err);
    });
}
{% endhighlight %}
<h6>Logging a fetch in async-land</h6>
{% highlight js linenos %}
async function logFetch(url) {
  try {
    const response = await fetch(url);
    console.log(await response.text());
  }
  catch (err) {
    console.log('fetch failed', err);
  }
}
{% endhighlight %}
  </dd>
  <dt><h5><b>Q.</b> What is event loop? What is the difference between call stack and task queue?</h5></dt>
  <dd>
    <p>The event loop is the term used to describe how JS listens for and processes events that have callbacks registered. In a nutshell, JS will loop, waiting for an event to fire (e.g., <code>click</code>, <code>submit</code>). Once it fires, it looks for callbacks attached and adds them to the task queue where it will be processed in the order it was received. If there is no callback, the event is ignored and the engine continues to listen.</p>
    <p>The queue is a list of messages to be processed. As the call stack becomes available, a new stack frame is created and the function associated with the message is added. The function is unpacked and any subsequent functions within are added to the stack.</p>
  </dd>
  <dt><h5><b>Q.</b> Explain the differences on the usage of <code>foo</code> between <code>function foo() {}</code> and <code>var foo = function() {}</code>
</h5></dt>
  <dd>
    <h6><code>function foo() {}</code></h6>
    <p>This is a function <em>declaration</em>, creating a named function.</p>
    <h6><code>var foo = function() {}</code></h6>
    <p>This is a function <em>expression</em>, assigning an anonymous function to the variable called <code>foo</code>.</p>
    <p>The major difference between the two statements is the way the JS engine interprets the code by separating the variable declaration and assignment via hoisting:</p>
{% highlight js linenos %}
var foo;
// some other variable declarations might be here
foo = function() {};
{% endhighlight %}
    <p>Now if the function assigned to <code>foo</code> returns a value that we need to initialize another variable, we could encounter errors (the <code>try...catch</code> is just so the script continues):</p>
{% highlight js linenos %}
try {
  var baz = xxx(), // Works because the function declaration is hoisted
      bar = foo(), // whoops
      foo = function() { return false; };
} catch(e) {
  console.log(e); // TypeError: foo is not a function
}
function xxx() { return true; }
console.log( bar, foo, baz ); // undefined undefined true
{% endhighlight %}
  </dd>
  <dt><h5><b>Q.</b> What are the differences between variables created using <code>let</code>, <code>var</code> or <code>const</code>?</h5></dt>
  <dd>
    <h6><code>var</code></h6>
    <p>I'll start on what I'm most familiar with. <code>var</code> will declare a variable in the scope of the function in which it's contained, or in the <code>window</code> scope if there is no containing function.</p>
{% highlight js linenos %}
var x = 1; // window.x
function blurt() {
  // local only to this function
  var x = 2;
  console.log( x );
}

(function() {
  // local only to this IIFE
  var x = 3,
      y = 4;
  console.log( x, y );
})();

blurt();
console.log( x );
console.log( y );
// outputs: 3 4 2 1 reference error (y has not been declared)
{% endhighlight %}
    <h6><code>const</code></h6>
    <p><code>const</code> is relatively new, and I had never used it in my professional days. It is used to define an identifier (<em>variable</em> would be the wrong term here since variable means its value is unknown or could change) within a block that can not be reassigned. That phrase is a little tricky because you can do some silly things with it:</p>
{% highlight js linenos %}
const blurt = {},
      hork  = blurt,
      pie   = Math.PI;

blurt.x = 'hi';
hork.y = 'hello';
blurt.z = 'good evening';
blurt === hork; // true
hork = {}; // TypeError: Assignment to constant variable.
pie === Math.PI; // true
pie = 'Delicious; // TypeError: Assignment to constant variable.
{% endhighlight %}
    <p>As you see, you can modify an object that's assigned to a <code>const</code>. This is where JS' object mutability makes things a little weird.</p>
    <h6><code>let</code></h6>
    <p>This is another statement that's new to me. <code>let</code> declares a variable with block scope, which means anything within curly braces. Variables declared with <code>let</code> and <code>const</code> do not get hoisted like those declared with <code>var</code>.</p>
{% highlight js linenos %}
let blurt = 1;
if (blurt === 1) {
  // this will throw an error due to blurt's temporal dead zone!
  //console.log( 'in if: ' + blurt );

  // now there's a new `blurt` with a value of 2
  let blurt = 2;
  console.log( blurt ); // 2

  // and now a 3rd instance of `blurt` local only to this for loop!
  for ( let blurt = 1; blurt < 3; blurt++ ) {
    console.log( 'looping: ' + blurt ); // 1 2 2
  }
  console.log( 'exiting if: ' + blurt ); // 2
}

console.log( blurt ); // 1
{% endhighlight %}
  </dd>
  <dt><h5><b>Q.</b> What are the differences between ES6 class and ES5 function constructors?</h5></dt>
  <dd>
    <p></p>
  </dd>
  <dt><h5><b>Q.</b> </h5></dt>
  <dd>
    <p></p>
  </dd>
  <dt><h5><b>Q.</b> </h5></dt>
  <dd>
    <p></p>
  </dd>
  <dt><h5><b>Q.</b> </h5></dt>
  <dd>
    <p></p>
  </dd>
  <dt><h5><b>Q.</b> </h5></dt>
  <dd>
    <p></p>
  </dd>
  <dt><h5><b>Q.</b> </h5></dt>
  <dd>
    <p></p>
  </dd>
  <dt><h5><b>Q.</b> </h5></dt>
  <dd>
    <p></p>
  </dd>
</dl>
