// simple test script

var nforce = require('./nforce');
var _ = require('./lodash');
var moment = require('./moment-timezone');
var pluralize = require('./pluralize');

var org = nforce.createConnection({
  clientId: '3MVG9i1HRpGLXp.ryjMWquccyQjg3Od6UIiH7LD5WLtuoWc1QsnkifhQEufUgy5h49fypi9.MZdAXybnF1uHl',
  clientSecret: '4585821157933247377',
  redirectUri: 'http://localhost:3000/oauth/_callback',
  mode: 'single'
});

var username = 'abc_lviv@340bloomtrial.com';
var password = 'garage48wsoIH0vPmqTiAfQEYaBjFRRs';
//

var opportunityName = 'Always';

var query = "select name, stagename, probability, amount from Opportunity where Name = '" + opportunityName + "'";
// auth and run query
org.authenticate({ username: username, password: password }).then(function(){
  return org.query({ query: query })
}).then(function(results) {
  var speechOutput = 'Sorry, I could not find Opportunity ' + opportunityName;
  if (results.records.length > 0) {
    var opp = results.records[0];
    speechOutput = 'I found Opportunity ' + opportunityName + ' for $' + opp.get('Amount') + ', the stage is ' + opp.get('StageName') + ' and the probability is ' + opp.get('Probability') + '%';
  }
  console.log(speechOutput);
}).error(function(err) {
  console.log(err);
});
