import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

/*
Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
*/
Router.configure({
  layoutTemplate: 'layout'
});
Router.route('/', {
  name: 'main',
  template: 'main'
});


/* First to rename the function names */
window.openNav= openNav;
window.closeNav= closeNav;
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
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