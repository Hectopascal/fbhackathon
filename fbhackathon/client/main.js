import { Template } from 'meteor/templating';

import './main.html';
import './routes.js'

Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var username = $('[name=username]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            username: username,
            password: password
        });
        Router.go('/home');
    }
});

Template.Home.helpers({
  currentUser: function() {
    return Meteor.user();
  }
})


Template.navigation.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    	Router.go('/login');
    }
});

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var username = $('[name=username]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(username, password);
        Router.go('/home');
    }
});