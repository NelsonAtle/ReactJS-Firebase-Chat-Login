import React from 'react';
import { render } from 'react-dom';
import logo from '../logo.svg';
import '../dash.css';
class DashBoard extends React.Component {
  constructor(){
    super(); 
    this.state = {
      usuarios : [],
      mensajes : []
    }
  }

  componentDidMount(){
    window.firebase.database().ref('usuarios/').on('value', datos =>{
      const lista_usuarios = datos.val();
      if (lista_usuarios !== null) {
        this.setState({
          usuarios: lista_usuarios
        });
      }
    });
    window.firebase.database().ref('mensajes/').on('value', datos =>{
      const lista_mensajes = datos.val();
      if (lista_mensajes !== null) {
        this.setState({
          mensajes: lista_mensajes
        });
      }
    });
    sessionStorage.setItem("receptor", "-1");
  }

  chat(id){
    var titulo_user = document.getElementById("titulo_user");
      const {usuarios} = this.state;
      for (var i = 0; i < usuarios.length; i++) {

        if (usuarios[i].id == id) {
          sessionStorage.setItem("receptor", id);
          titulo_user.innerHTML = usuarios[i].nombre;
          sessionStorage.setItem("chat_receptor", usuarios[i].nombre);
          sessionStorage.setItem("avatar_receptor", usuarios[i].avatar);
        }
      }
  }
  cargar_mensajes(){
    const {mensajes} = this.state;
    var id = sessionStorage.getItem("id");
    var receptor = sessionStorage.getItem("receptor");
    const lista_mensajes = mensajes.map(mensaje=>{

      if (mensaje.emisor == id && mensaje.receptor == receptor ||
          mensaje.emisor == receptor && mensaje.receptor == id
        ) {
            if (mensaje.emisor == id ) {
              return <div key={mensaje.id}>
                    <div className="chip user2">
                      <span>Yo: </span>{mensaje.texto}
                    </div>
                    <div className="divider"></div></div>
            }
            if (mensaje.receptor == id ) {
              return <div key={mensaje.id}>
                    <div className="chip user1">
                      <span>{sessionStorage.getItem("chat_receptor")}: </span>{mensaje.texto}
                    </div>
                    <div className="divider"></div></div>
            }
      }
    });
    if (sessionStorage.getItem("receptor") != "-1") {
      return lista_mensajes;
    }

  }

  enviar_mensaje(){
    var mensaje = document.getElementById("texto");
    var receptor = document.getElementById("btnEnviar");
    var nuevo_mensaje = {
      id: this.state.mensajes.length,
      texto: mensaje.value,
      emisor: sessionStorage.getItem("id"),
      receptor: sessionStorage.getItem("receptor")
    }
    window.firebase.database().ref(`mensajes/${nuevo_mensaje.id}`).set(nuevo_mensaje);
    mensaje.value = "";
  }
  salir(){
    window.location.href = "http://localhost:3000";
  }
  render(){
    const {usuarios} = this.state;
    const lista_usuarios = usuarios.map(usuario=>{
      if (usuario.avatar != sessionStorage.getItem("avatar")) {
          return <li key={usuario.id}><a href="#!" value={usuario.id} onClick={this.chat.bind(this,usuario.id)}>{usuario.nombre}</a></li>
      }
    });


    return(
      <div>
        <nav className="nav-extended ">
          <div className="nav-wrapper grey darken-4">
              <a className="brand-logo center">Chat ReactJS <img src={logo} className="logo"/></a>
              <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          </div>
        </nav>
        <ul id="slide-out" className="sidenav sidenav-fixed">
          <li><div className="user-view">
            <h3 className="center">{sessionStorage.getItem("nombre")}</h3>
          </div></li>
          <li>
            <a className='dropdown-trigger' href='#' data-target='dropdown1'><i className="material-icons left">group</i>Contactos</a>
            <ul id='dropdown1' class='dropdown-content'>
              {lista_usuarios}
            </ul>
          </li>
          <div className="divider"></div>
          <li><a href="#!" onClick={this.salir}><i className="material-icons">close</i>Salir</a></li>
        </ul>
        <div id="chat">
          <nav>
            <div className="nav-wrapper teal darken-4">
              <a href="#" className="brand-logo center" value="" id="titulo_user"></a>
            </div>
            <div id="contentsms">
              <main>
                {this.cargar_mensajes()}
              </main>
              <footer>
                <div className="row">
                <div className="input-field col s7 m8">
                  <input placeholder="Escriba el mensaje" id="texto" type="text" className="validate"/>
                  <label htmlFor="texto">Mensaje de Texto</label>
                </div>
                <button className="btn waves-effect waves-light" type="submit" name="action" value="" id="btnEnviar" onClick={this.enviar_mensaje.bind(this)}>Enviar
                   <i className="material-icons right">send</i>
                 </button>
                </div>
              </footer>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}
export default DashBoard;
