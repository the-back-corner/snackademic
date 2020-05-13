import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
// noinspection ES6CheckImport
import { Menu, Dropdown, Header } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
import { RestaurantCollection } from '../../api/restaurant/RestaurantCollection';
import { FoodTrucksCollection } from '../../api/foodTrucks/FoodTrucksCollection';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const restaurantCollection = RestaurantCollection.find().fetch();
    const foodTrucksCollection = FoodTrucksCollection.find().fetch();
    const fullName = `${this.props.currentFirstName}   ${this.props.currentLastName}`;
    return (
        <Menu inverted borderless className="topmenu">
          <Menu.Item as={NavLink} activeClassName="" exact to="/">
            <Header className="headertext" inverted as='h1'>SNACKADEMIC</Header>
          </Menu.Item>

          <Menu.Item position="right" >
            <Dropdown text="FOODTRUCKS" as="h3">
              <Dropdown.Menu>
                {foodTrucksCollection.map((foodTruck) => (
                    <Dropdown.Item key={foodTruck._id} text={foodTruck.name}
                                   as={NavLink} activeClassName="" exact to={`/foodtruck/${foodTruck._id}`}/>))
                }
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>

          <Menu.Item>
            <Dropdown text="RESTAURANTS" as="h3">
              <Dropdown.Menu>
                {restaurantCollection.map((restaurant) => (
                    <Dropdown.Item key={restaurant._id} text={restaurant.name}
                                   as={NavLink} activeClassName="" exact to={`/restaurant/${restaurant._id}`}/>))
                }
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>

            <Menu.Item as={NavLink} activeClassName="active" exact to="/Map" key='map'>
                <Header className="headertext" inverted as='h3'>MAP</Header>
            </Menu.Item>

          <Menu.Item as={NavLink} activeClassName="active" exact to="/Hours" key='hours'>
            <Header className="headertext" inverted as='h3'>HOURS</Header>
          </Menu.Item>
          {/* ADMIN EXCLUSIVE TABS ON NAV BAR */}
          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Menu.Item as={NavLink} activeClassName="active" exact to="/allaccounts" key='allaccounts'>
                <Header className="headertext" inverted as='h3'>ALL ACCOUNTS</Header>
              </Menu.Item>
          ) : ''}


          <Menu.Item>
            {/* If user isnt signed in display "sign in" and "register" in navbar */}
            {this.props.currentUser === '' ? (
                <Dropdown text="SIGN IN" pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item icon="user" text="SIGN IN" as={NavLink} exact to="/signin"/>
                    <Dropdown.Item icon="add user" text="REGISTER" as={NavLink} exact to="/signup"/>
                  </Dropdown.Menu>
                </Dropdown>
            ) : ( // if there is a user signed in, display "ACCOUNT" and "SIGN OUT" in navbar
                <Dropdown text={fullName} as='h3' pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item icon="user" text="ACCOUNT" as={NavLink} exact to="/userprofile"/>
                    {Roles.userIsInRole(Meteor.userId(), 'vendor') ? (
                        <Dropdown.Item icon="coffee" text="MY EATERY" as={NavLink} exact to="/myeatery"/>
                        ) : ''}
                    <Dropdown.Item icon="sign out" text="SIGN OUT" as={NavLink} exact to="/signout"/>
                  </Dropdown.Menu>
                </Dropdown>
            )}
          </Menu.Item>
        </Menu>

    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
  currentFirstName: PropTypes.string,
  currentLastName: PropTypes.string,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const subscription = Meteor.subscribe('RestaurantCollection');
const subscription1 = Meteor.subscribe('FoodTrucksCollection');
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
  currentFirstName: Meteor.user() ? Meteor.user().profile.name.first : '',
  currentLastName: Meteor.user() ? Meteor.user().profile.name.last : '',
  ready: subscription.ready() && subscription1.ready(),
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
