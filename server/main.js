/* Here starts the server code for MusicBuddy */

import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

	/* Now to create the topic collection (will have to match it with the client .js file later*/
const Topics = new Mongo.Collection('topics');
const Comments = new Mongo.Collection('comments');
	/* Now we need to allow the client to see the content of the collections */
Topics.allow({
	insert:function(userId,topics){
	console.log('testing security on topic insert');
	return true;
	},
	/*,
	getUser:function(user_id){
	console.log('testing if users appear on topics');
	return true;
	}*/
})
Comments.allow({
	insert:function(userId,comments){
	console.log('testing security on comment insert');
	return true;
	}/*,
	remove:function(user_id){ --if we needed to add a remove button for the own user id--
	console.log('testing if users appear on topics');
	return true;
	}*/
})
	/* The next code is to publish the mongo collections */
		/* First the Topics collection */
Meteor.publish('topics-recent', function publishfunction() {
  return Topics.find({});
})
		/* Now the Comments collection */
Meteor.publish('comments-recent', function publishfunction() {
  return Comments.find({});
})
		/* This is to allow the getUser function to fetch the username data from the collections */
Meteor.publish('allUsers', function(){
return Meteor.users.find();
});
/* This is unsafe, because anyone can see the users so..... */
		/* First the Topics collection */
Meteor.publish('topics', function() {
  return Topics.find({});
})
		/* Now the Comments collection */
Meteor.publish('comments', function() {
  return Comments.find({});
})



	/* The methods... */



/* Here ends the server code for MusicBuddy */