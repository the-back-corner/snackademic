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
  TransitionablePortal, Confirm, Icon
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

  isValid() {
    const { newPassword, confirmPassword, password } = this.state;
    let valid = false;

    if (newPassword.length > 7 && confirmPassword.length > 7) {
      if (newPassword.localeCompare(password) !== 0) {
        if (newPassword.localeCompare(confirmPassword) === 0) {
          valid = true;
        } else {
          this.setState({ error: 'Your passwords do not match' });
        }
      } else {
        this.setState({ error: 'Your new password must not be the same as your current password' });
      }
    } else {
      this.setState({ error: 'Your password must be at least 8 characters long' });
    }
    return valid;
  }

  openPortal = () => { this.setState({ open: true }); };
  closePortal = () => { this.setState({ open: false }); };
  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {

    const { password, newPassword, passwordError } = this.state;

    if (this.isValid()) {
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
    const { open, animation, duration } = this.state;
    return (
        <Grid columns={2}>
          <Grid.Column>
            <Button basic color='blue'
                                 content={'Change Password'}
                                 onClick={this.openPortal}

            />

            <TransitionablePortal open={open} onClose={this.closePortal} transition={{ animation, duration }}>
              <Segment
                  style={{
                    left: '40%',
                    position: 'fixed',
                    top: '50%',
                    zIndex: 1000,
                    filter: 'none',
                  }}
              >
                <Segment clearing vertical>
                <Header floated='left'>Edit your account information. </Header>
                    <Button basic icon floated='right' onClick={this.closePortal}
                            style={{
                              padding: 0,
                            }}>
                      <Icon fluid color='red' name={'window close'}/>
                    </Button>
                </Segment>
                {this.state.error === '' ? (
                   ''
                ) : (
                    <Message
                        error
                        header="Password Change Unsuccessful"
                        content={this.state.error}
                    />
                )}
                <Form onSubmit={this.submit}>

                    <Form.Input
                        name="password"
                        focus placeholder="verify your current password"
                        icon="lock"
                        iconPosition="left"
                        type="password"
                        onChange={this.handleChange}
                    /><Form.Input

                      name="newPassword"
                      focus placeholder="create your new password"
                      icon="lock"
                      iconPosition="left"
                      type="password"
                      onChange={this.handleChange}
                  /><Form.Input

                    name="confirmPassword"
                    focus placeholder="confirm your new password"
                    icon="lock"
                    iconPosition="left"
                    type="password"
                    onChange={this.handleChange}
                />
                    <Form.Button
                        content='Submit'
                        positive
                        type='submit'
                        disabled={!this.state.password
                        || !this.state.newPassword || !this.state.confirmPassword}
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
  closeOnTriggerClick: PropTypes.bool,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default (PortalButton);
