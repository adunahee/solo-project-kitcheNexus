import React from 'react';
import './Footer.css';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const Footer = () => (
  <Grid container
    alignItems='flex-end'
    direction="row"
    justify="space-between">
    <Grid item>
      <Typography type='h3'>Created By Anthony Dunahee</Typography>
    </Grid>
    <Grid item>
      <Tooltip title='Powered By Edamam'>
        <a href="https://www.edamam.com/"
          target="_blank"
          rel="noopener noreferrer">
          <img src="https://www.edamam.com/assets/img/small-logo.png"
            alt='Edamam Logo' />
        </a>
      </Tooltip>
    </Grid>
  </Grid>
);

export default Footer;
