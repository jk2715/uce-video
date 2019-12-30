import React, { Component } from 'react';
import './App.css';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import CenteredGrid from './CenteredGrid'
import ImageAvatars from './ImageAvatars';
import FolderList from './FolderList';
import SimpleMenu from './SimpleMenu';
import Modal from '@material-ui/core/Modal';
import ReactPlayer from 'react-player';
import VideoCard from './VideoCard';
import CrearVideosApp from './CrearVideosApp';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  appFrame: {
    height: 1300,
    zIndex: 1300,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  drawerPaper: {
    position: 'relative',
    backgroundColor: 'green',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function CenteredGrid2(props) {
    const { classes,destacados,paraProgramar,populares,playlist, usuario, image, video, open} = props;
    var op = props.open;
    if(op){
      op = true;
    }
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid className='panel' item xs={12} sm={3}>
          <div onClick={()=>props.updateState('main')}>
          <img src="LogoVideoUce.png" height="146.5px"/>
          </div>
          <h1>Mis videos</h1>
          <MenuItem><a onClick={()=>props.updateState('myVideos')}>Administrar Videos</a></MenuItem>
          <h1>Mi Playlist</h1>
          <FolderList classesName='panel' items={props.miPlayList} updateState={props.updateState}/>
          </Grid>
          <Grid item xs={12} sm={9}>
            <SimpleMenu handlePage={props.handlePage} usuario={props.usuario} image={props.image}/>
            <input type="text" className='customInput'  placeholder='Buscar a un artista, tema o amigo'/>
            <p>Lo mejor de la Semana</p>
            <h1>Destacados</h1>
            <CenteredGrid handlePage={props.handlePage} items={destacados} updateState={props.updateState}/>
            <p>Lo mejor para concentrarte</p>
            <h1>Para Programar</h1>
            <CenteredGrid items={paraProgramar} handlePage={props.handlePage} updateState={props.updateState}/>
            <p>Si no te queda de otra</p>
            <h1>Cursos Populares</h1>
            <CenteredGrid items={populares} handlePage={props.handlePage} updateState={props.updateState}/>
          </Grid>
        </Grid>
      </div>
    );
  }
  const CenteredGridStyle=withStyles(styles)(CenteredGrid2);

class HomeApp extends React.Component {
  state = {
    anchor: 'left',
    eval:false,
    view:'main',
    destacados: [],
    paraProgramar: [],
    populares: [],
    miPlayList:[],
    Avatars:[
      {
        imageAvatars:'/Avatar1.jpg'
      },
      {
        imageAvatars:'/Avatar2.jpg'
      },
      {
        imageAvatars:'/Avatar3.jpg'
      },
      {
        imageAvatars:'/Avatar4.jpg'
      }
    ],
  };


  generateNumbers(){
    var arr=[];
    for(var i = 0;i < 20;i++){
      var x = Math.floor((Math.random() * 11) + 1);
      arr.push(x);
    }
    return arr;
  }

  updateData=(data)=>{
    var arr = '{"urlImagen":"' + data.Imagen + '","titulo":"' + data.Titulo + '","urlVideo":"' + data.URLVideo + '","views":"' + data.Views + '","idVideo":"' + data.IdVideo + '"}';
    return JSON.parse(arr);
  }

  showVideos=(arr)=>{
    var count = 0;
    arr.map((item)=>{
      if(count<3){
        this.setState({destacados:this.state.destacados.concat(item)});
        count++;
      }
      else if(count<6){
        this.setState({paraProgramar:this.state.paraProgramar.concat(item)});
        count++;
      }
      else{
        this.setState({populares:this.state.populares.concat(item)});
        count++;
      }
    })
  }
  componentDidMount(){
    var numbers = this.generateNumbers();
    var arr =[];
    fetch("http://localhost:56388/Video/GetRandomVideos", {
        method: 'GET',
        headers:{
         'Content-Type': 'application/json'
        },
        mode:"cors"
      }).then(response => response.json())
        .then(data=>{
          if(this.state.eval === false){
            data.map((x)=>{
              for(var i = 0; i < numbers.length; i++){
                if(x.IdVideo === numbers[i]){
                  arr=arr.concat(this.updateData(x));
                }
              }
            })
            this.showVideos(arr);
          }
      })
  }
 


  updatePlaylist=(data)=>{
    this.setState({miPlayList:this.state.miPlayList.concat(data), eval:true});
  }

  handleView=(x)=>{
    this.setState({view:x});
  }

  handleChange = event => {
    this.setState({
      anchor: event.target.value,
    });
  };

  render() {
    fetch("http://localhost:56388/Usuario/GetPlaylists?Id=" + this.props.id, {
        method: 'GET',
        headers:{
         'Content-Type': 'application/json'
        },
        mode:"cors"
      }).then(response => response.json())
        .then(data=>{
          if(this.state.eval === false){
            data.map((x)=>{
              this.updatePlaylist(x);
            })
          }
      })
    localStorage.setItem("playlist", this.state.miPlayList);
    const { classes } = this.props;
    const {destacados,paraProgramar,populares } = this.state;
      switch(this.state.view){
        case 'main':
        return(
          <div>
            <CenteredGridStyle destacados={destacados} updateState={this.handleView} image={this.props.image} usuario={this.props.usuario} paraProgramar={paraProgramar} populares={populares} handlePage={this.props.handlePage} miPlayList={this.state.miPlayList} avatars={this.state.Avatars}/>
          </div>
        );
        break;
        case 'video':
        return(
          <VideoCard updateState={this.handleView}/>
        );
        break;
        case 'myVideos':
        return(
          <CrearVideosApp playlist={this.state.miPlayList} updateState={this.handleView}/>
        );
      }
    }
  }

export default withStyles(styles)(HomeApp);