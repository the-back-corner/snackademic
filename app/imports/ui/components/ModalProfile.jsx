import React, { Component } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import ProfileComponent from './ProfileCard';

class ModalProfile extends Component {
  state = { open: false };

  show = (dimmer) => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open, dimmer } = this.state;

    return (
        <div>
          <text onClick={this.show('blurring')}>ACCOUNT</text>

          <Modal dimmer={dimmer} open={open} onClose={this.close}>
            <Modal.Header>Account Information</Modal.Header>
            <Modal.Content>
              <ProfileComponent/>
            </Modal.Content>
            <Modal.Actions>
              <Button color='black' onClick={this.close}>
                Exit
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
    )
  }
}

export default ModalProfile
