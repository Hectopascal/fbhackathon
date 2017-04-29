import { uploads } from '../api/collections.js';

Template.profile.helpers({
  uploads() {
  	return uploads.find({ owner: Meteor.userId() });
  },
  userID(){
  	return Meteor.userId();
  },
})
