import { uploads, Audio } from '../api/collections.js';
import aeditorInit from './aeditorInit.js';
import aeditorEvent from './aeditorEvent';

import './audiojs/audio.min.js';
var playlist = undefined;

Template.Home.onRendered(function (){
    playlist = aeditorInit();
    aeditorEvent(playlist);
    console.log('lol');

    audiojs.events.ready(function() {
        var as = audiojs.createAll();
    });
    //console.log(Audio.find({}).count());
    //var arr = uploads.find({}).toArray();

    
});
Template.Home.helpers({
  uploads() {
  	return Audio.find({});
  }
})
