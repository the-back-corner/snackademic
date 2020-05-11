import React from 'react';
import { Accordion, Button, Card, Grid, Header, Icon, Image, Loader, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { FoodTrucksCollection } from '../../api/foodTrucks/FoodTrucksCollection';
import { MenuItemCollection } from '../../api/menu/MenuItemCollection';
import { ReviewsCollection } from '../../api/reviews/ReviewsCollection';
import { FavoritesCollection } from '../../api/favorites/favoritesCollection';

/** A simple static component to render some text for the landing page. */
class FoodTruck extends React.Component {
  state = { activeIndex: 0 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  favoritesAdd = () => {
    const currentUser = Meteor.user().username;
    const currentName = (this.props.doc.name);
    const favoritesArray = (this.props.docFavorites);
    console.log("favorite clicked");
    console.log(currentName);
    console.log(currentUser);
    console.log(favoritesArray);
    FavoritesCollection.insert({
      userName: currentUser,
      restaurantName: currentName,
    });
  };

  favoritesDelete = () => {
    const currentName = (this.props.doc.name);
    const favoriteRestaurantID = FavoritesCollection.findOne({restaurantName: currentName});
    FavoritesCollection.remove(favoriteRestaurantID._id);
    console.log(favoriteRestaurantID);
  };

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const { activeIndex } = this.state;
    const currentName = (this.props.doc.name);
    let add = true;
    return (
        <div className="coffeeBackground">
          {/* First grid at top of page, holds food truck name and buttons */}
          <Grid verticalAlign='middle' textAlign='center'>
            <Grid.Column>
              <Header className="cuisine" as='h1'>{this.props.doc.name}</Header>
              <Button.Group>
                <Button inverted>
                  {this.props.docFavorites.map((favorite) => {
                    if (favorite.restaurantName === currentName) {
                      console.log('poop');
                      add = false;
                    }
                  })
                  }
                  { (add) === (false) ? (
                      <Button.Content as='h3' onClick={this.favoritesDelete}>
                        <Icon name='heart' color='blue'/>Remove from Favorites</Button.Content>) :
                      (<Button.Content as='h3' onClick={this.favoritesAdd}>
                        <Icon name='heart' color='blue'/>Add to Favorites</Button.Content>
                  )}

                </Button>
                <Button inverted>
                  <Button.Content as='h3'><Icon name='star' color='blue'/> Write A Review</Button.Content>
                </Button>
                <Button inverted>
                  <Button.Content as='h3'><Icon name='fork' color='blue'/> Share </Button.Content>
                </Button>
              </Button.Group>
            </Grid.Column>
          </Grid>

          {/* Second grid holds food truck icon on the left, and description on the right */}
          <Grid verticalAlign='middle' textAlign='center' container>
            <Grid.Column className="leftGrid" textAlign='left' width={8}>
              <Image src={this.props.doc.vendorIcon} size="medium" verticalAlign='middle'/>
            </Grid.Column>
            <Grid.Column className="rightGrid" width={8}>
              <Header className="cuisine" as='h1'>{this.props.doc.typeOfCuisine}</Header>
              <Header className="secondHeader" as='h2'>{this.props.doc.Description}</Header>
              {this.props.doc.takesMeals ?
                  // (<Header className="secondHeader" as='h3'>Takes Meal Points</Header>)
                  (<Header className="secondHeader" as='h3'>
                    <Icon name='money bill alternate outline'/>Takes Meal Points</Header>) :
                // : (<Header className="secondHeader" as='h3'>Does Not Take Meal Points</Header>)}
                  (<Header className="secondHeader" as='h3'>
                    <Icon name='money bill alternate icon'/> Does Not Take Meal Points</Header>)}

            </Grid.Column>
          </Grid>

          { /* third grid holds Menu items */ }
          <Grid verticalAlign='middle' textAlign='center'>
            <Grid.Column>
              <Accordion fluid styled>
              <Accordion.Title
                  active={activeIndex === 1}
                  index={1}
                  onClick={this.handleClick}
              >
                <Header className="firstHeader"><Icon name='dropdown' />Menu Items</Header>
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 1}>
                <Card.Group centered>
                  {this.props.doc2.map((menuItem) => {
                    if (menuItem.restaurantName === this.props.doc.name) {
                      return (
                          <Card key={menuItem._id} className="secondHeader">
                            <Card.Content>
                              <Card.Header>
                                {menuItem.itemName} -
                                ${menuItem.price}
                              </Card.Header>
                            </Card.Content>
                          </Card>
                      );
                    }
                    return (<Header key={menuItem._id}></Header>);
                  })
                  }
                </Card.Group>
              </Accordion.Content>
            </Accordion>
              <Accordion fluid styled>
                <Accordion.Title
                    active={activeIndex === 2}
                    index={2}
                    onClick={this.handleClick}
                >
                  <Header className="firstHeader"><Icon name='dropdown' />Reviews</Header>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 2}>
                  <Card.Group centered>
                    {this.props.docReviews.map((review) => {
                      if (review.restaurantName === this.props.doc.name) {
                        return (
                            <Card key={review._id} className="secondHeader">
                              <Card.Content>
                                <Card.Header>
                                  <Rating icon='star' defaultRating={review.rating} maxRating={5} />
                                  <br/>
                                  {review.dateOfReview}
                                  <br/>
                                  {review.writeUp}
                                  <br/>
                                  <Image src={review.image}/>
                                </Card.Header>
                              </Card.Content>
                            </Card>
                        );
                      }
                      return (<Header key={review._id}></Header>);
                    })
                    }
                  </Card.Group>
                </Accordion.Content>
              </Accordion>
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
  docReviews: PropTypes.array,
  docFavorites: PropTypes.array,
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
  const subscriptionFavorites = Meteor.subscribe('FavoritesCollection');
  return {
    doc: FoodTrucksCollection.findOne(documentId),
    doc2: MenuItemCollection.find().fetch(),
    docReviews: ReviewsCollection.find().fetch(),
    docFavorites: FavoritesCollection.find().fetch(),
    ready: subscriptionTrucks.ready() && subscriptionMenu.ready() && subscriptionReviews.ready() && subscriptionFavorites.ready(),
  };
})(FoodTruck);
