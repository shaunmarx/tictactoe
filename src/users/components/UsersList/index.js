import React from 'react';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import PropTypes from 'prop-types';

const UsersList = ({users, onUserSelect}) => {
    var listItems = users.map(({ username }) => 
        (<ListItem key={username} onClick={onUserSelect} button>
            <ListItemText primary={username} />
        </ListItem>)
    );

    return (<List>
        {listItems}
    </List>
)};


UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  onUserSelect: PropTypes.func
};

export default UsersList;
