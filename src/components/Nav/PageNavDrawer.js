import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import './Nav.css';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

class PageNavDrawer extends React.Component {
    render() {
        return (
            <div style={{ width: '100px' }}>
                <List>

                    <ListItem button>
                        <Link className="nav-link"
                            to="/pantry">
                            <Typography align='center' style={{ padding: '14px' }}>
                                Pantry</Typography>
                        </Link>
                    </ListItem>

                    <ListItem button>
                        <Link className="nav-link"
                            to="/recipes/browse">
                            <Typography align='center' type='h4' style={{ padding: '14px' }}>
                                Recipes</Typography>
                        </Link>
                    </ListItem>

                    <ListItem button>
                        <Link className="nav-link"
                            to="/grocery">
                            <Typography align='center' type='h4' style={{ padding: '14px' }}>
                                Grocery</Typography>
                        </Link>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))} */}
                    <ListItem button>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText/>
                    </ListItem>
                </List>
            </div>
        )
    }
}

const PageNavDrawerWithRouter = withRouter(PageNavDrawer);

export default PageNavDrawerWithRouter;