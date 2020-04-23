import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const RestaurantCollection = new Mongo.Collection('RestaurantCollection');

/** Define a schema to specify the structure of each document in the collection. */
const RestaurantCollectionSchema = new SimpleSchema({
  name: String,
  vendorIcon: String,
  typeOfCuisine: String,
  Description: String,
  takesMeals: Boolean,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
RestaurantCollection.attachSchema(RestaurantCollectionSchema);

/** Make the collection and schema available to other code. */
export { RestaurantCollection, RestaurantCollectionSchema };
