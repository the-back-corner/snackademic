import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px' };
    return (
      <Menu color="blue" style={menuStyle} attached="top" borderless inverted>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header inverted as='h1'>SNACKADEMIC</Header>
        </Menu.Item>
        <Menu.Item position="right" as={NavLink} activeClassName="" exact to="/map">
          <Header inverted as='h3'>LOCATIONS</Header>
        </Menu.Item>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header inverted as='h3'>FOOD TRUCKS</Header>
        </Menu.Item>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header inverted as='h3'>RESTAURANTS</Header>
        </Menu.Item>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header inverted as='h3'>MENUS</Header>
        </Menu.Item>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header inverted as='h3'>HOURS</Header>
        </Menu.Item>
      { /*  {this.props.currentUser ? (
          [<Menu.Item as={NavLink} activeClassName="active" exact to="/add" key='add'>Add Stuff</Menu.Item>,
           <Menu.Item as={NavLink} activeClassName="active" exact to="/list" key='list'>List Stuff</Menu.Item>]
      ) : ''} */}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
        ) : ''}
        <Menu.Item>
          {this.props.currentUser === '' ? (
            <Dropdown text="LOGIN" pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item icon="user" text="LOGIN" as={NavLink} exact to="/signin"/>
                <Dropdown.Item icon="add user" text="SIGNUP" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
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
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
