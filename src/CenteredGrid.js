import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StylesSimplesMediaCard from './StylesSimplesMediaCard';

const stylesCenteredGrid = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function saveURL(url, props, title, views, idVid){
  localStorage.setItem("urlVideo", url);
  localStorage.setItem("titulo", title);
  localStorage.setItem("views", views);
  localStorage.setItem("idVideo", idVid);
  props.updateState('video');
}

function CenteredGrid(props) {
    const { classes } = props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          {props.items.map(item => (
              <Grid onClick={()=>saveURL(item.urlVideo, props, item.titulo, item.views, item.idVideo)} item xs={12} sm={4}>
                  <StylesSimplesMediaCard urlImagen={item.urlImagen} titulo={item.titulo} handlePage={props.handlePage}/>
                  <h2>{item.titulo}</h2>
              </Grid>
          ))}
        </Grid>
      </div>    
    );
  }

 
  export default  withStyles(stylesCenteredGrid)(CenteredGrid);