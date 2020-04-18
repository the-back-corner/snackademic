import React from 'react';
import { Grid, Header, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { FoodTrucksCollection } from '../../api/foodTrucks/FoodTrucksCollection';


/** A simple static component to render some text for the landing page. */
class FoodTruck extends React.Component {

    /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
        <div className="landingPage">
            <Grid verticalAlign='middle' textAlign='center' container>

              <Grid.Column className="leftGrid" textAlign='left' width={8}>
                  <Header className="firstHeader" as='h1'>{this.props.doc.name}</Header>
                  <Header className="secondHeader" as='h2'>A SITE TO SATIATE</Header>
                  <Header className="secondHeader" as='h2'>YOUR MANOA MUNCHIES</Header>
              </Grid.Column>

              <Grid.Column width={8}>
              </Grid.Column>

            </Grid>
        </div>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
FoodTruck.propTypes = {
    doc: PropTypes.object,
    model: PropTypes.object,
    ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
    // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
    const documentId = match.params._id;
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe('FoodTrucksCollection');
    return {
        doc: FoodTrucksCollection.findOne(documentId),
        ready: subscription.ready(),
    };
})(FoodTruck);
