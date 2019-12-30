import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Detalle from './DetalleApp';
import App from './App'

const stylesSimpleMediaCard = {
    card: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
  };

  
  function SimpleMediaCard(props) {
    const { classes } = props;
    return (
      <div>
        <Card className={classes.card}>
          <CardMedia
              onClick={() => props.handlePage('detalle')}
            className={classes.media}
            image={props.urlImagen}
            title={props.titulo}
          />
  
        </Card>
      </div>
    );
  }

  export default withStyles(stylesSimpleMediaCard)(SimpleMediaCard);