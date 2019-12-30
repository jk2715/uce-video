import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CenteredGrid from './CenteredGrid'
import ImageAvatars from './ImageAvatars';
import FolderList from './FolderList';
import SimpleMenu from './SimpleMenu';
import VideoCard from './VideoCard';
import SimpleMenuComentarios from './SimpleMenuComentarios'
import StylesSimplesMediaCard from './StylesSimplesMediaCard';
import MenuItem from '@material-ui/core/MenuItem';

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
  
  function FullWidthGrid(props) {
    const { classes } = props;
  
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid className='panel' item xs={12} sm={3}>
          <img src="LogoVideoUce.png" height="146.5px"/>
          <h1>Mis videos</h1>
          <MenuItem><a>Administrar Videos</a></MenuItem>
          <div></div>
          <h1>Mi Playlist</h1>
          </Grid>
          <Grid item xs={12} sm={9}>
          <SimpleMenu handlePage={props.handlePage}/>
          <input type="text" className='customInput' placeholder='Buscar a un artista, tema o amigo'/>
          <VideoCard updateState={props.updateState}/>
          <h2>Comentarios</h2>
          <SimpleMenuComentarios/>
          </Grid>
        </Grid>
      </div>
    );
  }

class DetalleApp extends React.Component {

    render() {
        const layoutGrid =withStyles(styles)(FullWidthGrid);
        return (
            <layoutGrid/>
        );
    }
}

export default withStyles(styles)(FullWidthGrid);