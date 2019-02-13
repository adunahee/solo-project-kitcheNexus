import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';


class RecipesNav extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    render() {
        console.log(this.props);

        return (
            <nav className='nav'>
                <Link to={`${this.props.match.url}/browse`}
                    className='nav-link'>Browse</Link>
                <Link to={`${this.props.match.url}/favorites`}
                    className='nav-link'>Favorites</Link>
                <Link to={`${this.props.match.url}/recent`}
                    className='nav-link'>Recent</Link>
            </nav>
        )
    }
}

const RecipesNavWithRouter = withRouter(RecipesNav);

export default RecipesNavWithRouter;
