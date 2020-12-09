import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

/* First of all the routing */
		/* The route for the layout template */
Router.configure({
  layoutTemplate: 'layout'
});
		/* The route for the mainpage */
Router.route('/', {
  name: 'main',
  template: 'main'
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

Router.route('/nfnoscar', {
  name: 'nfnoscar',
  template: 'nfnoscar'
});
Router.route('/nfnoscarsdonut', {
  name: 'nfnoscarsdonut',
  template: 'nfnoscarsdonut'
});
Router.route('/alliterationstation', {
  name: 'alliterationstation',
  template: 'alliterationstation'
});
Router.route('/btakpm', {
  name: 'btakpm',
  template: 'btakpm'
});
Router.route('/homonyms', {
  name: 'homonyms',
  template: 'homonyms'
});
Router.route('/acrostics', {
  name: 'acrostics',
  template: 'acrostics'
});
*/