import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const FavoritesCollection = new Mongo.Collection('FavoritesCollection');

/** Define a schema to specify the structure of each document in the collection. */
const FavoritesCollectionSchema = new SimpleSchema({
  userName: String,
  restaurantName: String, // like the owner tag, this is what links it to whichever restaurant it is
}, { tracker: Tracker });

/** Attach this schema to the collection. */
FavoritesCollection.attachSchema(FavoritesCollectionSchema);

/** Make the collection and schema available to other code. */
export { FavoritesCollection, FavoritesCollectionSchema };
