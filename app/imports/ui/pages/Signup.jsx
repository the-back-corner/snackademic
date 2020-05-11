import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Image, Message, Segment, Radio } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { firstName: '', lastName: '', email: '', password: '', role: 'buyer', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };


  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { firstName, lastName, email, password, role } = this.state;
    let data = {
      firstName,
      lastName,
      email,
      password,
      role,
    };
      try {
        Meteor.call('add.new.account', data);
        console.log("account created successfully");
      } catch(err) {
        console.log("there was a create account error");
        this.setState({ error: err.reason });
      }

    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
        console.log("there was a log in error");
      } else {
        this.setState({ error: '', redirectToReferer: true });
        console.log("log in successful");
      }
    });
  };

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    // create a variable to hold homepage path
    const { vendorLandingPage } = this.props.location.state || { vendorLandingPage: { pathname: '/myeatery' } };
    // create a variable to hold the user landing page path
    const { buyerLandingPage } = this.props.location.state || { buyerLandingPage: { pathname: '/userprofile' } };

    // variables to determine what role signed in
    const isLogged = Meteor.userId() !== null;
    const isBuyer = Roles.userIsInRole(Meteor.userId(), 'buyer'); // use this later
    const isVendor = Roles.userIsInRole(Meteor.userId(), 'vendor'); // use this later

    // if there are no errors
    if (this.state.redirectToReferer) {
      if (isLogged && isVendor){
        console.log("rerouting to vendors page");
        return <Redirect to={vendorLandingPage}/>;
      } else if (isLogged && isBuyer) {
        console.log("rerouting to buyers page");
        return <Redirect to={buyerLandingPage}/>;
      }
      console.log('did not work')
    }
    return (
        <div className="signupPage">
        <Container>
          <br />
        <Header as="h2" textAlign="center" inverted> Register your account </Header>
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Form.Field>
                  <Radio
                      label='Select this if you are a buyer'
                      name='role'
                      value='buyer'
                      checked={this.state.role === 'buyer'}
                      onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                      label='Select this if you are a vendor'
                      name='role'
                      value='vendor'
                      checked={this.state.role === 'vendor'}
                      onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Group>
                  <Form.Input
                      name="firstName"
                      focus placeholder="First Name"
                      onChange={this.handleChange}
                  /><Form.Input
                    name="lastName"
                    focus placeholder="Last Name"
                    onChange={this.handleChange}
                />
                </Form.Group>
                <Form.Input
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  focus placeholder="Email Address"
                  onChange={this.handleChange}
                />
                <Form.Input
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  focus placeholder="Create a Password"
                  type="password"
                  onChange={this.handleChange}
                />
                <Form.Button content="Sign Up"/>
              </Segment>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Image src='/images/Snackademic_Logo.png' size= 'large' centered/>
          </Grid.Column>
        </Grid>
        <Grid textAlign="center" verticalAlign="top" centered columns={2}>
          <Message>
            Already have an account? Sign in <Link to="/signin">here</Link>
          </Message>
          {this.state.error === '' ? (
              ''
          ) : (
              <Message
                  error
                  header="Registration was not successful"
                  content={this.state.error}
              />
          )}
        </Grid>
       </Container>
       </div>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
