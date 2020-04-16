import React from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className="landingPage">
            <Grid verticalAlign='middle' textAlign='center' container>

              <Grid.Column className="leftGrid" textAlign='left' width={8}>
                  <Header className="firstHeader" as='h1'>SNACKADEMIC</Header>
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

export default Landing;
