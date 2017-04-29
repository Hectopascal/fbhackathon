import { uploads } from '../api/collections.js';

Template.Home.helpers({
  uploads() {
  	return uploads.find({});
  },
})
