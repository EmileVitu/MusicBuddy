/* Javascript file for MusicBuddy Client side */

			/* First the general code for the whole website */
		/* First to link the documents between themselves */
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import './main.html';


/* Creating the topics and comments databases (mongo collection) */
Topics = new Mongo.Collection('topics');
Comments = new Mongo.Collection('comments');


		/* Now to subscribe to the collections and publications */
Meteor.subscribe('topics-recent');
Meteor.subscribe('comments-recent');
/* This is unsafe, but since it is a prototype website, let's say it's fine for now */
Meteor.subscribe('allUsers');
//Meteor.subscribe('search');
Meteor.subscribe('topics');
Meteor.subscribe('comments');
Meteor.subscribe('search');


		/* Now the routing for all the tabs of my navbar */
	/* The route for the "layout" template */
Router.configure({
  layoutTemplate: 'layout'
});
	/* The route for the "homepage" */
Router.route('/', {
  name: 'home',
  template: 'home'
});
	/* The route for the "general" discussions */
Router.route('/General', {
	name: 'general',
	template: 'general'
});
	/* The route for the "instruments" discussion */
Router.route('/Instruments', {
  name: 'instruments',
  template: 'instruments'
});
	/* The route for the "music theory" discussions */
Router.route('/Theory', {
  name: 'theory',
  template: 'theory'
});
	/* The route for the "Buddy bands" meetup */
Router.route('/BuddyBands', {
  name: 'buddybands',
  template: 'buddybands'
});
	/* The route for the "New topic!" page */
Router.route('/NewTopic', {
	name: 'newTopic',
	template: 'newTopic'
});
	/* The route for the "search engine" page */
/* Here should be the onkeyup */
Router.route('/Search', {
	name: 'search',
	template: 'search'
});
	/* This is the route that will be rendered for each topic link that a user clicks */
Router.route('/:category/:_id', {
	name: 'singleTopic',
	template: 'singleTopic',
	data: function(){
		var currentTopic = this.params._id;
		return Topics.findOne({ _id: currentTopic });
		var currentCategory = this.params.category;
		return Topics.findOne({ category: currentCategory });
    }
});

			/* Now the code for the routed pages */

		/* Code for the layout template */
		/* The navbar */
	/* Now about the login buttons, to add a username to the sign in form */
Accounts.ui.config({passwordSignupFields: "USERNAME_AND_EMAIL"});

		/* The sideNav */
/* This should have worked, I'll have to repair it later 
Template.sideNav.events({
	"click.openNav":function(event){
		alert('Hello!')
		document.getElementById("mySideNav").style.width = "250px";
		document.getElementById("main").style.marginLeft = "250px";
		document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
	}
}); */
	/* First to rename the function names */
window.openNav = openNav;
window.closeNav = closeNav;
	/* Now the openNav function */
function openNav() {
	document.getElementById('mySideNav').style.width = '250px';
	document.getElementById('main').style.marginLeft = '250px';
	document.body.style.backgroundColor = 'rgba(0,0,0,0.4)';
}
 	/* Now the closeNav Function */
function closeNav() {
	document.getElementById('mySideNav').style.width = '0px';
	document.getElementById('main').style.marginLeft = '0px';
	document.body.style.backgroundColor = 'white';
}

		/* Here is the infinite scroll code */
	/* For the topics lists */	
Session.set("topicLimit", 8);
lastScrollTop = 0; 
$(window).scroll(function(event){
// test if we are near the bottom of the window
if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
  // where are we in the page? 
  var scrollTop = $(this).scrollTop();
  // test if we are going down
  if (scrollTop > lastScrollTop){
    // yes we are heading down...
   Session.set("topicLimit", Session.get("topicLimit") + 4);
   }
  lastScrollTop = scrollTop;
  }
})
	/* For the comments lists */
Session.set("commentLimit", 8);
lastScrollTop = 0; 
$(window).scroll(function(event){
// test if we are near the bottom of the window
if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
  // where are we in the page? 
  var scrollTop = $(this).scrollTop();
  // test if we are going down
  if (scrollTop > lastScrollTop){
    // yes we are heading down...
   Session.set("commentLimit", Session.get("commentLimit") + 4);
   }
  lastScrollTop = scrollTop;
  }
})


//document.querySelector(".uiScrollableAreaWrap").scrollTop=100;

		/* And now the helpers of the webpage */
		
	/*The first one for the layout, to have the infinite scroll in the sideNav */
Template.sideNav.helpers({
    topics(){
	return Topics.find({}, {sort:{createdAt: -1}, limit:Session.get("topicLimit")});
	}
});
/* Now the helper for the search template for the searchbar */
Template.search.helpers({
	topics(){
		  var regexp = new RegExp(Session.get('search/keyword'), 'i');
		  return Topics.find({title: regexp}, {sort:{createdAt: -1}, limit:Session.get("topicLimit")}); 
		  return Topics.find({category: regexp}, {sort:{createdAt: -1}, limit:Session.get("topicLimit")}); 
		  return Topics.find({description: regexp}, {sort:{createdAt: -1}, limit:Session.get("topicLimit")}); 
		  var resultNumber = Topics.find().count();
		  return resultNumber;
	},
	/*searchCount:function(topics){
		var resultCount = Topics.find({}).count();
		if (resultCount>0){
			return resultCount;
		}
		else {
			return 'no';
		}
	},*/
	/*resultNumber: function() {
    Meteor.call("resultNumber", function(err, res){
     if(!err){Session.set("resultNumber", res)};
    });
    return Session.get("resultNumber");
    },*/
	getUser:function(user_id){
	var user = Meteor.users.findOne({_id:user_id});
	if (user){
		return user.username;
	}
	else {
		return "anonymous";
	  }
	}
});
	/* This helper is for the newsfeed template in the home page */
Template.newsfeed.helpers({
    topics(){
	return Topics.find({}, {sort:{createdAt: -1}, limit:Session.get("topicLimit")}); 
	}
});
	/* These helpers are to return the category selected topics for each main category page */
Template.general.helpers({
    topics(){
	return Topics.find({category: 'General'}, {sort:{createdAt: -1}, limit:Session.get("topicLimit")}); 
	}
});
Template.instruments.helpers({
    topics(){
	return Topics.find({category: 'Instruments'}, {sort:{createdAt: -1}, limit:Session.get("topicLimit")}); 
	}
});
Template.theory.helpers({
    topics(){
	return Topics.find({category: 'Theory'}, {sort:{createdAt: -1}, limit:Session.get("topicLimit")}); 
	}
});
Template.buddybands.helpers({
    topics(){
	return Topics.find({category: 'BuddyBands'}, {sort:{createdAt: -1}, limit:Session.get("topicLimit")}); 
	}
});

	/* The helper for the commentFeed template */
Template.commentFeed.helpers({
	comments: function () {
	  selector = {topicId: this._id};
	  options = {sort: {createdAt: -1}};
	  return Comments.find(selector, options);
	},
});
	/* Now the helper to extract the username and upload it in the topic template*/
Template.topic.helpers({
	getUser:function(user_id){
	  var user = Meteor.users.findOne({_id:user_id});
	  if (user){
		return user.username;
	  }
	  else {
		return "anonymous";
	  }
	}
});
	/* Here is the helper for the comment template */
Template.comment.helpers({
	getUser:function(user_id){
	  var user = Meteor.users.findOne({_id:user_id});
	  if (user){
		return user.username;
	  }
	  else {
		return "anonymous";
	  }
	}
});



		/* Here are the events for the templates */
		
	/* First the template for the searchbar event */
Template.layout.events({
	'keyup #search': function(event){
		Session.set('search/keyword', event.target.value);
	}
});

	/* And the event to add data in the comments collection */
Template.singleTopic.events({
	submit: function (event) {
	  event.preventDefault();
	  const target = event.target;
	  var commentary = event.target.commentary.value;
	  Meteor.call('addComment', this._id, commentary);
	  target.commentary.value = '';
	},
			// Clear form
	////alert('Your comment has been added!');
    //}
});

Template.newTopic.events({
	submit: function (event) {
		event.preventDefault();
			const target = event.target;
			const title = event.target.title.value;
			const description = event.target.description.value;
			const category = event.target.category.value;
		Meteor.call('addTopic', this._id, title, description, category, function(error, result){
			var idResult = Topics.findOne({ _id: result });
					alert('Your topic has been created!');
			Router.go('singleTopic', {category: idResult.category, _id: idResult._id});
			});
		target.title.value = '';
		target.description.value = '';
	}
});









/*
Template.sideNav.events({
	onclick: function (event) {
		
	}
});

*/















/* Here ends the code for MusicBuddy */