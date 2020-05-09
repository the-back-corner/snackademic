import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { FoodTrucksCollection } from '../../api/foodTrucks/FoodTrucksCollection';
import { HoursCollection } from '../../api/hours/HoursCollection';
import { LocationCollection } from '../../api/location/LocationCollection';
import { MenuItemCollection } from '../../api/menu/MenuItemCollection';
import { RestaurantCollection } from '../../api/restaurant/RestaurantCollection';
import { ReviewsCollection } from '../../api/reviews/ReviewsCollection';

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

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Eateries', function publish() {
    if (this.userId) {
        const username = Meteor.users.findOne(this.userId).username;
        return Stuffs.find({ owner: username });
    }
    return this.ready();
});

Meteor.publish('FoodTrucksCollection', function publish() {
    return FoodTrucksCollection.find();
});

Meteor.publish('HoursCollection', function publish() {
    return HoursCollection.find();
});

Meteor.publish('LocationCollection', function publish() {
    return LocationCollection.find();
});

Meteor.publish('MenuItemCollection', function publish() {
    return MenuItemCollection.find();
});

Meteor.publish('RestaurantCollection', function publish() {
  return RestaurantCollection.find();
});

Meteor.publish('ReviewsCollection', function publish() {
    return ReviewsCollection.find();
});
