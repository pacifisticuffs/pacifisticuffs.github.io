---
title: "Answering FEE Interview Questions - Part 4: JS (el repo está muerto)"
categories: [JS]
excerpt: <p>A final foray into the <a href="https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/master/questions/javascript-questions.md" target="_blank">inexhaustible list of JS questions</a> that I've been looking at for the past month.</p>
date: 2018-04-02
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
    <p>The main benefit of immutability is the ability to check if the state of an object has changed. This is great for libraries like <a href="https://reactjs.org/" target="_blank">React</a>. The components on a page don't necessarily need to know <em>what</em> changed in an object's state, they just need to know that an object <em>has</em> changed, so it can then re-render. A component no longer needs to do a potentially-deep value check on an object. It can just look and see that <code>newState !== oldState</code> quickly and easily.</p>
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
    console.log( 'looping: ' + blurt ); // 1 2
  }
  console.log( 'exiting if: ' + blurt ); // 2
}

console.log( blurt ); // 1
{% endhighlight %}
  </dd>
  <dt><h5><b>Q.</b> What are the differences between ES6 class and ES5 function constructors?</h5></dt>
  <dd>
    <p>I've done a bit of reading about the new ES6 classes. Most describe them as syntactic sugar (ugh, another term I hate) for traditional constructors and prototypal inheritance. There are a lot of articles out there though that poo-poo the idea of having a strict class idiom in JS, but I have to say, they sure are a helluva lot easier to understand at a glance (example nabbed from <a href="https://andywalpole.me/blog/144451/moving-es3es5-es6-javascript-classes" target="_blank">Andy Walpole</a>).</p>
    <h6>ES5 example:</h6>
{% highlight js linenos %}
var Rectangle = function(id, x, y, width, height) {
    Shape.call(this, id, x, y);
    this.width = width;
    this.height = height;
};
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;
var Circle = function(id, x, y, radius) {
    Shape.call(this, id, x, y);
    this.radius = radius;
};
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;
{% endhighlight %}

<h6>ES6 example:</h6>
{% highlight js linenos %}
class Rectangle extends Shape {
    constructor(id, x, y, width, height) {
        super(id, x, y);
        this.width = width;
        this.height = height;
    }
}
class Circle extends Shape {
    constructor(id, x, y, radius) {
        super(id, x, y);
        this.radius = radius;
    }
}
{% endhighlight %}

    <p>It's the same number of lines, and internally it's doing the same stuff, but the ES6 syntax for me is much easier to read and understand. I don't come from an OOP background and my understanding of JS' prototypal pattern is far from comprehensive, so it's likely a lack of experience that draws me to the ES6 class.</p>
    <p>Anyway, some details on <code>class</code>:</p>
    <ul>
      <li>There's no hoisting for classes -- any instantiation must be done after the class definition</li>
      <li>No need for <code>'use strict'</code>. This is ES6, so the engine assumes you want that</li>
      <li>Class names are pretty much <code>const</code>s and can't be overwritten</li>
      <li>The <code>constructor()</code> method can call <code>super()</code> to instantiate the superclass that a subclass extends</li>
      <li>Classes can be extended using the <code>extends</code> keyword</li>
    </ul>
  </dd>
  <dt><h5><b>Q.</b> Can you offer a use case for the new arrow <code>=&gt;</code> function syntax? How does this new syntax differ from other functions? What advantage is there for using the arrow syntax for a method in a constructor?</h5></dt>
  <dd>
    <p>Here are some of the differences in arrow function syntax and usage:</p>
    <ul>
      <li>No more <code>function</code> keyword needed (wow, huge time savings!)</li>
      <li>It lets you omit parenthesis when you have only one input param, omit curlies and the <code>return</code> statement when you're implicitly returning something (wow, huge time savings!)</li>
      <li>Can't be used as constructors</li>
      <li>Have no <code>arguments</code> object</li>
      <li>It takes its <code>this</code> from the enclosing lexical context</li>
    </ul>
    <p>My sarcasm is hopefully obvious, because I generally object to anything that removes punctuation or important symbols from code. They're there because they remove ambiguity, which is a pretty important feature in any code.</p>
    <p>The last bullet is great though, and hugely beneficial when composing objects.</p>
{% highlight js linenos %}
var obj1 = {
  timer: undefined,
  count: 0,
  int: function() {
    // set interval is gonna be all screwed up because its
    // `this` is really pointing to the global object (`window`)
    this.timer = setInterval( function() {
      console.log( this.count++ ); // NaN NaN NaN NaN
      if ( this.count > 5 ) {
        clearInterval( this.timer );
      }
    }, 1000 );
  }
};

var obj2 = {
  timer: undefined,
  count: 0,
  int: function() {
    // fat arrow here takes its `this` from the enclosing
    // object. easy-peasy!
    this.timer = setInterval( () => {
      console.log( this.count++ ); // 0 1 2 3 4 5
      if ( this.count > 5 ) {
        clearInterval( this.timer );
      }
    }, 1000 );
  }
};

obj1.int();
obj2.int();
clearInterval( obj1.timer );
{% endhighlight %}
    <p>In the above script, <code>obj1</code>'s version of <code>.int()</code> will never stop spamming your console because <code>this</code> is referring to the global <code>window</code> object, unlike <code>obj2</code>'s version which doesn't bind <code>this</code> and takes it from the object in which the function is defined. This is great because it doesn't require an additional call to <code>.bind()</code> (in fact you <em>can't</em> use <code>.bind()</code>, <code>.call()</code>, or <code>.apply()</code> to change the value of <code>this</code>), or creating a closure like <code>var self = this</code> in enclosing function <code>.int()</code>. In my opinion this is one of the very cool features of the new syntax.</p>
  </dd>
  <dt><h5><b>Q.</b> What is the definition of a higher-order function?</h5></dt>
  <dd>
    <p>Functions are first-class members in JS, meaning they can be passed as arguments, returned from other functions (or even overwriting themselves), assigned as a property to an object, or assigned to variables. The first two qualities listed there are what define a  higher-order function. In addition to those we've all probably written ourselves without knowing what they're called, there are many available in JS already (e.g. <code>Array.prototype</code> functions <code>.reduce()</code>, <code>.filter()</code>, or <code>.map()</code>).</p>
  </dd>
  <dt><h5><b>Q.</b> Can you give an example for destructuring an object or an array?</h5></dt>
  <dd>
    <p>I just learned about this while reading about higher-order functions. It's a way of extracting (potentially multiple) values from objects and arrays. Here are some simple examples:</p>
{% highlight js linenos %}
var [ first, second ] = [ 1, 2, 3, 4, 5 ];
console.log( first, second ); // 1 2
var { first: fname, last: lname } = { first: 'tim', last: 'lynn' };
console.log( fname, lname ); // tim lynn

var arr = [ 1, 2, 3, 4, 5 ];
// same as `length = arr.length`
for (let x = 0, { length } = arr; x < length; x++ ) {
  console.log( arr[ x ] );
}
{% endhighlight %}
  </dd>
  <dt><h5><b>Q.</b> Can you give an example of a curry function and why this syntax offers an advantage?</h5></dt>
  <dd>
    <p>Curried functions allow you to write generic functions with varying parameter requirements and either get a result, or a new function with partially-applied parameters. (code samples below snagged from a concise writeup at <a href="https://blog.carbonfive.com/2015/01/14/gettin-freaky-functional-wcurried-javascript/" target="_blank">Carbon Five</a>):</p>
{% highlight js linenos %}
function add2dumbNums( x ) {
  return function( y ) {
    return x + y;
  }
}
var add20 = add2dumbNums( 20 );
add20( 20 ); // 40
add20( -20 ); // 0
{% endhighlight %}
    <p>This is a pretty bad example because it requires hard-wiring nested functions for each of the expected params. A better way to do this is to use a currying function which will look at the provided parameters and either execute the function with all the required parameters, or return a curried function to which you can pass additional params to fulfill its expectations.</p>
{% highlight js linenos %}
function curry(fx) {
  var arity = fx.length;

  return function f1() {
    var args = Array.prototype.slice.call( arguments, 0 );
    if ( args.length >= arity ) {
      return fx.apply( null, args );
    }
    else {
      return function f2() {
        var args2 = Array.prototype.slice.call( arguments, 0 );
        return f1.apply( null, args.concat( args2 ) );
      }
    }
  };
}

var add4nums = curry( ( a, b, c, d ) => a + b + c + d );
// creates a function that will add 10 to 3 additional nums
var add10 = add4nums( 10 );
// creates a function that will subtract 10 from the sum of 3 additional nums
var sub10 = add4nums( -10 );
{% endhighlight %}
  </dd>
</dl>
I think I'll finish up this stupidly-long post here. There are a couple more questions in the repo that I've omitted in the interest of not boring you (and not feeling like a complete knob because I can't write a good explanation for it).
