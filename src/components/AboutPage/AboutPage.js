import React from 'react';

import { Typography, Grid } from '@material-ui/core';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <Grid container
    direction='row'
    justify='center'
    spacing={8}
    style={{ minHeight: '300px' }}>

    <Grid item xs={12}>
      <Typography variant='h4' align='center'>
        About the App
    </Typography>
    </Grid>

    <Grid item xs={10}>
      <Typography align='center'>
        KitcheNexus is a passion project of mine to remove the minor hassles that crop up when managing a home kitchen.  Use KitcheNexus
        and you will never forget a grocery list at home again.  It also does some smart comparison between your pantry and grocery lists to,
        so you will not accidentally buy another jar of peanut butter or jug of milk.  Lastly, it has access to a huge number of recipes provided by Edamam API
        for your browsing and favoriting.  Finding and recalling new recipes for later is now quick and easy, so more time can be spent cooking.
      </Typography>
    </Grid>

    <Grid item xs={10}>
      <Typography align='center'>
        I know you'll enjoy using KitcheNexus so start right away!
        I want to continue to make this app better to serve you, 
        so please reach out to me with feedback about the website at dunahee@gmail.com
      </Typography>
    </Grid>
  </Grid>
);

export default AboutPage;
