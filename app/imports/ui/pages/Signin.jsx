import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Container, Form, Grid, Header, Message, Segment, Image } from 'semantic-ui-react';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
export default class Signin extends React.Component {

  /** Initialize component state with properties for login and redirection. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signin submission using Meteor's account mechanism. */
  submit = () => {
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Render the signin form. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    // Otherwise return the Login form.
    return (
      <Container>
        <Header as="h2" textAlign="center">
          Log In to Snackademic
        </Header>
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Form.Input
                  label="Username"
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
                <Form.Button content="Log In"/>
              </Segment>
            </Form>

          </Grid.Column>
          <Grid.Column>
            <Image src='/images/Snackademic_Logo.png' size= 'large' verticalAlign="middle"/>
          </Grid.Column>
        </Grid>
        <Grid textAlign="center" verticalAlign="top" centered columns={2}>
          <Message>
            New to Snackademic?
            <Link to="/signup"> Click here to register a new account</Link>
          </Message>
          {this.state.error === '' ? (
              ''
          ) : (
              <Message
                  error
                  header="Login was not successful"
                  content={this.state.error}
              />
          )}
        </Grid>
      </Container>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signin.propTypes = {
  location: PropTypes.object,
};
