import { Template } from 'meteor/templating';
import aeditorInit from './aeditorInit';
import aeditorEvent from './aeditorEvent';
import { Audio } from '../api/collections';

Template.player.onRendered(function (){
    var playlist = aeditorInit();
    aeditorEvent(playlist);
});

Template.uploadForm.events({
  'change input[name="audio"]': function(event) {
    var files = event.target.files;
    for (var i = 0, ln = files.length; i < ln; i++) {
      Audio.insert(files[i], function (err, fileObj) {
      });
    }
  }
});
