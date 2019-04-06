import React from 'react';
import { connect } from 'react-redux';

import { IconButton, Tooltip } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';

class LogOutButton extends React.Component {
  componentDidMount() {
    //for grocery view
    this.props.dispatch({ type: 'FETCH_LIST_NAMES' })
    this.props.dispatch({ type: "FETCH_GROCERY" });
    //for pantry view
    this.props.dispatch({ type: "FETCH_PANTRY" });
    this.props.dispatch({ type: 'FETCH_PANTRY_TAGS' })
  }
  
  render() {
    return (
      <Tooltip title='Log Out'>
        <IconButton
          // This IconButton shows up in multiple locations and is styled differently
          // because it's styled differently depending on where it is used, the className
          // is passed to it from it's parents through React props
          onClick={() => this.props.dispatch({ type: 'LOGOUT' })}
        >
          <ExitToApp style={{ color: 'black' }} />
        </IconButton>
      </Tooltip>
    )
  }
}

// This component doesn't need 'mapStateToProps'
// because it doesn't care what the current state is.
// No matter what the redux state is, this IconButton will always be a log out IconButton
// this component still needs 'connect' though, because it is going to dispatch a redux action
export default connect()(LogOutButton);
