---
title: An Interview Question from LI
categories: [js]
date: 2018-04-26
image: /images/posts/Classification-and-Time-Complexity-of-various-Sorting-Algorithm.png
caption:
---

My friend is a smart bastard, and he's been kind enough to give me some ideas for exercises to prepare for interviews (see [infinite scroll]({% post_url 2018-04-17-infinite-scroller %})). Here is another question he tossed over, this time having to do with object manipulation.

LinkedIn profiles typically have a skills section, where users can list things they're good at, and their connections can endorse them. In this short exercise we're going to get a list of un-grouped skills and prevent a summary of each skill, with all the users that have it. That is, given this data from the server:

{% highlight js linenos %}
[
  { user: 'Dennis', skill: 'Beer drinking' },
  { user: 'Matt', skill: 'Beer drinking' },
  { user: 'Matt', skill: 'Gin making' },
  { user: 'Mike', skill: 'Skibbling the frim-fram' },
  { user: 'Mike', skill: 'Beer drinking' },
  { user: 'Jeremy', skill: 'Skibbling the frim-fram' }
]
{% endhighlight %}

Return this:

{% highlight js linenos %}
[
  { skill: 'Beer drinking', users: [ 'Dennis', 'Matt', 'Mike' ], count: 3 },
  { skill: 'Gin making', users: [ 'Matt' ], count: 1 }
  { skill: 'Skibbing the frim-fram', users: [ 'Mike', 'Jeremy' }, count: 2 }
]
{% endhighlight %}

I went after it, and came up with this:
{% highlight js linenos %}
(function() {
// Data from server
const endorsements = [
        { user: 'Dennis', skill: 'Beer drinking' },
        { user: 'Matt', skill: 'Beer drinking' },
        { user: 'Matt', skill: 'Gin making' },
        { user: 'Mike', skill: 'Skibbling the frim-fram' },
        { user: 'Mike', skill: 'Beer drinking' },
        { user: 'Jeremy', skill: 'Skibbling the frim-fram' }
      ],
      munged = [];

// loop through each endorsement in the array
endorsements.forEach( endorsement => {
  // find the index of the first endorsement with this skill
  let skillIndex = munged.findIndex( record => record.skill == endorsement.skill );

  // if it's not found, let's add a new entry on the array
  // and get its new index
  skillIndex = ( skillIndex > -1 ) ? skillIndex : ( munged.push({}) - 1 );

  // it's either an existing skill object, or a new blank object
  let skill = munged[skillIndex];

  skill['skill'] = endorsement.skill;
  (skill.users) ? skill.users.push( endorsement.user ) : skill.users = [endorsement.user];
  skill.count = skill.users.length;

  munged[skillIndex] = skill;
});

console.log( munged );
})();
{% endhighlight %}

It works! Unfortunately, the feedback from Matt was, "It's loopy." He's right, it is. It requires a loop over an array of a known length, then another loop (with a possible break) to search an array's values with an expanding length. I started to consider some use of the plethora of array methods like `.sort()`, but he came back with a solid hint, `const munged = {}`.

Objects are great for aggregating data because keys must be unique, and they provide a fast and easily-understood method of comparison (easily-understood from the POV of someone else reading my code). With that in mind, I went and did this:

{% highlight js linenos %}
(function() {
  const endorsements = [
          { user: 'Dennis', skill: 'Beer drinking' },
          { user: 'Matt',   skill: 'Beer drinking' },
          { user: 'Matt',   skill: 'Gin making' },
          { user: 'Mike',   skill: 'Skibbling the frim-fram' },
          { user: 'Mike',   skill: 'Beer drinking' },
          { user: 'Jeremy', skill: 'Skibbling the frim-fram' }
        ],
        munged = {};

  // for each endorsement provided, destructure into `skill` and `user`
  // variables
  endorsements.forEach( endorsement => {
    const { skill, user } = endorsement;
    // does this key exist on our munged object? If so, push a new
    // user on it, otherwise add the key and new array
    ( munged[skill] ) ? munged[skill].push( user ) : munged[skill] = [user];
  });

  // now we'll iterate over the keys in the munged object and construct a
  // new array using `.map()` with the desired object structure, summarizing
  // the users that have each skill
  return Object.keys( munged ).map( record => {
    return {
        skill: record,
        users: munged[record],
        count: munged[record].length
      }
  });
})();
{% endhighlight %}

This time we're still iterating over an array twice, but each array is of known length, and we're removing some comparisons. It's also more succinct and, I think, more easily understood at a glance.

###### Ok, ok, that works, but how about...
The PM just wrote to me, and he wants this new array sorted, with the most popular skill coming first. What a jerk.

{% highlight js linenos %}
(function() {
  const endorsements = [
          { user: 'Dennis', skill: 'Beer drinking' },
          { user: 'Matt',   skill: 'Beer drinking' },
          { user: 'Matt',   skill: 'Gin making' },
          { user: 'Mike',   skill: 'Skibbling the frim-fram' },
          { user: 'Mike',   skill: 'Beer drinking' },
          { user: 'Jeremy', skill: 'Skibbling the frim-fram' },
          { user: 'Jeremy', skill: 'Acceleration' },
          { user: 'Tim',    skill: 'Skibbling the frim-fram' },
          { user: 'Pete',   skill: 'Acceleration' },
          { user: 'Pete',   skill: 'Skibbling the frim-fram' },
          { user: 'Matt',   skill: 'Accounting' },
          { user: 'Mike',   skill: 'Accounting' },
          { user: 'Jeremy', skill: 'Accounting' },
          { user: 'Tim',    skill: 'Acceleration' }
        ],
        munged = {};

  endorsements.forEach( endorsement => {
    const { skill, user } = endorsement;
    ( munged[skill] ) ? munged[skill].push( user ) : munged[skill] = [user];
  });

  // store the aggregate skills into a new array so we can sort it next
  const result = Object.keys( munged ).map( record => {
    return {
        skill: record,
        users: munged[record],
        count: munged[record].length
      }
  });

  return result.sort( ( a, b ) => {
    // the number of users with this skill is the same,
    // so let's sort alpha on the skill name
    if ( a.count === b.count ) {
      if ( a.skill < b.skill ) {
        return -1;
      }
      else if ( a.skill > b.skill ) {
        return 1;
      }
    }

    return b.count - a.count;
  });
})();
{% endhighlight %}

That does it! It'll sort first by the `.count`, and if that's equal, it'll look at the `.skill` and sort based on its alphabetized comparison. So shut up, PM guy.

