import { Template } from 'meteor/templating';
import aeditorInit from './aeditorInit';
import aeditorEvent from './aeditorEvent';

Template.player.onRendered(function (){
    console.log("asd");
    var playlist = aeditorInit();
    aeditorEvent(playlist);
});
