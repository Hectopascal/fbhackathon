import {AudioRecorder} from 'meteor/maxencecornet:audio-recorder';
var recording = 0;
var audioRecorder = new AudioRecorder();
Template.Home.events({

    'click .start': function(){
 
        if(!recording){
            audioRecorder.startRecording();
            recording = 1;
        }
    },

    'click .stop': function(){
        if(recording) {
            audioRecorder.stopRecording('wav', 'wavFile');
            recording = 0;
        }

        // Async usage with ArrayBuffer
        //audioRecorder.stopRecording('Uint8Array', 'ArrayBufferFile', function (error, result) {
        // result contains the audio file input Array buffer
        
    }
});