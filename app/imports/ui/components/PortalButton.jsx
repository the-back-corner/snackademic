import React, { Component } from 'react'
import { Button, Grid, Header, Segment, Portal, Form, Message, Container } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
// import { AutoForm } from 'uniforms-semantic';

class PortalButton extends Component {
  state = { firstName: '', lastName: '', email: '', password: '', role: 'buyer', error: '', open: false };
  handleClose = () => this.setState({ open: false });
  handleOpen = () => this.setState({ open: true });

  handleChange = (e, { name, value }) => { this.setState({ [name]: value });};
  //submit = () => { };

  render() {
    const { open } = this.state;
    return (
        // <Grid columns={2}>
        //   <Grid.Column>
        //     <Button
        //         content='Open Portal'
        //         disabled={open}
        //         positive
        //         onClick={this.handleOpen}
        //     />
        //
        //     <Portal onClose={this.handleClose} open={open}>
        //       <Segment
        //           style={{
        //             left: '40%',
        //             position: 'fixed',
        //             top: '50%',
        //             zIndex: 1000,
        //           }}
        //       >
        //         <Header>This is a controlled portal</Header>
        //         <p>Portals have tons of great callback functions to hook into.</p>
        //         <p>To close, simply click the close button or click away</p>
        //
        //         <Button
        //             content='Close Portal'
        //             negative
        //             onClick={this.handleClose}
        //         />
        //       </Segment>
        //     </Portal>
        //   </Grid.Column>
        // </Grid>
        <Grid columns={2}>
        <Grid.Column>
          {this.props.type === 'changePassword' ? (
              <Button basic color='blue' content='Change Password' disabled={open} onClick={this.handleOpen}
              />
          ) : ( <Button basic color='blue' size='mini' content='Change' disabled={open} onClick={this.handleOpen}
          />)}

          <Portal onClose={this.handleClose} open={open}>
              <Segment
                  style={{
                    left: '40%',
                    position: 'fixed',
                    top: '50%',
                    zIndex: 1000,
                  }}
              >
                  {this.props.type === 'changeName' ? (
                      <Form onSubmit={this.submit}>
                        <Form.Input
                            icon="lock"
                            iconPosition="left"
                            name="password"
                            focus placeholder="Current Password"
                            type="password"
                            onChange={this.handleChange}
                        />
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
                      </Form>
                  ) : ( '' )}
                  {this.props.type === 'changePassword' ? (
                      <Form onSubmit={this.submit}>
                        <Form.Input
                            icon="lock"
                            iconPosition="left"
                            name="password"
                            focus placeholder="Current Password"
                            type="password"
                            onChange={this.handleChange}
                        />
                      <Form.Input
                          icon="lock"
                          iconPosition="left"
                          name="password"
                          focus placeholder="New Password"
                          type="password"
                          onChange={this.handleChange}
                      />
                      </Form>
                  ) : ( '' )}

                  {this.props.type === 'changeEmail' ? (
                      <Form onSubmit={this.submit}>
                        <Form.Input
                            icon="lock"
                            iconPosition="left"
                            name="password"
                            focus placeholder="Current Password"
                            type="password"
                            onChange={this.handleChange}
                        />
                      <Form.Input
                          icon="user"
                          iconPosition="left"
                          name="email"
                          type="email"
                          focus placeholder="New Email Address"
                          onChange={this.handleChange}
                      />
                      </Form>
                  ) : ( '' )}

                <p>Portals have tons of great callback functions to hook into.</p>
                <p>To close, simply click the close button or click away</p>

                <Button
                    content='Cancel'
                    negative
                    onClick={this.handleClose}
                />
              </Segment>
            </Portal>

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
export default withRouter(PortalButton);
