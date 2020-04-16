import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const HoursCollection = new Mongo.Collection('HoursCollection');

/** Define a schema to specify the structure of each document in the collection. */
const HoursCollectionSchema = new SimpleSchema({
  restaurantName: String,
  sunday: String,
  monday: String,
  tuesday: String,
  wednesday: String,
  thursday: String,
  friday: String,
  saturday: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
HoursCollection.attachSchema(HoursCollectionSchema);

/** Make the collection and schema available to other code. */
export { HoursCollection, HoursCollectionSchema };
