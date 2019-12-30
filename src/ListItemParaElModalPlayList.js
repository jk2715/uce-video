import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  });
  
  class CheckboxList extends React.Component {
    state = {
      vidId:localStorage.getItem("idVideo"),
      playlists:[],
      check: [],
      eval:false
    };

    arrId=[];
  
    handleToggle = value => () => {
      const { check } = this.state;
      const currentIndex = check.indexOf(value);
      const newCheck = [...check];
      this.arrId.push(value);
      if (currentIndex === -1) {
        newCheck.push(value);
      } else {
        newCheck.splice(currentIndex, 1);
      }
      
      this.setState({
        check: newCheck,
      });

    };

    addToPlaylist=()=>{
      var obj = {
        arr:this.arrId.toString(),
        vidId:this.state.vidId
      }
      fetch("http://localhost:56388/Video/AddToPlaylist", {
        method: 'POST',
        body: JSON.stringify(obj),
        headers:{
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      }).then(function(){
        window.location.reload();
      });
    }

    updatePlaylists=(data)=>{
      this.setState({playlists:this.state.playlists.concat(data), eval:true});
    }
  
    render() {
      fetch("http://localhost:56388/Video/GetPlaylists?Id=" + localStorage.getItem("idUsuario"), {
              method: 'GET',
              headers:{
              'Content-Type': 'application/json'
              },
              mode:"cors"
            }).then(response => response.json())
              .then(data=>{
                if(this.state.eval === false){
                  data.map((x)=>{
                    this.updatePlaylists(x);     
                  })
                }
      })
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          <List>
            {this.state.playlists.map(e =>(
              <ListItem
              key={e.IdPlaylist}
              role={undefined}
              dense
              button
              onClick={this.handleToggle(e.IdPlaylist)}
              className={classes.listItem}
            >
              <Checkbox
                checked={this.state.check.indexOf(e.IdPlaylist) !== -1}
                tabIndex={-1}
                disableRipple
              />
              {e.Descripcion}
              <ListItemText primary={e.Descripcion} />
              <ListItemSecondaryAction>
              </ListItemSecondaryAction>
            </ListItem>
            ))}
          </List>
          <Button onClick={this.addToPlaylist}>Agregar</Button>
        </div>
      );
    }
  }
  export default withStyles(styles)(CheckboxList);