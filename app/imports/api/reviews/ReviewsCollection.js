import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const ReviewsCollection = new Mongo.Collection('ReviewsCollection');

/** Define a schema to specify the structure of each document in the collection. */
const ReviewsCollectionSchema = new SimpleSchema({
  restaurantName: String, // like the owner tag, this is what links it to whichever restaurant it is
  rating: Number,
  dateOfReview: String,
  dateOfVisit: String,
  writeUp: String, // Need a new name for this variable
  image: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
ReviewsCollection.attachSchema(ReviewsCollectionSchema);

/** Make the collection and schema available to other code. */
export { ReviewsCollection, ReviewsCollectionSchema };
