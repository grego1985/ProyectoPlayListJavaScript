

const usuarios = [
  {id: 0, nombre: 'Gregorio', Apellido: 'Boglione', usuario:'a', pass: 'a'},
  {id: 1, nombre: 'Joaquin', Apellido: 'Boglione', usuario:'b', pass: 'b'}
];

const usu = document.querySelector('#usuario');
const clave = document.querySelector('#pass');
const formulario = document.querySelector('.formulario');


formulario.addEventListener('submit', (e) => {
  e.preventDefault(); //metodo para que no se recargue la pagina
  usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios'));
  loginUsuario();
  //console.log(formulario);

});//fin inicio sesion

const start = () => {
  if (localStorage.getItem('usuarios')) {
    const contenedor = document.querySelector('.contenedor');
    const contenedorLogin = document.querySelector('.contenedor-login');
    contenedorLogin.style.display = 'none';
    contenedor.style.display = 'block';
    const saludo = document.querySelector('#saludoUsuario');
    const bienvenida = usuariosRegistrados.nombre;
    const bienvenidaUsuario = usuariosRegistrados.usuario;
    const bienvenidaCuenta = usuariosRegistrados.id;

    saludo.innerHTML = 'Los Datos de tu cuenta: ' + '<br> Nombre: ' + bienvenida + '<br> Usuario: ' + bienvenidaUsuario + '<br> id Cuenta: ' + bienvenidaCuenta;
    saludo.classList.add('parrafo-cuenta');
    iniciaAplicacion();
  }
}

start();

const loginUsuario = () => {
  ingresoUser = usu.value;
  ingresoPass = clave.value;

  if (ingresoUser != '' && ingresoPass != '') {
    for(usuario of usuarios){
      if (usuario.usuario === ingresoUser && usuario.pass === ingresoPass) {
        Swal.fire(
          'LIVE MUSIC',
          `Bienvenido ${usuario.usuario} Espero que disfrutes la  Buena Música`,
          'success'
        )
        const contenedor = document.querySelector('.contenedor');
        const contenedorLogin = document.querySelector('.contenedor-login');
        contenedorLogin.style.display = 'none';
        
        contenedor.style.display = 'block';

        localStorage.setItem('usuarios', JSON.stringify(usuario));
          
        usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios'));
        
        const saludo = document.querySelector('#saludoUsuario');
        const bienvenida = usuariosRegistrados.nombre;
        const bienvenidaUsuario = usuariosRegistrados.usuario;
        const bienvenidaCuenta = usuariosRegistrados.id;

        saludo.innerHTML = 'Los Datos de tu cuenta: ' + '<br> Nombre: ' + bienvenida + '<br> Usuario: ' + bienvenidaUsuario + '<br> id Cuenta: ' + bienvenidaCuenta;
        saludo.classList.add('parrafo-cuenta');
        iniciaAplicacion();
        break; //corta el for una vez que el usuario y la clave son correctos       
      }else {
        Swal.fire({
          icon: 'error',
          title: 'Datos de usuario incorrectos',
          text: `Corrobore los datos ingresados`,
        })
      }
    }
  } 
}

class CrearListaNva{
  constructor(id,nombreLista,idCanciones, img, idUsuario){
    this.id = id;
    this.nombre = nombreLista;
    this.idCanciones = idCanciones;
    this.img = img;
    this.idUsuario = idUsuario;
  }
}

idusuario = localStorage.getItem('cuenta');

const playLists = [
  { id: 0, nombre: 'Rock Nacional Argentino', idCanciones: [1,2,3,4,0], img: "./assets/1.png", idusuario: 9},
  { id: 1, nombre: 'Cuarteto de Cordoba', idCanciones: [6,7,11], img: "./assets/2.jpg",idusuario: 2},
  { id: 2, nombre: 'Rock Internacional', idCanciones: [9,8], img: "./assets/3.jpg",idusuario: 6},
  { id: 3, nombre: 'Rock Internacional y cuarteto', idCanciones: [6,7,9], img: "./assets/3.jpg",idusuario: 2},
  { id: 4, nombre: 'La Mona Jimenes', idCanciones: [7,14], img: "./assets/mona.png",idusuario:2},
  { id: 5, nombre: 'Lo Mejor Banda XXI', idCanciones: [5], img: "./assets/2.jpg",idusuario:1},
  { id: 6, nombre: 'Soda Stereo', idCanciones: [0], img: "./assets/soda.jpg",idusuario:2},
  { id: 7, nombre: 'Exitos Charly Garcia', idCanciones: [2,3],  img: "./assets/charly.jpg",idusuario:1 },
  { id: 8, nombre: 'Los Redondos de Ricota', idCanciones: [4], img: "./assets/redondos.png",idusuario:1 },
  { id: 9, nombre: 'Rock y Cuarteto', idCanciones: [11,10,1,2,3,5,7], img: "./assets/1.png",idusuario:1 },
];

const lispaPopular = document.getElementById('lispaPopular');
lispaPopular.addEventListener('click', iniciaAplicacion);


const buscarCancion = document.getElementById('buscarCancion');
buscarCancion.addEventListener('click',buscarCancionPorNombre)

const crearListaPropia = document.getElementById('crearListaPropia');
crearListaPropia.addEventListener('click',crearListaPropiaUsuario)

const verPlayListPropias = document.getElementById('verPlayListPropias');
verPlayListPropias.addEventListener('click', verPlayListsPropiasUsuario)

const cerrarSesion = document.getElementById('cerrarSesion');
cerrarSesion.addEventListener('click',cerrarSesionUsuario)

class CancionesEnLista{
  constructor(id, nombre, genero, artista){
    this.id = id;
    this.nombre = nombre;
    this.genero = genero;
    this.artista = artista;
  }
}
