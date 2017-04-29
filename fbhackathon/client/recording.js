Template.Home.events({
	'click button': function(){
		var audioRecorder = new AudioRecorder();
		//Sync usage with .wav
		audioRecorder.stopRecording('wav', 'wavFile');

		// Async usage with ArrayBuffer
		audioRecorder.stopRecording('Uint8Array', 'ArrayBufferFile', function (error, result) {
	    // result contains the audio file input Array buffer
		});
	}
});