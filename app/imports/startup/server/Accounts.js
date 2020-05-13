import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

function createUser(first, last, email, password, role) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    profile: {
      name: { first: first, last: last },
    },
    username: email,
    email: email,
    role: role,
    password: password,
  });
  if (role === 'admin') {
    Roles.addUsersToRoles(userID, 'admin');
  } else
    if (role === 'buyer') {
      Roles.addUsersToRoles(userID, 'buyer');
    } else
      if (role === 'vendor') {
        Roles.addUsersToRoles(userID, 'vendor');
      }
}

/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    // eslint-disable-next-line max-len
    Meteor.settings.defaultAccounts.map(({ first, last, email, password, role }) => createUser(first, last, email, password, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
