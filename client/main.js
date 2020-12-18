/* Javascript file for MusicBuddy */

	/* First the general code for the whole website */
/* First to link the documents between themselves */
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import './main.html';

/* Creating the topics database (mongo collection) */
Topics = new Mongo.Collection('topics');

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

Router.route('/post/:_id/comments/:commentId', function () {
  var id = this.params._id; // "5"
  var commentId = this.params.commentId; // "100"
});

	
/* Now the code for the website */


/* Code for the layout (in relation to the main Id) */
	/* The navbar */
		/* Now about the login buttons, to add a username to the sign in form */
if (Meteor.isClient){
	Accounts.ui.config({passwordSignupFields: "USERNAME_AND_EMAIL"});
}
	/* The sidebar */
/*Template.layout.event({
	"click.js-open-btn":function(event){alert('Hello!')
		/*document.getElementById("mySidenav").style.width = "250px";
		document.getElementById("main").style.marginLeft = "250px";
		document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
	}
}); */
/*Template.layout.events({
'click .js-open-btn':function(event){
    alert('Hello!');
}, 
/* This should have worked, I'll have to repair it later */
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


/* Now the code for the routed-pages */

/* Now the code for the home page */
	/* The event handler for adding information in the topics collection */
Template.newTopic.events({
		// This event is for new-topic class given to the button
    'submit.new-topic'(event) {
			// Prevent default browser form submit
		event.preventDefault();
			// Get value from form element
		const target = event.target;
		const title = target.title.value;
		const content = target.content.value;
		const category = target.category.value;
			// Insert a task into the collection
		Topics.insert({
			title,
			category,
			createdBy: Meteor.user()._id,
			createdAt: new Date(), // current time
			content
		});
			// Clear form
		target.title.value = '';
		target.content.value = '';
		alert('Your topic has been created!');
/* Now we need to send the user to his new topic page using routes */
		/*Router.route('/blabla', {
			name: 'blabla',
			template: 'blabla'
		}); doesnt work */
    }
});

	/* Now to sort the newsfeed by newest dates using a template helper*/
Template.newsfeed.helpers({
    topics() {
        return Topics.find({}, { sort: { createdAt: -1 } });
	},

});

	/* Here are the helpers for the topic template */
Template.topic.helpers({
		/* First the helper to extract the username and upload it */
	getUser:function(user_id){
	  var user = Meteor.users.findOne({_id:user_id});
	  if (user){
		return user.username;
	  }
	  else {
		return "anon";
	  }
	}
});


/* Template.newTopic.events({
    'submit.new-topic'(event) {
        return Router.route('/category/title', {
				name: 'title',
				template: 'singleTopic'
		});
	}
});
*/


/* Here ends the code for MusicBuddy */






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



/* Now to implement the infinite scroll for the newsfeed */
/* 
if(Meteor.isClient){
	Session.set("topicLimit", 8);
	lastScrollTop = 0;
	$(window).scroll(function(event){
		if($(window).scrollTop() + $(window).height() > $(document).height() - 100){
			/* where are we in the page 
			var scrollTop = $(this).scrollTop();
			/* test if we are going down 
			if(scrollTop>lastScrollTop){
			/* yes we are going down 
			Session.set("topicLimit",Session.get("topicLimit") + 4;}
		}
	})
}

*/




/* For future routes

Router.route('/acrostics', {
  name: 'acrostics',
  template: 'acrostics'
});

*/