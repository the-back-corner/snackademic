import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { FoodTrucksCollection } from '../../api/foodTrucks/FoodTruckCollection';
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
    const username = Meteor.users.findOne(this.userId).username;
    return FoodTrucksCollection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish('HoursCollection', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return HoursCollection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish('LocationCollection', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return LocationCollection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish('MenuItemCollection', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return MenuItemCollection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish('RestaurantCollection', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return RestaurantCollection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish('ReviewsCollection', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return ReviewsCollection.find({ owner: username });
  }
  return this.ready();
});
