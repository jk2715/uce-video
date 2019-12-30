import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid'
import './App.css';
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Button from '@material-ui/core/Button';
import App from './App';

class LoginApp extends Component{
    constructor(){
      super();
      this.state={
        Exito:false,
        Correo:"",
        Clave:""
      }
      this.handleCorreo = this.handleCorreo.bind(this);
      this.handleClave = this.handleClave.bind(this);
      this.handleLogin = this.handleLogin.bind(this);
    }
  
    handleRegistro=()=>{
      this.props.handlePage('registro');
    }
  
    handleCorreo(e){
      this.setState({Correo:e.target.value});
    }
    handleClave(e){
      this.setState({Clave:e.target.value})
    }
  
    loadMain=(nombre, id, image)=>{
      localStorage.setItem("idUsuario", id);
      this.props.updateUsuario(nombre);
      this.props.updateImage(image);
      this.props.updateId(id);
      this.props.handlePage('home');
    }
  
    handleLogin(data){
      var cor = this.state.Correo;
      var cl = this.state.Clave;
      var ev = false;
      fetch("http://localhost:56388/Usuario/GetUsuarios", {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json'
        }, 
      }).then(response => response.json())
      .then(data=>{
        for(var i = 0; i<data.length; i++){
          if(cor === data[i].Correo && cl === data[i].Clave){
            this.loadMain(data[i].Nombre, data[i].IdUsuario, data[i].ImageURL);
            break;
          }
        }
      });
    }
  
    render(){
      return (
        <div style={{marginTop:"8em"}}>
        <Grid container spacing={24} justify="center" alignItems="center" direction="column">
          <Grid item xs={12}>
            <h2>Iniciar Sesion</h2>
          </Grid>
          <Grid item xs={12}>
            <TextField onChange={this.handleCorreo} value={this.state.Correo} fullWidth label="Correo"/>
          </Grid>
          <Grid item xs={10}>
            <TextField onChange={this.handleClave} value={this.state.Clave} label="Contraseña"/>
          </Grid>
          <Grid item xs={10}>
            <a href="#" onClick={this.handleRegistro}>Registrarse</a>
          </Grid>
          <Grid item xs={12}>
            <Button>Atras</Button>
            <Button onClick={this.handleLogin}>Iniciar Sesion</Button>
          </Grid>
        </Grid>
        </div>
      );
    }
  }

  export default LoginApp;