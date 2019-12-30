import React, { Component } from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ImageAvatars from './ImageAvatars';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

class SimpleMenu extends React.Component {
    constructor(){
      super();
      this.state = {
        IdUsuario:localStorage.getItem("idUsuario"),
        IdVideo:localStorage.getItem("idVideo"),
        Contenido:'',
        eval:false,
        anchorEl: null,
      };
      this.agregarComentario = this.agregarComentario.bind(this);
    }
    
    Comentario=[];
    
    handleClose = () => {
      this.setState({ anchorEl: null });
    };

    handleComentario=(e)=>{
      this.setState({Contenido:e.target.value});
    };
  
    agregarComentario(){
      fetch("http://localhost:56388/Video/CreateComentario", {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers:{
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      }).then(function(){
        
      });
    }


    updateComentarios=(data)=>{
      this.Comentario.push(data);
      this.setState({eval:true});
    }

    componentDidMount(){
      fetch("http://localhost:56388/Video/GetComentarios?Id=" + this.state.IdVideo, {
        method: 'GET',
        headers:{
         'Content-Type': 'application/json'
        },
        mode:"cors"
      }).then(response => response.json())
        .then(data=>{
          if(this.state.eval === false){
            data.map((x)=>{
              this.updateComentarios(x);
            })
          }
      })
    }

    render() {
      const { anchorEl } = this.state;
        return (
          <div className=''>
          <TextField onChange={this.handleComentario} value={this.state.Contenido} fullWidth label="Nuevo Comentario"/>
            <Button
              aria-owns={anchorEl ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={this.agregarComentario}
            >Agregar</Button>
            <br/>
            <List>
              {this.Comentario.map(com =>(
                <div>
                <ListItem key={com.IdComentario}>
                <div><ImageAvatars image={com.ImageURL}/><h5><b>{com.Usuario}</b></h5></div>
                <div style={{borderStyle:'ridge', padding:1+'em', marginLeft:1+'em', borderRadius:8+'px'}}><p>{com.Comentario}</p></div>
                  </ListItem>
                </div>
                ))}
            </List>
          </div>
        );
      }
    }
  export default SimpleMenu;