import React, { Component } from 'react';
import logo from './logo.svg';
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


class RegistroApp extends Component{
    constructor(props){
      super(props);
      this.state = {
        Nombre:"",
        Apellido:"",
        Correo:"",
        Clave:"",
        Image:""
      };
      this.handleNombre = this.handleNombre.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleAtras=()=>{
      this.props.handlePage("login")
    }
  
    handleNombre(e){
      this.setState({Nombre:e.target.value});
    }
  
    handleApellido=(e)=>{
      this.setState({Apellido:e.target.value});
    }
  
    handleCorreo=(e)=>{
      this.setState({Correo:e.target.value});
    }
  
    handleClave=(e)=>{
      this.setState({Clave:e.target.value});
    }

    handleImage=(e)=>{
        this.setState({Image:e.target.value});
    }
  
    handleClick(){
      fetch("http://localhost:56388/Usuario/Create", {
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
  
    render(){
      return (
        <div style={{marginTop:"8em"}}>
        <Grid container spacing={24} justify="center" alignItems="center" direction="column">
          <Grid item xs={12}>
            <h2>Registro</h2>
          </Grid>
          <Grid item xs={12}>
            <TextField value={this.state.Nombre} onInput={this.handleNombre} fullWidth label="Nombre"/>
          </Grid>
          <Grid item xs={10}>
            <TextField value={this.state.Apellido} onInput={this.handleApellido} label="Apellido"/>
          </Grid>
          <Grid item xs={10}>
            <TextField value={this.state.Correo} onInput={this.handleCorreo} label="Correo"/>
          </Grid>
          <Grid item xs={10}>
            <TextField value={this.state.Clave} onInput={this.handleClave} label="Contraseña"/>
          </Grid>
          <Grid item xs={10}>
            <TextField value={this.state.Clave} onInput={this.handleClave} label="Confirmar Contraseña"/>
          </Grid>
          <Grid item xs={10}>
            <TextField value={this.state.Image} onInput={this.handleImage} label="URL de imagen de perfil"/>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={this.handleAtras}>Atras</Button>
            <Button onClick={this.handleClick}>Registrar</Button>
          </Grid>
        </Grid>
        </div>
      );
    }
  }

  export default RegistroApp;