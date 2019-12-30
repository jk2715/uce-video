import React, { Component } from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ImageAvatars from './ImageAvatars';


class SimpleMenu extends React.Component {
    state = {
      anchorEl: null,
      usuario: '',
      image: ''
    };
  
    handleClick = event => {
      this.setState({ anchorEl: event.currentTarget });
    };
  
    handleClose = () => {
      this.setState({ anchorEl: null });
    };
  
    getUsuario = (data) =>{
      this.setState({usuario:data});
    };

    getImage = (data) =>{
      this.setState({image:data});
    }

    render() {
      const { anchorEl } = this.state;
  
      return (
        <div className='customMenu'>
          <Button
            aria-owns={anchorEl ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
          <ImageAvatars image = {this.props.image}/>  <p>{this.props.usuario}</p>
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
            <MenuItem onClick={this.handleClose}>My account</MenuItem>
            <MenuItem onClick={() => this.props.handlePage('inicio')}>Logout</MenuItem>
         
          </Menu>
        </div>
      );
    }
  }

  export default SimpleMenu;