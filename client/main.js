/* First to link the documents between themselves */
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import './main.html';

/* Creating the topics database */
Topics = new Mongo.Collection('topics');

/* First of all the routing */
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

/* Code for the layout (in relation to the main ID !!!) */
	/* First to rename the function names */
window.openNav= openNav;
window.closeNav= closeNav;

/*Template.layout.event({"click.openbtn":function(event){});*/
/* Now the openNav function */
function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
	document.getElementById("main").style.marginLeft = "250px";
	document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}
  

/* Now the closeNav Function */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0px";
  document.getElementById("main").style.marginLeft = "0px";
  document.body.style.backgroundColor = "white";
}


/* Now about the login buttons, to add a username to the sign in form */
if (Meteor.isClient){
	Accounts.ui.config({passwordSignupFields: "USERNAME_AND_EMAIL"});
}

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


/* And now the event handler for adding information in the topics collection */
Template.newTopic.events({
    'submit .new-topic'(event) {
			// Prevent default browser form submit
		event.preventDefault();
			// Get value from form element
		const target = event.target;
		const text = target.text.value;
			// Insert a task into the collection
		Topics.insert({
        text,
        createdAt: new Date(), // current time
		});
			// Clear form
		target.text.value = '';
    },
});
/* Now to sort the newsfeed by newest dates using a template helper*/
Template.newsfeed.helpers({
    topics() {
        return Topics.find({}, { sort: { createdAt: -1 } });
      },
});



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