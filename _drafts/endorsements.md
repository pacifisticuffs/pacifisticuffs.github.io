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

// Munge the above data to look like the following
/*[
  { skill: 'Beer drinking', users: [ 'Dennis', 'Matt', 'Mike' ], count: 3 },
  { skill: 'Gin making', users: [ 'Matt' ], count: 1 }
  { skill: 'Skibbing the frim-fram', users: [ 'Mike', 'Jeremy' }, count: 2 }
]*/

// loop through each endorsement in the array
endorsements.forEach( endorsement => {
  // find the index of the first endorsement with this skill
  let skillIndex = munged.findIndex( record => record.skill == endorsement.skill );

  // if it's not found, let's add a new entry on the array
  // and get its new index
  skillIndex = ( skillIndex > -1 ) ? skillIndex : ( munged.push({}) - 1);

  // it's either an existing skill object, or a new blank object
  let skill = munged[skillIndex];

  skill['skill'] = endorsement.skill;
  (skill.users) ? skill.users.push( endorsement.user ) : skill.users = [endorsement.user];
  skill.count = skill.users.length;

  munged[skillIndex] = skill;
});

console.log( munged );

(function() {
var endorsements = [
        { user: 'Dennis', skill: 'Beer drinking' },
        { user: 'Matt', skill: 'Beer drinking' },
        { user: 'Matt', skill: 'Gin making' },
        { user: 'Mike', skill: 'Skibbling the frim-fram' },
        { user: 'Mike', skill: 'Beer drinking' },
        { user: 'Jeremy', skill: 'Skibbling the frim-fram' }
      ],
      minge = {};

endorsements.forEach( endorsement => {
  var { skill, user } = endorsement;
  ( minge[skill] ) ? minge[skill].push( user ) : minge[skill] = [user];
});

console.log( Object.keys( minge ).map( record => {
  return {
      skill: record,
      users: minge[record],
      count: minge[record].length
    }
}));
})();

