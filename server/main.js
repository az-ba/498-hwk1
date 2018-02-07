import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Input = new Mongo.Collection('input');
});
