import { Meteor } from 'meteor/meteor';

import '../api/collections.js';
import { Audio } from '../api/collections.js';

Meteor.startup(() => {
  // code to run on server at startup
});

Audio.allow({
  'insert': function () {
    // add custom authentication code here
    return true;
  }
});
