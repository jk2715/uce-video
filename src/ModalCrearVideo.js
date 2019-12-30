import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

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
      Titulo:'',
      UrlVideo:'',
      UrlImagen:'',
      open:this.props.open
    };
  
    handleOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };
  
    handleNombre=(e)=>{
      this.setState({Titulo:e.target.value});
    }

    handleImage=(e)=>{
      this.setState({UrlImagen:e.target.value});
    }

    handleVideo=(e)=>{
      this.setState({UrlVideo:e.target.value});
    }

    guardarVideo=()=>{
      fetch("http://localhost:56388/Video/Create", {
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
        <div className='customModalCrearVideo'>
          <Button  className={classes.button} onClick={this.handleOpen}>Crear Video</Button>
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
              <div></div>
              <label>Nombre 
                <br></br>
                <input type='text' placeholder="Nombre" value={this.state.Titulo} onChange={this.handleNombre} className='inputNombre'/>
              </label>
              <div></div>
              <label>Imagen Previa 
                <br></br>
                <input type='text' placeholder="Imagen Previa" value={this.state.UrlImagen} onChange={this.handleImage} className='inputNombre'/>
              </label>
              <div></div>
              <label>URL del video
                <br></br>
                <input type='text' placeholder="URL del video" value={this.state.UrlVideo} onChange={this.handleVideo} className='inputNombre'/>
              </label>
              <div></div>
              <Button color="primary" className={classes.button}>Cancelar</Button>
              <div></div>
              <Button color="primary" className={classes.button} onClick={this.guardarVideo}>Crear</Button>
            </div>
          </Modal>
        </div>
      );
    }
  }
  const SimpleModalWrapped = withStyles(styles)(SimpleModal);
  export default SimpleModalWrapped;