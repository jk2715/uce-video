import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import BotonParaRegistrar from './BotonParaRegistrar'




const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function CenteredGrid(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={8} sm={3}>
          <img src="LogoVideoUce.png"/>
          <BotonParaRegistrar handlePage={props.handlePage}/>
        </Grid>
        <Grid item xs={12} sm={9}>
        <h1>Consigue los mejores videos para entretenerte o Aprender</h1>
        <h2>Podras encontrar millones de contenido de videos</h2>
        </Grid>
      </Grid>
    </div>
  );
}

class InicioApp extends React.Component {
    
    render() {
        const CenteredGridInicio =withStyles(styles)(CenteredGrid);
        return (
            <CenteredGridInicio handlePage={this.props.handlePage}/>
        );
    }
}

export default InicioApp;