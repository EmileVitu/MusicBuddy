import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

/* Now to create the topic collection (will have to match it with the client .js file later*/
Topics = new Mongo.Collection('topics');
Comments = new Mongo.Collection('comments');

/* The next code is to publish the mongo collections */
	/* First the Topics collection */
Meteor.publish('topics-recent', function publishFunction() {
  return Topics.find({}, {sort: {date: -1}});
})
	/* Now the Comments collection */
Meteor.publish('comments-recent', function publishFunction() {
  return Comments.find({}, {sort: {date: -1}});
})




/* This is the server code to create the search tool */
Topics._ensureIndex({
  'title': 'text',
  'description': 'text',
  'category': 'text',
  'createdBy': 'text',
  //'createdAt': 'date' (doesn"t work yet ..., not a text kind)
});

Meteor.publish('searchTopics', function(query) {
  if (query) {
    return Topics.find(
      { $text: {
          $search: query
        }
      },
      {
        fields: {
          score: {
            $meta: 'textScore'
          }
        },
        sort: {
          score: {
            $meta: 'textScore'
          }
        }
      }
    );
  } else {
    return Topics.find();
  }
});









var createTextIndex = function(db, callback) {
  // Get the documents collection
  var topics = db.Topics('users');
  // Create the index
  Topics.createIndex(
    {   title : 'text',
		category: 'text',
		description: 'text',
		createdBy: 'text'}, 
	function(err, result) {
    console.log(result);
    callback(result);
  });
};


/*Topics.createIndex({
  'title': 'text',
  'description': 'text',
  'category': 'text',
  'createdBy': 'text',
  //'createdAt': 'date' (doesn"t work yet ..., not a text kind)
});*/



