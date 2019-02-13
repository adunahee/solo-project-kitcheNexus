//taken from https://reacttraining.com/react-router/web/api/withRouter
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

// A simple component that shows the pathname of the current location
class ShowTheLocation extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    render() {
        const { match, location, history } = this.props

        return (
            <div>You are now at {location.pathname}</div>
        )
    }
}

const ShowTheLocationWithRouter = withRouter(ShowTheLocation)

export default ShowTheLocationWithRouter;