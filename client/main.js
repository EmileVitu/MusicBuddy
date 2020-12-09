import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

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

Router.configure({
  layoutTemplate: 'layout'
});
Router.route('/', {
  name: 'main',
  template: 'main'
});
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
