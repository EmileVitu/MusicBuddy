/* Javascript file for MusicBuddy Client side */



			/* First the general code for the whole website */

		/* To link the documents between themselves */
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
Meteor.subscribe('topics');
Meteor.subscribe('comments');
Meteor.subscribe('search');



		/* Now the routing */
		
	/* The route for the "layout" template */
Router.configure({
	layoutTemplate: 'layout',
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
/* !!!!!!!!!!!!!!!!!!! Here we should be the onkeyup */
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



		/* Here are the infinite scrolls */

	/* The one for the topics feeds */
scrollTopics = function(){
	Session.set('topicLimit', 8);	
	var scrollingElement = document.querySelector('.scrollingPart');	
	scrollingElement.addEventListener('scroll', function() {
		if (scrollingElement.scrollTop + scrollingElement.clientHeight >= scrollingElement.scrollHeight) {
			Session.set('topicLimit', Session.get('topicLimit') + 4);
		}
	});
}
/* We probably will have to put querySelectorAll if we add a second scrolling part in the sideNav...  */
	/* And the one for the comments feed */
scrollComments = function(){
	Session.set('commentLimit', 8);	
	var scrollingElement = document.querySelector('.scrollingPart');	
	scrollingElement.addEventListener('scroll', function() {
		if (scrollingElement.scrollTop + scrollingElement.clientHeight >= scrollingElement.scrollHeight) {
			Session.set('commentLimit', Session.get('commentLimit') + 4);
		}
	});
}
	/* For the sideNav */
scrollSideNav = function(){
	Session.set('topicLimit', 8);	
	var scrollingElement = document.querySelector('.sideNav');	
	scrollingElement.addEventListener('scroll', function() {
		if (scrollingElement.scrollTop + scrollingElement.clientHeight >= scrollingElement.scrollHeight) {
			Session.set('topicLimit', Session.get('topicLimit') + 4);
		}
	});
}
		/* Now we can launch these two function on template rendering coupled with the find() function in their helpers */
/* Still need to make closenav better on rendering and a clear form for the search form ? */
	/* First the templates querying the Topics collection */
Template.home.onRendered(scrollTopics);
Template.general.onRendered(scrollTopics);
Template.instruments.onRendered(scrollTopics);
Template.theory.onRendered(scrollTopics);
Template.buddybands.onRendered(scrollTopics);
Template.search.onRendered(scrollTopics);
	/* And the template querying the Comments collection */
Template.singleTopic.onRendered(scrollComments);



/* !!!!!!! Must sort out the sidenav... !!!!!!!  */
Template.sideNav.onRendered(scrollSideNav);





			/* Now the code for the routed pages */

		/* Code for the layout template */
		/* The navbar */
	/* Now about the login buttons, to add a username to the sign in form */
Accounts.ui.config({passwordSignupFields: "USERNAME_AND_EMAIL"});




		/* And now the helpers of the routed templates */
		
	/* Now the helper for the search template for the searchbar */
Template.search.helpers({
	topics(){
		var regexp = new RegExp(Session.get('search/keyword'), 'i');
		var result = Topics.find({$or: [{title: regexp}, {category: regexp}, {description: regexp}]}, {sort:{createdAt: -1}, limit:Session.get("topicLimit")}); 
		return result;
	},
	resultCount: function(topics){
		var regexp = new RegExp(Session.get('search/keyword'), 'i');
		var resultCount = Topics.find({$or: [{title: regexp}, {category: regexp}, {description: regexp}]}, {sort:{createdAt: -1}}).count(); 
		if (resultCount>0){
			return resultCount;
		}
		else {
			return 'no';
		}
		console.log(resultCount);
	},
});		
	/* Now the sideNav to have the topics newsfeed with latest comment if any in the sideNav */
Template.sideNav.helpers({
    topics(){
		return Topics.find({}, {sort:{createdAt: -1}, limit:Session.get('topicLimit')});
	}
});
Template.sideNavTopic.helpers({
	comments(){
		return Comments.find({topicId: this._id}, {sort:{createdAt: -1}, limit: 1});
	}	
});
	/* This helper is for the newsFeed template in the home page */
Template.newsFeed.helpers({
    topics(){
		return Topics.find({}, {sort:{createdAt: -1}, limit:Session.get('topicLimit')}); 
	}
});
	/* These helpers are to return the category selected topics for each mainTab page */
Template.general.helpers({
    topics(){
		return Topics.find({category: 'General'}, {sort:{createdAt: -1}, limit:Session.get('topicLimit')}); 
	}
});
Template.instruments.helpers({
    topics(){
		return Topics.find({category: 'Instruments'}, {sort:{createdAt: -1}, limit:Session.get('topicLimit')}); 
	}
});
Template.theory.helpers({
    topics(){
		return Topics.find({category: 'Theory'}, {sort:{createdAt: -1}, limit:Session.get('topicLimit')}); 
	}
});
Template.buddybands.helpers({
    topics(){
		return Topics.find({category: 'BuddyBands'}, {sort:{createdAt: -1}, limit:Session.get('topicLimit')}); 
	}
});
	/* The helper for the commentFeed template */
Template.commentFeed.helpers({
	comments: function (){
		selector = {topicId: this._id};
		options = {sort: {createdAt: -1}, limit: Session.get('commentLimit')};
		return Comments.find(selector, options);
	}
});
	/* Now the helper to extract the username and find the latest comment for each Topic */
Template.topic.helpers({
	getUser: function(user_id){
		var user = Meteor.users.findOne({_id:user_id});
		if (user){
			return user.username;
		}
		else {
			return 'Anonymous user';
		}
	},
	comments(){
		return Comments.find({topicId: this._id}, {sort:{createdAt: -1}, limit: 1});
	}
});
	/* The helper for the singleTopic route */
Template.singleTopic.helpers({
	getUser: function(user_id){
		var user = Meteor.users.findOne({_id:user_id});
		if (user){
			return user.username;
		}
		else {
			return 'Anonymous user';
		}
	},
});



		/* Here are the events for the templates */
		
	/* First the keyup responsive event for the searchTool */
Template.layout.events({
	'keyup #search': function(event){
		Session.set('search/keyword', event.target.value);
	}
});
	/* The sideNav openNav and closeNav events */
Template.sideNav.events({
	'click .openNav': function(event){
		document.querySelector('.openNav').style.display = 'none';
		document.querySelector('.closeNav').style.display = 'block';
/*		document.querySelector('.sideNav').style.fontSize = '13px';		*/
		document.getElementById('mySideNav').style.width = '250px';
		document.getElementById('main').style.marginLeft = '250px';
		document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
	},
	'click .sideNavLinks': function(event){
		document.querySelector('.closeNav').style.display = 'none';
		document.querySelector('.openNav').style.display = 'block';
		document.getElementById('mySideNav').style.width = '0px';
		document.getElementById('main').style.marginLeft = '0px';
		document.body.style.backgroundColor = 'white';		
	},
	'click .closeNav': function(event){
		document.querySelector('.closeNav').style.display = 'none';
		document.querySelector('.openNav').style.display = 'block';
		document.getElementById('mySideNav').style.width = '0px';
		document.getElementById('main').style.marginLeft = '0px';
		document.body.style.backgroundColor = 'white';
	}
}); 
	/* And the event to add data in the topics collection using a meteor method for security */
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
	/* Now the event to add data in the comments collection using a meteor method for security */
Template.singleTopic.events({
	submit: function (event) {
		event.preventDefault();
		const target = event.target;
		var commentary = event.target.commentary.value;
		Meteor.call('addComment', this._id, commentary);
		target.commentary.value = '';
	}
// Clear form
////alert('Your comment has been added!');
//}
//}
});









/* !!!!!!!!!!!!!!!!!! All the rest we must sort out !!!!!!!!!!!!!!!!!!! */

/*
Template.sideNav.events({
	onclick: function (event) {
		
	}
});

*/















/* Here ends the code for MusicBuddy */