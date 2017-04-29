import { Template } from 'meteor/templating';
import aeditorInit from './aeditorInit';
import aeditorEvent from './aeditorEvent';
import { Audio, uploads } from '../api/collections';
import {AudioRecorder} from 'meteor/maxencecornet:audio-recorder';
var recording = 0;
var audioRecorder = new AudioRecorder();
var playlist = undefined;

Template.player.onRendered(function (){
    playlist = aeditorInit();
    aeditorEvent(playlist);
});
Template.player.events({

    'click .start': function(){
        
        if(!recording){
            audioRecorder.startRecording();
            recording = 1;
        }
    },

    'click .stop': function(){
        if(recording) {
            audioRecorder.stopRecording('Uint8Array', 'ArrayBufferFile', function (error, result) {
                var data = new Blob([result],{type:'audio/wav'});
                //console.log('blah');
                Audio.insert(new File([data],'input.wav'),function (err, fileObj) {
                    var userId = Meteor.userId();
                    if (userId) {
                      var obj = {
                        userId: userId,
                        audioId: fileObj._id
                      };
                      uploads.insert(obj);
                      fileObj.on("uploaded", function () {
                        var audioInfo = playlist.getInfo();
                        console.log('/audio/' + 'audio-' + fileObj._id + '-' + fileObj.name());
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
            });
            //audioRecorder.stopRecording('wav', 'wavFile');

            recording = 0;
               
        }
        
    }
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
