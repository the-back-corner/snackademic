import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter} from 'react-router-dom';
import { Button, Card, Container, Image, Portal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import PortalButton from '../components/PortalButton';
import StuffItem from './StuffItem';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';


/** Renders a card to use in profile */
class ProfileCard extends React.Component {
  // state = { open: false };
  // state = { firstName: '', lastName: '', email: '', password: '', role: 'buyer', error: '', open: 'false' };
  // handleClose = () => this.setState({ open: false })
  // handleOpen = () => this.setState({ open: true })
  render() {
    // const { open } = this.state;
    const fullName = `${this.props.currentFirstName}   ${this.props.currentLastName}`;
    return (
        <Card centered fluid>
          <Card.Content textAlign="center">
          <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/matthew.png'/>
          </Card.Content>
          <Card.Content>
            <Grid columns={2}>
               <Grid.Column width={12}>
                 <Header>{fullName}</Header>
               </Grid.Column>
              <Grid.Column width={1}>
                <PortalButton type='changeName'/>
              </Grid.Column>
            </Grid>
          </Card.Content>
          <Card.Content>
            <Grid columns={2}>
              <Grid.Column width={12}>
                {this.props.currentUser}
              </Grid.Column>
              <Grid.Column width={1}>
                <PortalButton type='changeEmail'/>
              </Grid.Column>
            </Grid>
          </Card.Content>
          <Card.Content>
            <Grid columns={2}>
              <Grid.Column width={12}>
                Account Type: {this.props.currentRole}
              </Grid.Column>
              <Grid.Column width={1}>
                <PortalButton type='changeRole'/>
              </Grid.Column>
            </Grid>
          </Card.Content>
          <Card.Content extra>
            {/*<Grid columns={2}>*/}
            {/*  <Grid.Column>*/}
            {/*    <Button*/}
            {/*        content='Open Portal'*/}
            {/*        disabled={open}*/}
            {/*        positive*/}
            {/*        onClick={this.handleOpen}*/}
            {/*    />*/}

            {/*    <Portal onClose={this.handleClose} open={open}>*/}
            {/*      <Segment*/}
            {/*          style={{*/}
            {/*            left: '40%',*/}
            {/*            position: 'fixed',*/}
            {/*            top: '50%',*/}
            {/*            zIndex: 1000,*/}
            {/*          }}*/}
            {/*      >*/}
            {/*        <Header>This is a controlled portal</Header>*/}
            {/*        <p>Portals have tons of great callback functions to hook into.</p>*/}
            {/*        <p>To close, simply click the close button or click away</p>*/}

            {/*        <Button*/}
            {/*            content='Close Portal'*/}
            {/*            negative*/}
            {/*            onClick={this.handleClose}*/}
            {/*        />*/}
            {/*      </Segment>*/}
            {/*    </Portal>*/}
            {/*  </Grid.Column>*/}
            {/*</Grid>*/}

            <PortalButton type='changePassword'/>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
ProfileCard.propTypes = {
  currentUser: PropTypes.string,
  currentFirstName: PropTypes.string,
  currentLastName: PropTypes.string,
  currentRole:PropTypes.string,
};

const profileContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username: '',
  currentFirstName: Meteor.user() ? Meteor.user().profile.name.first: '',
  currentLastName: Meteor.user() ? Meteor.user().profile.name.last: '',
  currentRole: Meteor.user() ? Meteor.user().roles: '',
}))(ProfileCard);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(profileContainer);

