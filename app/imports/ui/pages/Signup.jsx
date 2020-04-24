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
    this.state = { email: '', password: '', role: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }


  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password, role } = this.state;
    const userID = Accounts.createUser({ email, username: email, password, role }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
    Roles.addUsersToRoles(userID, this.state.role);
  };

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <Container>
        <Header as="h2" textAlign="center"> Register your account </Header>
        <Header as="h4" textAlign="center">
          If you are a student, sign up for an account.
        </Header>
        <Header as="h4" textAlign="center">
          If you are a vendor, you may sign up for an account and
          send a request to snackademicandco@gmail.com to have your account upgraded.
        </Header>
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Form.Field>
                  <Radio
                      label='Select this if you are a user'
                      name='role'
                      value='eater'
                      checked={this.state.role === 'eater'}
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
                <Form.Input
                  label="Email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Enter your password"
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
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
