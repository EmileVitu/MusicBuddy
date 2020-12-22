import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

/* Now to create the topic collection (will have to match it with the client .js file later*/
Topics = new Mongo.Collection('topics');
Comments = new Mongo.Collection('comments');

/* This is the server code to create the search tool */
Topics._ensureIndex({
  'title': 'text',
  'description': 'text',
  'category': 'text',
  'createdBy': 'text'
});

/* This is to ensure the search query will be published */
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



