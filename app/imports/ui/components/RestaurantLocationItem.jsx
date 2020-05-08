import React from 'react';
import { Table, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { moment } from 'meteor/momentjs:moment';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class RestaurantLocationItem extends React.Component {
  render() {
    const dayOfTheWeek = moment().format('dddd').toLowerCase();
    let src = '';
    let src2 = '';
    // just the location
    let locale = {};
    // the location and the rotation (for the pin)
    let localeRotation ={};
    switch (this.props.restaurant.name) {
      case 'Sistahs':
        src = 'images/vendoricons/thesistah-icon.png';
        src2 = 'images/mapCircles/location_pin_icon_pink.png';
        break;
      case 'Hot Tacos':
        src = 'images/vendoricons/hottacos-icon.png';
        src2 = 'images/mapCircles/location_pin_icon_pink.png';
            break;
      case 'Just Ice':
        src = 'images/vendoricons/justicewht-icon.png';
        src2 = 'images/mapCircles/location_pin_icon_pink.png';
        break;
      default:
        src = '';
        break;
    }
    // console.log(src);
    switch (this.props.restaurantLocation[dayOfTheWeek]) {
      case 'Post':
        localeRotation = { transform: ' translateX(200px) translateY(100px) rotate(180deg)' };
        locale = { transform: 'translateX(200px) translateY(100px) scale(.8) ' };
        break;
      case 'Kuykendall':
        localeRotation = { transform: ' translateX(200px) translateY(100px) rotate(180deg)' };
        locale = { transform: 'translateX(200px) translateY(100px) scale(.8) ' };
        break;
      case 'Architecture':
        localeRotation = { transform: ' translateX(200px) translateY(100px) rotate(180deg)' };
        locale = { transform: 'translateX(200px) translateY(100px) scale(.8) ' };
        break;
      case 'Korean Studies':
        localeRotation = { transform: ' translateX(80px) translateY(-20px) rotate(180deg)' };
        locale = { transform: 'translateX(0px) translateY(0px) scale(.8) ' };
        break;
      case 'Kennedy Theatre':
        localeRotation = { transform: ' translateX(180px) translateY(80px) rotate(180deg)' };
        locale = { transform: 'translateX(100px) translateY(100px) scale(.8) ' };
        break;
      default:
        localeRotation = { transform: ' translateX(880px) translateY(-970px) rotate(180deg) scale(1)' };
        locale = { transform: 'translateX(800px) translateY(-950px) scale(.8) ' };
        break;
    }
    // console.log(coords);

    // console.log(this.props.restaurantLocation);
    // console.log(this.props.restaurantLocation[dayOfTheWeek]);
    return (
        <div>
          <Image verticalAlign='top' src={src2} size = 'tiny' style={ localeRotation } />
          <Image verticalAlign='top' src={src} size = 'tiny' style={ locale } />
        </div>
    );
  }
}

/** Require a document to be passed to this component. */
RestaurantLocationItem.propTypes = {
  restaurant: PropTypes.object.isRequired,
  restaurantLocation: PropTypes.object.isRequired,
  restaurantHours: PropTypes.object.isRequired,
};


/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(RestaurantLocationItem);
