import React from 'react';
import {Grid, Header, Image, Loader} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { FoodTrucksCollection } from '../../api/foodTrucks/FoodTrucksCollection';
import { MenuItemCollection } from '../../api/menu/MenuItemCollection';


/** A simple static component to render some text for the landing page. */
class FoodTruck extends React.Component {

    /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
      console.log(this.props.doc2);
    return (
        <div className="signupPage">
            <Grid verticalAlign='middle' textAlign='center' container>

              <Grid.Column className="leftGrid" textAlign='left' width={8}>
                  <Image src={this.props.doc.vendorIcon} size = "medium" verticalAlign='middle'/>
                  <Header className="firstHeader" as='h1'>Menu Items</Header>
                  { this.props.doc2.map((menuItem) => {
                      if (menuItem.restaurantName === this.props.doc.name){
                          return (
                              <Header key={menuItem._id} className="secondHeader" as='h3'>{menuItem.itemName} -
                                  ${menuItem.price}</Header>
                           );
                      }
                      return (<Header key={menuItem._id}></Header>);
                    })
                  }
              </Grid.Column>
              <Grid.Column className="rightGrid" width={8}>
                  <Header className="cuisine" as='h1'>{this.props.doc.typeOfCuisine}</Header>
                  <Header className="secondHeader" as='h2'>{this.props.doc.Description}</Header>
                  { this.props.doc.takesMeals === 1 ?
                      (<Header className="secondHeader" as='h3'>Takes Meal Points</Header>)
                      : (<Header className="secondHeader" as='h3'>Does Not Take Meal Points</Header>)}

              </Grid.Column>

              <Grid.Column width={8}>
              </Grid.Column>

            </Grid>
        </div>
    );
  }
}

// export default FoodTruck;

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
FoodTruck.propTypes = {
    doc: PropTypes.object,
    doc2: PropTypes.array,
    ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
    // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
    const documentId = match.params._id;
    // Get access to Stuff documents.
    const subscriptionTrucks = Meteor.subscribe('FoodTrucksCollection');
    const subscriptionMenu = Meteor.subscribe('MenuItemCollection');
    const subscriptionReviews = Meteor.subscribe('ReviewsCollection');
    return {
        doc: FoodTrucksCollection.findOne(documentId),
        doc2: MenuItemCollection.find().fetch(),
        ready: subscriptionTrucks.ready() && subscriptionMenu.ready() && subscriptionReviews.ready(),
    };
})(FoodTruck);
