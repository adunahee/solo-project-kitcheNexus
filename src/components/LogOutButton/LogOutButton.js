import React from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Tooltip from '@material-ui/core/Tooltip';


const LogOutButton = props => (
  <Tooltip title='Log Out'>
    <IconButton
    // This IconButton shows up in multiple locations and is styled differently
    // because it's styled differently depending on where it is used, the className
    // is passed to it from it's parents through React props
    onClick={() => props.dispatch({ type: 'LOGOUT' })}
  >
    <ExitToAppIcon />
  </IconButton>
  </Tooltip>
);

// This component doesn't need 'mapStateToProps'
// because it doesn't care what the current state is.
// No matter what the redux state is, this IconButton will always be a log out IconButton
// this component still needs 'connect' though, because it is going to dispatch a redux action
export default connect()(LogOutButton);
