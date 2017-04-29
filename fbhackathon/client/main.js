import { Template } from 'meteor/templating';

import './main.html';
import './routes.js';
import './loginRegister.js';

Template.Home.helpers({
  currentUser: function() {
    return Meteor.user();
  }
})




