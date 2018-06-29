import React,{Component}from 'react';
import logo from '../logo.svg';

class Home extends Component {

  constructor(){
    super();
    this.state = {
      usuarios:[]
    }
  }

  login(){
    var avatar = document.getElementById("avatar");
    var pass =  document.getElementById("password");
    const {usuarios} = this.state;
    var bandera =false;

    for (var i = 0; i < usuarios.length; i++) {
      if (usuarios[i].avatar == avatar.value && usuarios[i].password == pass.value) {
        sessionStorage.setItem("id", usuarios[i].id);
        sessionStorage.setItem("avatar", usuarios[i].avatar);
        sessionStorage.setItem("nombre", usuarios[i].nombre);
        bandera =true;
      }
    }
    if (bandera) {
      window.M.toast({html: 'Correcto!!'}, 4000);
      window.location.href = "http://localhost:3000/DashBoard";
    }else{
      window.M.toast({html: 'Datos Incorrectos!!'}, 4000);
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
  }

  registro(){
    var nombre = document.getElementById("nombre");
    var avatar = document.getElementById("new_avatar");
    var pass =  document.getElementById("new_password");
    var usuario = {
      id: this.state.usuarios.length,
      nombre: nombre.value,
      avatar: avatar.value,
      password: pass.value
    }
    const {usuarios} = this.state;
    if (usuarios.length == 0) {
      if (window.firebase.database().ref(`usuarios/${usuario.id}`).set(usuario)) {
        window.M.toast({html: 'Registro Exitoso!!'}, 4000);
      }
    }
    var bandera=true;
    for (var i = 0; i < usuarios.length; i++) {
      if (usuarios[i].avatar == avatar.value) {
        bandera =false;
        window.M.toast({html: 'Error: Avatar ya existente!!'},4000);
        break;
      }
    }
    if (bandera) {
      if (window.firebase.database().ref(`usuarios/${usuario.id}`).set(usuario)) {
        window.M.toast({html: 'Registro Exitoso!!'},4000);
        nombre.value = "";
        avatar.value= "";
        pass.value="";
        bandera = true;
      }
    }

  }

  render() {
    return (
      <div>
  	  	<nav className="nav-extended">
      		<div className="nav-wrapper grey darken-4">
        			<a className="brand-logo center">Chat ReactJS <img src={logo} className="logo"/></a>
        			<a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        			<ul id="nav-mobile" className="right hide-on-med-and-down">
        			  	<li><a href="#login" className="modal-trigger">Login</a></li>
        			  	<li><a href="#registro" className="modal-trigger">Registrarse</a></li>
        			</ul>
      		</div>
          <ul className="sidenav" id="mobile-demo">
            <li><a href="#login" className="modal-trigger">Login</a></li>
            <li><a href="#registro" className="modal-trigger">Registrarse</a></li>
          </ul>
    		</nav>
        <div className="slider fullscreen">
          <ul className="slides">
            <li>
              <img src="https://images.samsung.com/is/image/samsung/p5/es/apps/samsung-themes/apps_theme-service_kv_pc.jpg?$ORIGIN_JPG$"/>
              <div className="caption center-align">
                <h3>Chatea con tus amigos</h3>
                <h5 className="text-lighten-3">desde una misma <span>App</span></h5>
                <img src="https://media.forgecdn.net/attachments/127/798/Message.gif"/>
              </div>
            </li>
            <li>
            <img src="http://blog.protegetuviaje.com/wp-content/uploads/2016/08/hiker-1149877_1920.jpg"/>
            <div className="caption center-align">
              <h3>Chatea desde cualquier lugar</h3>
              <img src="https://i.imgur.com/Hn9wf46.gif"/>
            </div>
            </li>
            <li>
            <img src="https://www.bluefoxtech.com/wp-content/uploads/2016/10/work-731198_1920-1.jpg"/>
            <div className="caption center-align">
              <h3>Chatea desde cualquier dispositivo</h3>
              <img id="rokect" src="https://veblabs.com/images/seo.gif"/>
            </div>
            </li>
          </ul>
        </div>
        <div className="row">
          <div id="login" className="modal col s12 m6 offset-m3">
              <div className="modal-content">
              <h4 className="center">Iniciar Session</h4>
              <h1 className="center"><img src={logo} width="130"/></h1>
              <div className="input-field col s12">
                <input id="avatar" type="text" className="validate" />
                <label htmlFor="avatar"><i className="material-icons left">account_circle</i>Avatar</label>
              </div>
              <div className="input-field col s12">
                <input id="password" type="password" className="validate" />
                <label htmlFor="password"><i className="material-icons left">fingerprint</i>Password</label>
              </div>
              </div>
              <div className="modal-footer">
                <h1 className="center"><button onClick={this.login.bind(this)} className="modal-close waves-effect waves-light btn">Iniciar</button></h1>
              </div>
          </div>
          <div id="registro" className="modal col s12 m6 offset-m3">

              <div className="modal-content">
              <h4 className="center">Registrarse</h4>
              <h1 className="center"><img src={logo} width="130"/></h1>
              <div className="input-field col s12">
                <input id="nombre" type="text" className="validate"/>
                <label htmlFor="nombre"><i className="material-icons left">assignment_ind</i>Nombre</label>
              </div>
              <div className="input-field col s12">
                <input id="new_avatar" type="text" className="validate"/>
                <label htmlFor="new_avatar"><i className="material-icons left">account_circle</i>Avatar</label>
              </div>
              <div className="input-field col s12">
                <input id="new_password" type="password" className="validate"/>
                <label htmlFor="new_password"><i className="material-icons left">fingerprint</i>Password</label>
              </div>
              </div>
              <div className="modal-footer">
                <h1 className="center"><button onClick={this.registro.bind(this)} className="modal-close waves-effect waves-light btn">Iniciar</button></h1>
              </div>
          </div>
        </div>

      </div>
    );
  }
}
export default Home;
