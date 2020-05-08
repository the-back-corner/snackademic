import React, { Component } from 'react'
import {
  Button,
  Grid,
  Header,
  Segment,
  Portal,
  Form,
  Message,
  Container,
  TransitionablePortal, Confirm
} from 'semantic-ui-react'
import PropTypes from 'prop-types';
import { withRouter, Link, Redirect } from 'react-router-dom';

// import { AutoForm } from 'uniforms-semantic';

class PortalButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      newPassword: '',
      confirmPassword:'',
      error: '',
      setIcon: '',
      open: false,
      animation: 'fade',
      duration: 500,
      passwordError: false,
      passwordMatchError: false,
      confirmPasswordError: false
    };
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };


  setValues = () => {

            this.setState({ open: !this.state.open });

  };
  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = (e) => {
    e.preventDefault();
    let error = false;
    const { password, newPassword, passwordError } = this.state;
    if (password.length < 8) {
      this.setState({ passwordError: true });
      error = true;
    } else {
      this.setState({ passwordError: false });
    }
    if (!passwordError) {
      Accounts.changePassword(password, newPassword, (err) => {
        if (err) {
          this.setState({ error: err.reason });
          console.log(error);
        } else {
          this.setState({ error: '', password: '', newPassword: '', open: false });
          console.log("password change successful");
        }
      });
    }
  };

  render() {
    const { open, animation, duration, setIcon } = this.state;
    return (
        <Grid columns={2}>
          <Grid.Column>

                <Button basic color='blue'
                        content={open ? 'Cancel' : 'Change Password'}
                        negative={open}
                        onClick={this.setValues}
                />
            <TransitionablePortal open={open} transition={{ animation, duration }}>
              <Segment
                  style={{
                    left: '40%',
                    position: 'fixed',
                    top: '50%',
                    zIndex: 1000,
                    filter: 'none',
                  }}
              >
                <Header>Edit your account information.</Header>
                <Form onSubmit={this.submit}>

                    <Form.Input
                        name="password"
                        focus placeholder="verify your current password"
                        icon="lock"
                        iconPosition="left"
                        type="password"
                        onChange={this.handleChange}
                        error={this.state.passwordError}
                    /><Form.Input

                      name="newPassword"
                      focus placeholder="create your new password"
                      icon="lock"
                      iconPosition="left"
                      type="password"
                      onChange={this.handleChange}
                      error={this.state.passwordError || this.state.passwordMatchError}
                  /><Form.Input

                    name="confirmPassword"
                    focus placeholder="confirm your new password"
                    icon="lock"
                    iconPosition="left"
                    type="password"
                    onChange={this.handleChange}
                    error={this.state.confirmPasswordError || this.state.passwordMatchError}
                />
                  <Form.Button
                      content='Submit'
                      positive
                      type='submit'
                      disabled={!this.state.password
                       || !this.state.newPassword}
                  />
                </Form>
              </Segment>
            </TransitionablePortal>
          </Grid.Column>
        </Grid>
    )
  }
}

/** Require a document to be passed to this component. */
PortalButton.propTypes = {
  type: PropTypes.string,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default (PortalButton);
