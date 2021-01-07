/* Javascript file for MusicBuddy */

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
Router.route('/Search', {
	name: 'search',
	template: 'search'
});
		/* This is the route that will be rendered for each topic link that a user clicks */
	/* Still missing the category to assign instead of the 'topic' like '/category/:_id */
Router.route('/:category/:_id', {
	template: 'singleTopic',
	data: function(){
		var currentList = this.params._id;
		return Topics.findOne({ _id: currentList });
		var currentCategory = this.params.category;
		return Topics.findOne({ category: currentCategory });
    }
});


	
	/* Now the code for the routed pages */

/* Code for the layout template */
	/* The navbar */
		/* Now about the login buttons, to add a username to the sign in form */
Accounts.ui.config({passwordSignupFields: "USERNAME_AND_EMAIL"});

	/* The sidebar */
/* This should have worked, I'll have to repair it later */
/*Template.layout.event({
	"click.js-open-btn":function(event){alert('Hello!')
		/*document.getElementById("mySidenav").style.width = "250px";
		document.getElementById("main").style.marginLeft = "250px";
		document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
	}
}); */
	/*First to rename the function names */
window.openNav = openNav;
window.closeNav = closeNav;
	/* Now the openNav function */ 
function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
	document.getElementById("main").style.marginLeft = "250px";
	document.body.style.backgroundColor = "rgba(0,0,0,0.4)";

}
 	/*Now the closeNav Function */
function closeNav() {
	document.getElementById("mySidenav").style.width = "0px";
	document.getElementById("main").style.marginLeft = "0px";
	document.body.style.backgroundColor = "white";
}



/* Now the code for the search tool (client side!) */
/* !!!!!!!!!!!!!!!!!!!!!!!!! */







		/* Here is the infinite scroll */
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




		/* And now the helpers of the webpage */
		
	/*The first one for the layout, to have the infinite scroll in the sidenav */
Template.layout.helpers({
    topics(){
	return Topics.find({}, {sort:{createdAt: -1}, limit:Session.get("topicLimit")}); 
	}
});
/* Now the helper for the search template for the searchbar */
Template.search.helpers({
		/* First the helper to extract the username and upload it */
	getSearch:function(query){
	  var result = Topics.find({});
	  if (result){
		return result;
	  }
	  else {
		return "anonymous";
	  }
	}
});


	/* Then for the mainpage and all the 4 secondary pages */
/* !!!!!!! Here we still need to sort with the category !!!!!!!!*/
Template.newsfeed.helpers({
    topics(){
	return Topics.find({}, {sort:{createdAt: -1}, limit:Session.get("topicLimit")}); 
	}
});
Template.general.helpers({
    topics(){
	return Topics.find({}, {sort:{createdAt: -1}, limit:Session.get("topicLimit")}); 
	}
});
Template.instruments.helpers({
    topics(){
	return Topics.find({}, {sort:{createdAt: -1}, limit:Session.get("topicLimit")}); 
	}
});
Template.theory.helpers({
    topics(){
	return Topics.find({}, {sort:{createdAt: -1}, limit:Session.get("topicLimit")}); 
	}
});
Template.buddybands.helpers({
    topics(){
	return Topics.find({}, {sort:{createdAt: -1}, limit:Session.get("topicLimit")}); 
	}
});

/* Here we still need to sort only the comments of this very topic */
Template.commentfeed.helpers({
    comments() {
	return Comments.find({}, {sort:{createdAt: -1}, limit:Session.get("commentLimit")}); 
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
		/* First the helper to extract the username and upload it */
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
		/* The event for adding data in the topics collection */
Template.newTopic.events({
		/* This event is for new-topic class given to the button */
    'submit.new-topic'(event) {
			/* Prevent default browser form submit */
		event.preventDefault();
			/* Get value from form element */
		const target = event.target;
		const title = target.title.value;
		const description = target.description.value;
		const category = target.category.value;
			/* Insert a task into the collection only if the user is logged in */
		if(Meteor.user()){Topics.insert({
							title,
							category,
							createdBy: Meteor.user()._id,
							createdAt: new Date(),
							description,
		});}
		else{alert('You must log in to create a topic!');
		return false
		};
			/* Clear form if topic created */
		target.title.value = '';
		target.description.value = '';
		alert('Your topic has been created!');
			/* Now we need to send the user to his new topic page using routes */
/* Still missing the correct adress but it is going better */
		Router.go('/:category/:_id', {
			template: 'singleTopic',
			data: function(){
				var currentList = this.params._id;
				return Topics.findOne({ _id: currentList });
				var currentCategory = this.params.category;
				return Topics.findOne({ category: currentCategory });
			}
		});
    }
});

	/* And the event to add data in the comments collection */
Template.singleTopic.events({
		// This event is for new-topic class given to the button
    'submit.new-comment'(event) {
			// Prevent default browser form submit
		event.preventDefault();
			// Get value from form element
		const target = event.target;
		const commentary = target.commentary.value;
			// Insert a task into the collection
		Comments.insert({
			commentary,
			createdBy: Meteor.user()._id,
			createdAt: new Date(),
			topic: this.topic
		});
			// Clear form
		target.commentary.value = '';
		alert('Your comment has been added!');
    }
});





























/* Here ends the code for MusicBuddy */

/* Test... 
console.log(
	Comments.find().count()
);

'keyup form input': _.debounce(function(event, template) {
  event.preventDefault();
  Session.set('searchQuery', template.find('form input').value);
}, 300)

var searchQuery = Meteor.subscribe('searchTopics', Session.get('searchQuery'));

if (Session.get('searchQuery')) {
  return Topics.find({}, { sort: [['score', 'desc']] });
}
return Topics.find();

/* Now to add an event for the create new topic fo users to be logged in */
/* Doesn't work for now, will have to do it later

Template.layout.events({
	"click-js-add-topic": function(event){
		event.preventDefault();
		if(!Meteor.user()){
		alert("You need to login first!");}
		else{

})*/
/*
Meteor.methods({
	addTopic: function(){
		var topic;
		if(!this.userId){return;}
		else{topic = {owner: this.userId,createdOn: new Date(),title: "mynewtopic"};
				Topics.insert(topic);}
}) */


/*
	Session.set("topicLimit", 8);
	lastScrollTop = 0;
	$(window).scroll(function(event){
		if($(window).scrollTop() + $(window).height() > $(document).height() - 100){
			// where are we in the page 
			var scrollTop = $(this).scrollTop();
			// test if we are going down 
			if(scrollTop>lastScrollTop){
			// yes we are going down 
				Session.set("topicLimit",Session.get("topicLimit") + 4};
		lastSrollTop=ScrollTop;
		}
	})*/