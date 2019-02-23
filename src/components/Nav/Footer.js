import React from 'react';

import './Nav.css';

import {Typography, List, ListItem, Paper} from '@material-ui/core'



const Footer = () => {
  const externalLink = {
    padding: '14px',
    fontSize: '1rem'}

  return (
    <List>

      <ListItem >
        <Paper style={{backgroundColor: 'rgb(174, 221, 148)'}} >
          <a href="https://github.com/adunahee"
            target="_blank"
            rel="noopener noreferrer"
            className='nav-link'>
          <Typography style={externalLink}>Created By Anthony Dunahee</Typography>
          </a>
        </Paper>
      </ListItem>

      <ListItem >
          <Paper>
            <a href="https://www.edamam.com/"
              target="_blank"
              rel="noopener noreferrer"
              className='nav-link'>
            <Typography style={externalLink}>Powered by Edamam API</Typography>
              {/* <img src="https://www.edamam.com/assets/img/small-logo.png"
            alt='Edamam Logo'/> */}
            </a>
          </Paper>
      </ListItem>
    </List>
  )
};

export default Footer;
