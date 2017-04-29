import { uploads } from '../api/collections.js';

Template.profile.helpers({
  uploads() {
  	return uploads.find({ upId: Meteor.userId()});
  },
})
