import React from 'react';

import './Footer.css';

import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid'


const Footer = () => {
  return (
    <Grid container
      direction="row"
      justify="space-around"
      alignItems="center"
      style={{height: '100%'}}>

      <Grid item>
        <Typography type='h3'>Created By Anthony Dunahee</Typography>
      </Grid>

      <Grid item>
        <Tooltip title='Powered By Edamam'>
          <a href="https://www.edamam.com/"
            target="_blank"
            rel="noopener noreferrer"
            id='edamamm-link'>
            <Typography>Powered by Edamam API</Typography>
            {/* <img src="https://www.edamam.com/assets/img/small-logo.png"
            alt='Edamam Logo'/> */}
          </a>
        </Tooltip>
      </Grid>

    </Grid>

  )
};

export default Footer;
