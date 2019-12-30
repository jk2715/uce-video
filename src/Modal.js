import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import ListItemParaElModalPlayList from './ListItemParaElModalPlayList';

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const styles = theme => ({
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
    },
  });
  
  class SimpleModal extends React.Component {
    state = {
      IdUsuario:localStorage.getItem("idUsuario"),
      Descripcion:'',
      IdVideo:localStorage.getItem("idVideo"),
      open: false,
    };
  
    handleOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };
    
    handleNombre=(e)=>{
      this.setState({Descripcion:e.target.value});
    }

    crearPlaylist=()=>{
      fetch("http://localhost:56388/Video/CreatePlaylist", {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers:{
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      }).then(function(){
        window.location.reload();
      });
    }

    render() {
      const { classes } = this.props;
  
      return (
        <div>
          <Button variant="outlined" className={classes.button} onClick={this.handleOpen}>Agregar a mi Playlist</Button>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <div style={getModalStyle()} className={classes.paper}>
              <Typography variant="title" id="modal-title">
                Añadir a...
              </Typography>
              <ListItemParaElModalPlayList/>
              <div></div>
              <label>Nombre 
                <br></br>
                <input type='text' onChange={this.handleNombre} value={this.state.Descripcion} placeholder="Nombre" className='inputNombre'/>
              </label>
              <div></div>
              <Button color="primary" className={classes.button}>Cancelar</Button>
              <div></div>
              <Button color="primary" onClick={this.crearPlaylist} className={classes.button}>Crear</Button>
            </div>
          </Modal>
        </div>
      );
    }
  }
  const SimpleModalWrapped = withStyles(styles)(SimpleModal);
  export default SimpleModalWrapped;