import React from 'react';
import PropTypes from 'prop-types';

import './Footer.css';

import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: '#aedd94',
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const Footer = (props) => {
  const { classes } = props;
  return (
    <Grid>

      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>

          <Typography type='h3'>Created By Anthony Dunahee</Typography>

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

        </Toolbar>
      </AppBar>

    </Grid>

  )
};

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
