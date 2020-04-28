import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
import '/imports/startup/server/Mongo';

Meteor.methods({
  'add.new.vendor'(email, password) {
    // Optionally, check email and password are strings
    const userID = Accounts.createUser({
      username: email,
      email: email,
      password: password,
    });
    Roles.addUsersToRoles(userID, 'vendor');
  },
  'add.new.buyer'(email, password) {
    // Optionally, check email and password are strings
    const userID = Accounts.createUser({
      username: email,
      email: email,
      password: password,
    });
    Roles.addUsersToRoles(userID, 'buyer');
  },
});
