import { Template } from 'meteor/templating';
import aeditorInit from './aeditorInit';
import aeditorEvent from './aeditorEvent';
import { Audio, uploads, userProfiles } from '../api/collections';
import {AudioRecorder} from 'meteor/maxencecornet:audio-recorder';
var recording = 0;
var audioRecorder = new AudioRecorder();
var playlist = undefined;
var renderingHere = false;
var mergeName = undefined;

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
    var audioId = Router.current().params.query.audioId;
    var audioName = Router.current().params.query.audioName;
    var audioInfo = null;
    if (audioId && audioName) {
      audioInfo = [{
        src: '/audio/audio-' + audioId + '-' + audioName,
        name: audioName,
      }];
    }
    playlist = aeditorInit(audioInfo);
    aeditorEvent(playlist);
    playlist.getEventEmitter().on('audiorenderingfinished', function (type, data) {
      if (renderingHere) {
        if (!mergeName) {
          mergeName = 'merge.wav';
        } else {
          mergeName += '.wav';
        }
        var audioFile = new File([data], mergeName);
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
        var button = document.getElementById("recordingButton");
        button.classList.remove('start');
        button.classList.add('stop');
        button.innerHTML = "Stop Recording";
    },
    'click .stop': function(){
        if(recording) {
            audioRecorder.stopRecording('Uint8Array', 'ArrayBufferFile', function (error, result) {
                var data = new Blob([result],{type:'audio/wav'});
                var fileName = prompt("Please name your file:", "voice");
                var audioFile = new File([data],fileName+".mp3");
                audioInsert(audioFile, true);
            });
            //audioRecorder.stopRecording('wav', 'wavFile');

            recording = 0;

        }
        var button = document.getElementById("recordingButton");
        button.classList.add('start');
        button.classList.remove('stop');
        button.innerHTML = "Start Recording";

    },

    'change input[name="audio"]': function(event) {
      var files = event.target.files;
      for (var i = 0, ln = files.length; i < ln; i++) {
        audioInsert(files[i], true);
      }
      event.target.value = '';
    },

    'click .merge': function(event) {
      playlist.getEventEmitter().emit('startaudiorendering', 'wav');
      var nameArr = playlist.getInfo().map(function(value) {
        var idx = value.name.lastIndexOf('.');
        return value.name.substring(0, idx);
      });
      mergeName = nameArr.join('_');
      console.log(mergeName);
      renderingHere = true;
    }
});
