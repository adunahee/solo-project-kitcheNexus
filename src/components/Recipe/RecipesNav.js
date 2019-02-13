import React, { Component } from 'react';
import {Link } from 'react-router-dom';
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
        <nav>
            <ul>
                <li>
                    <Link to={`${this.props.match.url}/rendering`}>Browse</Link>
                </li>
                <li>
                    <Link to={`${this.props.match.url}/components`}>Favorites</Link>
                </li>
                <li>
                    <Link to={`${this.props.match.url}/props-v-state`}>Recent</Link>
                </li>
            </ul>
        </nav>   
    )
  }
}

const RecipesNavWithRouter = withRouter(RecipesNav);

export default RecipesNavWithRouter;
