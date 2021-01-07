import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

	/* Now to create the topic collection (will have to match it with the client .js file later*/
Topics = new Mongo.Collection('topics');
Comments = new Mongo.Collection('comments');

	/* Now we need to allow the client to see the content of the collections */
Topics.allow({
	insert:function(userId,topics){
	console.log('testing security on topic insert');
	return true;
	}/*,
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
Meteor.publish('topics-recent', function publishFunction() {
  return Topics.find({});
})
		/* Now the Comments collection */
Meteor.publish('comments-recent', function publishFunction() {
  return Comments.find({});
})
		/* This is to allow the getUser function to fetch the username data from the collections */
Meteor.publish('allUsers', function(){
return Meteor.users.find();
});
/* This is unsafe, because anyone can see the users so..... */

	/* Now we must create and subscribe to the indexes in the comments and the topics......... */
	/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
/*Topics.createIndex({
  'title': 'text',
  'description': 'text',
  'category': 'text',
  'createdBy': 'text',
  //'createdAt': 'date' (doesn"t work yet ..., not a text kind)
});*/
Meteor.methods({
  // method to add a new document
  getUser:function(){
	  var user = Meteor.users.findOne({_id:user_id});
	  if (user){
		return user.username;
	  }
	  else {
		return "anonymous";
	  }
	}
});

Meteor.publish('allUsers', function(){
return Meteor.users.find(); //adjust query to return the info you want public
});

