import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

/* Now to create the topic collection */
/* topics = new Mongo.collection("topics"); */

Topics = new Mongo.Collection('topics');