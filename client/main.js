import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

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

/* Code for the layout (in relation to the main ID !!!) */
	/* First to rename the function names */
window.openNav= openNav;
window.closeNav= closeNav;
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


/* For future routes

Router.route('/homonyms', {
  name: 'homonyms',
  template: 'homonyms'
});
Router.route('/acrostics', {
  name: 'acrostics',
  template: 'acrostics'
});

*/