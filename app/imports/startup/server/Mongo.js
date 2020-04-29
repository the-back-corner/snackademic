import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { FoodTrucksCollection } from '../../api/foodTrucks/FoodTrucksCollection';
import { HoursCollection } from '../../api/hours/HoursCollection';
import { LocationCollection } from '../../api/location/LocationCollection';
import { MenuItemCollection } from '../../api/menu/MenuItemCollection';
import { RestaurantCollection } from '../../api/restaurant/RestaurantCollection';
import { ReviewsCollection } from '../../api/reviews/Reviews';
/* eslint-disable no-console */

/** Initialize the database with a default data document. */

function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.insert(data);
}

/** Initialize the database with a default data document. */
function addFoodTruck(data) {
  console.log(`  Adding: ${data.name}`);
  FoodTrucksCollection.insert(data);
}

/** Initialize the database with a default data document. */
function addHours(data) {
  // eslint-disable-next-line max-len
  console.log(`  Adding: ${data.restaurantName} (${data.sunday})(${data.monday})(${data.tuesday})(${data.wednesday})(${data.thursday})(${data.friday})(${data.saturday})`);
  HoursCollection.insert(data);
}

/** Initialize the database with a default data document. */
function addLocation(data) {
  // eslint-disable-next-line max-len
  console.log(`  Adding: ${data.restaurantName} (${data.sunday})(${data.monday})(${data.tuesday})(${data.wednesday})(${data.thursday})(${data.friday})(${data.saturday})`);
  LocationCollection.insert(data);
}

/** Initialize the database with a default data document. */
function addMenuItem(data) {
  console.log(`  Adding: ${data.restaurantName} (${data.itemName}) (${data.price})`);
  MenuItemCollection.insert(data);
}

/** Initialize the database with a default data document. */
function addRestaurant(data) {
  console.log(`  Adding: ${data.name}`);
  RestaurantCollection.insert(data);
}

/** Initialize the database with a default data document. */
function addReview(data) {
  // eslint-disable-next-line max-len
  console.log(`  Adding: ${data.restaurantName} (${data.rating})(${data.dateOfReview})(${data.dateOfVisit})(${data.writeUp})(${data.image})`);
  ReviewsCollection.insert(data);
}

if ((Meteor.settings.loadAssetsFile) && (RestaurantCollection.find().count() === 0)) {
  // const assetsFileName = 'data.json';
  const hoursAssetsFileName = 'hoursData.json';
  const locationsAssetsFileName = 'locationsData.json';
  const menuItemsAssetsFileName = 'menuItemsData.json';
  const restaurantsAssetsFileName = 'restaurantsData.json';
  const reviewAssetsFileName = 'reviewData.json';

  // console.log(`Loading data from private/${assetsFileName}`);
  console.log(`Loading hours data from private/${hoursAssetsFileName}`);
  console.log(`Loading locations data from private/${locationsAssetsFileName}`);
  console.log(`Loading menu items data from private/${menuItemsAssetsFileName}`);
  console.log(`Loading restaurants data from private/${restaurantsAssetsFileName}`);
  console.log(`Loading review data from private/${reviewAssetsFileName}`);
  const hoursJsonData = JSON.parse(Assets.getText(hoursAssetsFileName));
  const locationsJsonData = JSON.parse(Assets.getText(locationsAssetsFileName));
  const menuItemsJsonData = JSON.parse(Assets.getText(menuItemsAssetsFileName));
  const restaurantsJsonData = JSON.parse(Assets.getText(restaurantsAssetsFileName));
  const reviewJsonData = JSON.parse(Assets.getText(reviewAssetsFileName));
  // const jsonData = JSON.parse(Assets.getText(assetsFileName));
  restaurantsJsonData.defaultFoodTrucks.map(data => addFoodTruck(data));
  hoursJsonData.defaultHours.map(data => addHours(data));
  locationsJsonData.defaultLocation.map(data => addLocation(data));
  menuItemsJsonData.defaultMenuItem.map(data => addMenuItem(data));
  restaurantsJsonData.defaultRestaurant.map(data => addRestaurant(data));
  reviewJsonData.defaultReview.map(data => addReview(data));

}


/** Initialize the collection if empty. */
if (ReviewsCollection.find().count() === 0) {
  if (Meteor.settings.defaultReview) {
    console.log('Creating default review.');
    Meteor.settings.defaultReview.map(data => addReview(data));
  }
}

/** Initialize the collection if empty. */
if (RestaurantCollection.find().count() === 0) {
  if (Meteor.settings.defaultRestaurant) {
    console.log('Creating default restaurant.');
    Meteor.settings.defaultRestaurant.map(data => addRestaurant(data));
  }
}

/** Initialize the collection if empty. */
if (MenuItemCollection.find().count() === 0) {
  if (Meteor.settings.defaultMenuItem) {
    console.log('Creating default Menu Item.');
    Meteor.settings.defaultMenuItem.map(data => addMenuItem(data));
  }
}

/** Initialize the collection if empty. */
if (LocationCollection.find().count() === 0) {
  if (Meteor.settings.defaultLocation) {
    console.log('Creating default Location.');
    Meteor.settings.defaultLocation.map(data => addLocation(data));
  }
}

/** Initialize the collection if empty. */
if (HoursCollection.find().count() === 0) {
  if (Meteor.settings.defaultHours) {
    console.log('Creating default Hours.');
    Meteor.settings.defaultHours.map(data => addHours(data));
  }
}

/** Initialize the collection if empty. */
if (FoodTrucksCollection.find().count() === 0) {
  if (Meteor.settings.defaultFoodTrucks) {
    console.log('Creating default Food Truck.');
    Meteor.settings.defaultFoodTrucks.map(data => addFoodTruck(data));
  }
}

/** Initialize the collection if empty. */
if (Stuffs.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}
