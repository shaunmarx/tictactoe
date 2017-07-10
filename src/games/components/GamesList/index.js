import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import AddIcon from 'material-ui-icons/AddCircleOutline';

import Button from 'material-ui/Button';


const styleSheet = createStyleSheet('SimpleList', theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
    display: "flex",
    flexFlow: "column",
  },
  headline: {
      marginLeft : "0.5em",
      marginTop: "0.5em"
  },
  button: {
    margin: theme.spacing.unit,

  }
}));

const GamesListItem = ({ id, player1, player2 }) => {
    return (
    <ListItem button>
        <ListItemText primary={ player1 } />
        <ListItemText secondary="vs" />
        <ListItemText primary={ player2 } />
    </ListItem>
)};

const GamesList = ({ classes, games, onNewGame }) => {
  var items = games.map((game) => { return (<GamesListItem key={game.id} {...game}/>); });

  return (
    <div className={classes.root}>
      <Typography type="headline" component="h2" className={classes.headline}>Active Games</Typography>
      <List>{items}</List>
      <Button color="primary" onClick={ onNewGame } className={ classes.button }><AddIcon/> New Game</Button>
    </div>
  );
}

GamesList.propTypes = {
  classes: PropTypes.object.isRequired,
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
  onNewGame: PropTypes.func
};

export default withStyles(styleSheet)(GamesList);
