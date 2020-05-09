import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const FoodTrucksCollection = new Mongo.Collection('FoodTrucksCollection');

/** Define a schema to specify the structure of each document in the collection. */
const FoodTruckSchema = new SimpleSchema({
  name: {
    type: String,
    unique: true,
    index: true,
  },
  vendorIcon: {
    type: String,
    unique: true,
    index: true,
  },
  typeOfCuisine: String,
  Description: String,
  takesMeals: Boolean,
}, { tracker: Tracker });

// const myValidationContext = myContext.isValid();

/** Attach this schema to the collection. */
FoodTrucksCollection.attachSchema(FoodTruckSchema);

/** Make the collection and schema available to other code. */
export { FoodTrucksCollection, FoodTruckSchema };
