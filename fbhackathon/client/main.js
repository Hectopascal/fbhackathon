import { Template } from 'meteor/templating';
//import './recording.js';
import './main.html';
import './loginRegister.html';
import '../api/routes.js';
import './loginRegister.js';
import './profile.js';
import './home.js';


import aeditorInit from './aeditorInit.js';
import aeditorEvent from './aeditorEvent';
import { Audio, uploads } from '../api/collections';
var playlist = undefined;

Template.Home.onRendered(function (){
    playlist = aeditorInit();
    aeditorEvent(playlist);
});
