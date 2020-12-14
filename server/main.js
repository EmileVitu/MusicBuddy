import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

/* Now to create the topic collection (will have to match it with the client .js file later*/
Topics = new Mongo.Collection('topics');