import { Mongo } from 'meteor/mongo';

export const userProfiles = new Mongo.Collection('userProfiles');
export const uploads = new Mongo.Collection('uploads');
export const Audio = new FS.Collection('audio', {
  stores: [new FS.Store.FileSystem('audio', {path: Meteor.absolutePath + '/public/media/audio'})]
});
