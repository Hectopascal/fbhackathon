import { Template } from 'meteor/templating';
import aeditorInit from './aeditorInit';
import aeditorEvent from './aeditorEvent';
import { Audio, uploads } from '../api/collections';

Template.player.onRendered(function (){
    this.playlist = aeditorInit();
    aeditorEvent(this.playlist);
});

Template.uploadForm.events({
  'change input[name="audio"]': function(event) {
    var files = event.target.files;
    for (var i = 0, ln = files.length; i < ln; i++) {
      Audio.insert(files[i], function (err, fileObj) {
        var userId = Meteor.userId();
        if (userId) {
          var obj = {
            userId: userId,
            audioId: fileObj._id
          };
          uploads.insert(obj);
        }
      });
    }
  }
});
