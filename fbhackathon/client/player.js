import { Template } from 'meteor/templating';
import aeditorInit from './aeditorInit';
import aeditorEvent from './aeditorEvent';
import { Audio, uploads } from '../api/collections';
import {AudioRecorder} from 'meteor/maxencecornet:audio-recorder';
var recording = 0;
var audioRecorder = new AudioRecorder();
var playlist = undefined;
var renderingHere = false;

function audioInsert(audioFile, append) {
  Audio.insert(audioFile, function (err, fileObj) {
    var userId = Meteor.userId();
    if (userId) {
      var obj = {
        userId: userId,
        audioId: fileObj._id
      };
      uploads.insert(obj);
      fileObj.once("uploaded", function () {
        var path = '/audio/' + 'audio-' + fileObj._id + '-' + fileObj.name();
        var newAudioInfo = {
          src: path,
          name: fileObj.name(),
        }
        var audioInfo;
        if (append) {
          audioInfo = playlist.getInfo();
          audioInfo.push(newAudioInfo);
        } else {
          audioInfo = [newAudioInfo];
        }
        playlist.clear().then(function() {
          playlist.load(audioInfo);
        });
      });
    }
  });
}
Template.player.onRendered(function (){
    playlist = aeditorInit();
    aeditorEvent(playlist);
    playlist.getEventEmitter().on('audiorenderingfinished', function (type, data) {
      if (renderingHere) {
        var audioFile = new File([data], 'merge.wav');
        audioInsert(audioFile, false);
      }
      renderingHere = false;
    });
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
                var audioFile = new File([data],'input.wav');
                audioInsert(audioFile, true);
            });
            //audioRecorder.stopRecording('wav', 'wavFile');

            recording = 0;          
        }   
    }
});

        }

    },

    'change input[name="audio"]': function(event) {
      var files = event.target.files;
      for (var i = 0, ln = files.length; i < ln; i++) {
        audioInsert(files[i], true);
      }
      event.target.value = '';
    },

    'click .merge': function(event) {
      console.log("asd");
      playlist.getEventEmitter().emit('startaudiorendering', 'wav');
      renderingHere = true;
    }
});
