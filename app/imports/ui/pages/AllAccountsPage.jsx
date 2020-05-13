import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import StuffItemAdmin from '../components/StuffItemAdmin';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class AllAccountsPage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div className="backgroundPurple">
        <Container>
          <br />
          <Header as="h2" textAlign="center" inverted>All Registered User Data: </Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Role</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>John Foo</Table.Cell>
                <Table.Cell>john@foo.com</Table.Cell>
                <Table.Cell>Buyer</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Vendor Foo</Table.Cell>
                <Table.Cell>Vendor@foo.com</Table.Cell>
                <Table.Cell>Vendor</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Admin Account</Table.Cell>
                <Table.Cell>admin@foo.com</Table.Cell>
                <Table.Cell>Admin</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        <br />
        </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
AllAccountsPage.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('StuffAdmin');
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(AllAccountsPage);
