import React from 'react';
import Cell from './Cell';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';

var styleSheet = createStyleSheet('BoardRow', theme => ({
    root: {
    }
}));

const Row = ({cells, classes, onHandleMove, winners }) => {
    return (<Grid item xs={12}>
        <Grid container gutter={0}>
            { cells.map((cell) => (
                <Grid item xs={4} key={cell.id}>
                    <Cell key={cell.id} cell={cell} onHandleMove={onHandleMove} isWinner={ winners ? (cell.index in winners) : false }></Cell>
                </Grid>
            ))}
        </Grid>
     </Grid>)
}

Row.propTypes = {
  classes: PropTypes.object.isRequired,
  onHandleMove: PropTypes.func.isRequired,
  cells: PropTypes.arrayOf(PropTypes.object).isRequired,
  winners: PropTypes.object
};



export default withStyles(styleSheet)(Row);


