import React from 'react';

import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


const Footer = () => {
  return (
    <List style={{ backgroundColor: 'rgb(174, 221, 148)'}}>
      <ListItem button>
        <Typography type='h3'>Created By Anthony Dunahee</Typography>
      </ListItem>
      <ListItem button>
        <Tooltip title='Powered By Edamam'>
          <a href="https://www.edamam.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}>
            <Typography>Powered by Edamam API</Typography>
            {/* <img src="https://www.edamam.com/assets/img/small-logo.png"
            alt='Edamam Logo'/> */}
          </a>
        </Tooltip>
      </ListItem>
    </List>
  )
};

export default Footer;
