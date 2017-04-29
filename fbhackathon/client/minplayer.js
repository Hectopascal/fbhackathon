import { Audio } from '../api/collections.js';
import aeditorInit from './aeditorInit';
import aeditorEvent from './aeditorEvent';

var playlist = undefined;

Template.minPlayer.onRendered(function(){
  playlist = aeditorInit();
  aeditorEvent(playlist);
});

Template.minPlayer.events({
  'click .btn-play': function(event){
      var fileObj = Audio.findOne();
      var audioInfo = playlist.getInfo();
      var path = '/audio/' + 'audio-' + fileObj._id + '-' + fileObj.name();
      audioInfo.push({
        src: path,
        name: fileObj.name(),
      });
      playlist.getEventEmitter().emit('clear');
      playlist.load(audioInfo);
  },


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
          fileObj.on("uploaded", function () {
            var audioInfo = playlist.getInfo();
            var path = '/audio/' + 'audio-' + fileObj._id + '-' + fileObj.name();
            audioInfo.push({
              src: path,
              name: fileObj.name(),
            });
            playlist.getEventEmitter().emit('clear');
            playlist.load(audioInfo);
          });
        }
      });
    }
  }
});