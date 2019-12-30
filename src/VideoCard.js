import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from './Modal';
import ReactPlayer from 'react-player'

const styles = {
  card: {
    maxWidth: 800,
  },
  media: {
    height: 0,
    paddingTop: '60.25%', // 16:9
  },
};

function SimpleMediaCard(props) {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <ReactPlayer url={localStorage.getItem("urlVideo")} playing/>
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {localStorage.getItem("titulo")}
          </Typography>
          <Typography component="p">
           {localStorage.getItem("views")} views
          </Typography>
        </CardContent>
        <CardActions>
          <Modal/>
        </CardActions>
      </Card>
      <Button onClick={()=>props.updateState('home')}>Atras</Button>
    </div>
  );
}

export default withStyles(styles)(SimpleMediaCard);