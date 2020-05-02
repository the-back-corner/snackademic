import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
import '/imports/startup/server/Mongo';

Meteor.methods({
  'add.new.account'(data) {
    // Optionally, check email and password are strings
    const userID = Accounts.createUser({
      profile: {
        name: { first: data.firstName, last: data.lastName },
      },
      username: data.email,
      email: data.email,
      password: data.password,
    });
    Roles.addUsersToRoles(userID, data.role);
  }
});
