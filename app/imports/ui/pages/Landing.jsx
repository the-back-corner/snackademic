import React from 'react';
import { Grid, Header, Image, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className="landingPage">
            <Grid verticalAlign='middle' textAlign='center' container>
              <Image src="/images/Snackademic_Landing_Logo_V2.png" size = "large" verticalAlign='middle'/>
              <Grid.Column className="leftGrid" textAlign='center' width={8}>
                   <Header className="thirdHeader" as='h1'>To get started, please register <br />
                     or sign in here:</Header>
                  {/* <Header className="secondHeader" as='h2'>A SITE TO SATIATE</Header> */}
                  {/* <Header className="secondHeader" as='h2'>YOUR MANOA MUNCHIES</Header> */}
                <Button.Group size='huge' font-family='Comfortaa'>
                  <Button color='yellow' as={NavLink} exact to="/signup">Register</Button>
                  <Button.Or />
                  <Button color='teal' as={NavLink} exact to="/signin">Sign In</Button>
                </Button.Group>
              </Grid.Column>

              <Grid.Column width={8}>
              </Grid.Column>

            </Grid>
        </div>
    );
  }
}

export default Landing;
