import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SimpleMenu from './SimpleMenu';
import StylesSimplesMediaCard from './StylesSimplesMediaCard';
import TablaContenidoVideos from './TablaContenidoVideos';
import FolderList from './FolderList';
import { MenuItem } from '@material-ui/core';
import SimpleModalWrapped from './ModalCrearVideo';
import Button from '@material-ui/core/Button';

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
      <Grid className='panel' container spacing={24}>
        <Grid item xs={12} sm={3}>
          <img src='LogoVideoUce.png'/>
          <h1>Mis videos</h1>
          <MenuItem><a>Administrar Videos</a></MenuItem>
          <div></div>
          <h1>Mi Playlist</h1>
          <FolderList className="panel" items={props.playlist} updateState={props.updateState}/>
        </Grid>
        <Grid item xs={12} sm={9}>
        <input type="text" className='customInput' placeholder='Buscar a un artista, tema o amigo'/>
        <SimpleMenu/>
        <TablaContenidoVideos updateState={props.updateState}/>
        </Grid>
      </Grid>
    </div>
  );
}

export class CrearVideosApp extends Component {
  constructor(props){
    super(props);
    this.state={
      openModal:false
    }
  }
  updateOpen=()=>{
    this.setState({openModal:!this.state.openModal});
  }
  render() {
    return (
     <div>
      <CenteredGrid updateOpen={this.updateOpen} playlist={this.props.playlist} updateState={this.props.updateState}/>
     </div> 
    );
  }
}

export default withStyles(styles)(CenteredGrid);
