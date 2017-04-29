import { Mongo } from 'meteor/mongo';
 
export const userProfiles = new Mongo.Collection('userProfiles');
export const uploads = new Mongo.Collection('uploads');
