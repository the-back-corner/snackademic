import React from 'react';
import { Image, Card, Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import Note from './Note';
import AddNote from '../components/AddNote';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ReviewsCard extends React.Component {
    render() {
        return (


            <Card centered>
                <Card.Content>
                    <Image
                        floated = 'right'
                        size = 'mini'
                        src={this.props.contact.image} />
                    <Card.Header>{this.props.contact.firstName} {this.props.contact.lastName}</Card.Header>
                    <Card.Meta>
                        {this.props.contact.address}
                    </Card.Meta>
                    <Card.Description>
                        {this.props.contact.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Link to={`/edit/${this.props.contact._id}`}>Edit</Link>
                </Card.Content>
                <Card.Content extra>
                    <Feed>
                        {this.props.notes.map((note, index) => <Note key={index} note={note}/>)}
                    </Feed>
                </Card.Content>
                <Card.Content extra>
                    <AddNote owner={this.props.contact.owner} contactId={this.props.contact._id}/>
                </Card.Content>
            </Card>

        );
    }
}

/** Require a document to be passed to this component. */
ReviewsCard.propTypes = {
    contact: PropTypes.object.isRequired,
    notes: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ReviewsCard);
