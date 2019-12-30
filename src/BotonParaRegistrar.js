import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });
  
  function ContainedButtons(props) {
    const { classes } = props;
    return (
      <div>
        <Button variant="contained" color="secondary" className={classes.button} onClick={props.handlePage('registro')}>
        Registrar
        </Button>
        <div>
        <Button variant="contained" color="primary" className={classes.button} onClick={props.handlePage('login')}>
          Login
        </Button>
        </div>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
        />
        <label htmlFor="contained-button-file">
        </label>
      </div>
    );
  }

  export default withStyles(styles)(ContainedButtons);  