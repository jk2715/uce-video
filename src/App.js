import React, { Component } from 'react';
import './App.css';
import HomeApp from './HomeApp';
import DetalleApp from './DetalleApp';
import InicioApp from './Inicio';
import LoginApp from './LoginApp';
import RegistroApp from './RegistroApp';

class App extends Component {
  state = {
    page: 'inicio',
    id: '',
    nombre: '',
    image:''
  }
  getUsuario=(data)=>{
    this.setState({nombre:data});
  }
  getId=(data)=>{
    this.setState({id:data});
  }
  getImage=(data)=>{
    this.setState({image:data});
  }
  handlePage = (page) => {
    console.log(page)
   this.setState({ page });
  }
  render() {
    switch(this.state.page) {
      case 'home': return <HomeApp handlePage={this.handlePage} usuario={this.state.nombre} id={this.state.id} image={this.state.image}  />
      case 'detalle': return <DetalleApp handlePage={this.handlePage} updateState={this.handlePage}/>
      case 'inicio': return <InicioApp handlePage={this.handlePage}/>
      case 'login':return <LoginApp handlePage={this.handlePage} updateUsuario={this.getUsuario} updateImage={this.getImage} updateId={this.getId}/>
      case 'registro':return <RegistroApp handlePage={this.handlePage}/>
    }
  }
}

export default App;
