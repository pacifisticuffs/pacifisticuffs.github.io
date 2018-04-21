---
title: Let's Screw up Interview Questions
categories: [js]
date: 2018-04-20
image: /images/posts/disappointment.jpg
caption: Significant embarrassment and disappointment can lead to cases of becoming a statue
excerpt: I had a phone interview with a couple of fairly easy tech questions. My answers were incorrect (and non-functional), so I wanted to rewrite them.
---

I just had a phone interview with a very friendly engineer. We worked through 2 collab edit questions that I _kinda_ answered, but neither well, nor necessarily correct. I wanted to fix 'em, so here.

##### Given a list of lists of integers, write a function to return the index of the list with the highest average.

<em>e.g., Given [[1,2,3], [4,5,6], [7,8,9]] the function would return 2.</em>

Well, first off, I screwed up by writing something that returned the max average of the arrays passed in. That works, but it's not what the question asked. Dummy. Aside from some syntax errors I made and corrected, this is what I wrote

{% highlight js linenos %}
function maxAvg( list ) {
  var averages = list.map( function( arr ) {
    var sum = 0;
    arr.forEach( function( val ) {
      sum += val;
    });

    // haha dummy,
    // 1. Order of ops: sum / arr.length first (which is correct)
    // 2. no need to subtract 1, `length` is the right number to divide by
    return sum / arr.length - 1;
  });

  var max = null;
  averages.forEach( function( val ) {
    if ( max === null ) {
      max = val;
    }
    else if ( val > max ) {
      max = val
    }
  });
  return max;
}
maxAvg([[1,2,3],[2,3,4],[4,3,2]]) // 2
{% endhighlight %}

Well, that's right, the max average (minus 1) was 2, but that's sinfully ugly and doesn't do what the interviewer asked.

{% highlight js linenos %}
const maxAvg = list => {
  let averages;

  // just unraveling the faincy pants nesting here
  // 1. loop through the `list` passed in
  // 2. loop through the numbers in that array return
  //    their sum (using `reduce`)
  // 3. divide that sum by the length of the array to get its average
  // 4. repeat for each array in `list`
  // 5. return those values (`.map()` returns a new array) and store
  //    in `averages`
  // curlies and returns added so it fits
  averages = list.map( arr => {
    return arr.reduce( ( accumulator, currentVal ) => {
      return accumulator + currentVal;
    }) / arr.length;
  });

  return Math.max.apply( null, averages );
}
{% endhighlight %}

That's a helluva lot nicer. Using `map` and `reduce` together removes about 6 lines of JS, and the `Math.max.apply()` is so much nicer than that other aberration I wrote. But it's still not doing what the interviewer asked, which was for the index of the max average.


{% highlight js linenos %}
const maxAvg = list => {
  let averages,
      maxIndex = null;

  // see above for step-by-step on this
  averages = list.map( arr => {
    return arr.reduce( ( accumulator, currentVal ) => {
      return accumulator + currentVal;
    }) / arr.length;
  });

  /**
   * Figured I'd explain what this `.reduce()` is doing. On the first
   * iteration we pass in `null` so we can explicitly short-circuit if
   * this is the first iteration. After that, it looks at the `currentValue`
   * passed in and compares it to the value at the previous `maxIdx`
   * and returns the index of the higher value.
   *
   * @param {Integer} maxIdx from the previous iteration, the index of the
   *                  max value
   * @param {Integer} currentVal the value we're comparing the previous
   *                  max value to
   * @param {Integer} currentIndex where we are iterating over the array
   * @param {Array} arr the array with all our numbers so we can do
   *                comparisons
   */
  maxIndex = averages.reduce( ( maxIdx, currentVal, currentIndex, arr ) => {
    if ( maxIdx === null ) {
      return currentIndex;
    }
    return ( currentVal >= arr[maxIdx] ? currentIndex : maxIdx );
  }, null );

  return maxIndex;
}
{% endhighlight %}

Bob's your uncle. Even works for negative values.

##### Given a list of words and a word, determine which words in the list of words is an anagram of the word you are given.

<em>e.g., findAnagrams( ['read', 'art', 'fun', 'dear'], 'dare' ) = ['read, 'dear']</em>

Anagrams are words that have all the same letters, but are spelled differently. I'm almost too ashamed to share what I wrote off the cuff, but here it is. Please note that I'm not _this_ dumb.

{% highlight js linenos %}
function anagram( list, word ) {
  var isAnagram = [];

  list.forEach( function( val ) {
    var inStr = false;

    // lol #1: there's no `continue` in `.forEach()`
    if ( val.length != word.length ) {
      continue;
    }

    // lol #2 (major lol): this is so naive it's laughable.
    // what happens with 'cccc' and 'cake'? Every letter in
    // 'cccc' exists, right?! There's also the unnecessary
    // logic in there. Ugh.
    for ( var x = 0; x < val.length; x++ ) {
      if ( word.indexOf( val[x] ) === -1 ) {
        inStr = false;
        break;
      }
      else {
        inStr = true;
      }
    }

    if (inStr) {
      isAnagram.push( word );
    }
  });

  return isAnagram;
}
{% endhighlight %}

So that would theoretically return an array of words that are anagrams of the one you passed in. It doesn't. It doesn't do anything, really, because it's so busted. Let's fix it.

The best way to do this as far as I can see is to use a hash and store the alphabetized `word` we're using for comparison, and then push on an array of any of the words from `list` that match.

{% highlight js linenos %}
const findAnagrams = ( list, word ) => {
  const alphabetized = word.split('').sort().join(''),
        anagrams     = {};

  // we'll use the alphabetized comparison `word` as the key
  // to store an array of anagrams
  anagrams[alphabetized] = [];

  // first filter out any words that aren't the same length
  // this returns a new array
  list = list.filter( val => val.length === word.length );

  // 1. iterate over each word remaining
  // 2. alphabetize it
  // 3. see if the key exists on our hash `anagrams`
  // 4. if it does, we've got a match! `.push()` it on to the array
  list.forEach( function( val ) {
    let alphabetized = val.split('').sort().join('');
    if ( anagrams[alphabetized] ) {
      anagrams[alphabetized].push(val);
    }
  });

  // `.toString()` returns a comma-separated list of the
  // values in an array
  return anagrams[alphabetized].toString();
};

findAnagrams(['read', 'art', 'fun', 'dear'], 'dare') // "read,dear"
{% endhighlight %}

And finally, it works. Vindicated, but still disappointed with how I did on the phone.
