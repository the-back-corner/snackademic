import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password } = this.state;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { value } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/add' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <Container>
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Sign Up For Your Account Here!
            </Header>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Form.Input
                    label="First Name"
                    icon="user circle"
                    iconPosition="left"
                    name="firstName"
                    type="name"
                    placeholder="First Name"
                    onChange={this.handleChange}
                />
                <Form.Input
                    label="Last Name"
                    icon="user circle outline"
                    iconPosition="left"
                    name="lastName"
                    type="name"
                    placeholder="Last Name"
                    onChange={this.handleChange}
                />
                <Form.Input
                    label="Business Name"
                    icon="truck"
                    iconPosition="left"
                    name="vendor"
                    type="vendor"
                    placeholder="Please enter your restaurant or food truck name"
                    onChange={this.handleChange}
                />
                <Form.Input
                  label="Email"
                  icon="envelope"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
                <Form.Group inline>
                  <label>Are you a Student or Vendor?</label>
                  <Form.Radio
                      label='Student'
                      value='stuVal'
                      checked={value === 'stuVal'}
                      onChange={this.handleChange}
                  />
                  <Form.Radio
                      label='Vendor'
                      value='venVal'
                      checked={value === 'venVal'}
                      onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Button color="teal" content="Submit"/>
              </Segment>
            </Form>
            <Message>
              Already have an account? Login <Link to="/signin">here</Link>
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
          </Grid.Column>
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
