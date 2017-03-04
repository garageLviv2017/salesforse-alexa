// simple test script

var nforce = require('./nforce');
var _ = require('./lodash');
var moment = require('./moment-timezone');
var pluralize = require('./pluralize');

var org = nforce.createConnection({
  clientId: '3MVG9HxRZv05HarQzRJ710uik35cCOEDSj_WjTl967NmkG_4CweY9CR.wlwNbNdnu0S1y5HBM_9xgCRTNSzEz',
  clientSecret: '7514368004431512369',
  redirectUri: 'http://localhost:3000/oauth/_callback',
  //mode: 'single'
});

var username = 'tomacolyada@gmail.com';
var password = 'Lviv2017';
//F2MjRSGghRIZhZCDUhJMulUz

var opportunityName = 'Jones';

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
