import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { FoodTrucksCollection } from '../../api/foodTrucks/FoodTrucksCollection';
import { HoursCollection } from '../../api/hours/HoursCollection';
import { LocationCollection } from '../../api/location/LocationCollection';
import { MenuItemCollection } from '../../api/menu/MenuItemCollection';
import { RestaurantCollection } from '../../api/restaurant/RestaurantCollection';
import { ReviewsCollection } from '../../api/reviews/Reviews';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Stuff', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('StuffAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.find();
  }
  return this.ready();
});

Meteor.publish('FoodTrucksCollection', function publish() {
  if (this.userId) {
    return FoodTrucksCollection.find();
  }
  return this.ready();
});

Meteor.publish('HoursCollection', function publish() {
  if (this.userId) {
    return HoursCollection.find();
  }
  return this.ready();
});

Meteor.publish('LocationCollection', function publish() {
  if (this.userId) {
    return LocationCollection.find();
  }
  return this.ready();
});

Meteor.publish('MenuItemCollection', function publish() {
  if (this.userId) {
    return MenuItemCollection.find();
  }
  return this.ready();
});

Meteor.publish('RestaurantCollection', function publish() {
  return RestaurantCollection.find();
  // return this.ready();
});

Meteor.publish('ReviewsCollection', function publish() {
  if (this.userId) {
    return ReviewsCollection.find();
  }
  return this.ready();
});
