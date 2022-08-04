/*
window.onload = () => {
    window.location.hash = "no-back-button";
    window.location.hash = "Again-No-back-button";
    window.onhashchange = () => {
      window.location.hash = "no-back-button";

    
    var ctrlKeyDown = false;

    $(document).ready(function(){    
        $(document).on("keydown", keydown);
        $(document).on("keyup", keyup);
    });
    
    function keydown(e) { 
    
        if ((e.which || e.keyCode) == 116 || ((e.which || e.keyCode) == 82 && ctrlKeyDown)) {
            // Pressing F5 or Ctrl+R
            e.preventDefault();
        } else if ((e.which || e.keyCode) == 17) {
            // Pressing  only Ctrl
            ctrlKeyDown = true;
        }
    };
    
    function keyup(e){
        // desactivamos control
        if ((e.which || e.keyCode) == 17) 
            ctrlKeyDown = false;
    };
  }

  window.onbeforeunload = function() {
    return 'Si presiona Abandonar, se perderán los datos';
  }

} // Cierre Onload FUNCION PARA  INHABILITAR F5 Y RECARGA DE PAGINA

*/
let usuariosRegistrados;
usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios'));
if (usuariosRegistrados) {
  ingresoUser = usuariosRegistrados.usuario; //guarda en la variable el valor guardado en localStorage de la key ingresoUser.
  ingresoPass = usuariosRegistrados.pass; //guarda en la variable el valor guardado en localStorage de key ingresoPass.
}



const cerrarSesionUsuario = () => {
  localStorage.removeItem('usuarios');
  window.location.href = 'index.html';
}

const limpiaDOM = () => {
    let contenidoSecundario = document.querySelector(".menu-secundario");
    contenidoSecundario.innerHTML="";
  
    const menuPrincipal = document.querySelector('.menu-principal');
    menuPrincipal.style.display = 'grid';
    
    const resultado = document.querySelector('#resultado')
    resultado.innerHTML = "";
  
    const agregaLista = document.querySelector('.agregaLista');
    agregaLista.style.display = 'none';
  
    const busqueda = document.querySelector('#busqueda');
    busqueda.innerHTML="";
  
    let contenedor = document.querySelector(".menu-principal");
    contenedor.innerHTML="";
}

const iniciaAplicacion = async () => {
  limpiaDOM();

  const titulo = document.querySelector('.titulo');
  titulo.innerHTML = "Play List Populares";

  let contenedor = document.querySelector(".menu-principal");
  contenedor.innerHTML="";

  fetch('data.json')
      .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
    .then(json => {
      canciones = json;
      const objUsuario = JSON.parse(localStorage.getItem('usuarios'));

      for(playList of playLists){
        if (playList.idusuario != objUsuario.id) {
          let cancionNombre = ' - ';
          let contMenu = document.createElement("div");
          
          playList.idCanciones.forEach((valor,indice) => {
            for(cancion of canciones){
              if (valor === cancion.id) {              
                if (indice <= 4) {
                  cancionNombre += cancion.nombre + ' - ';
                  break;
                }
              }
            }       
          });
          contMenu.innerHTML = `
          <div class="contenido-menuPrincipal">
            <button onclick=mostrarCancionesPlayListPopulares(${playList.id}) type="button" class="imgBoton-${playList.id}"><img src="${playList.img}" alt="${playList.img}" class="imagenListas"></button>
            <h3 class="titulo-plyList">${playList.nombre}</h3>
            <p class="parrafo-playList"> ${cancionNombre}</p>
          </div>`;
    
        contenedor.append(contMenu);
        }
      }
    });
} 

const mostrarCancionesPlayListPopulares = (idPlayList) => {
  limpiaDOM();
  const id = idPlayList;
  const datosPlay = playLists.find((el) => el.id === idPlayList);
  
  const titulo = document.querySelector('.titulo');
  titulo.innerHTML = `Play List: ${datosPlay.nombre}`;

  const menuPrincipal = document.querySelector('.menu-principal');
  menuPrincipal.style.display = 'grid';

  let contenidoSecundario = document.querySelector(".menu-secundario");
  contenidoSecundario.innerHTML="";
  const infoLista = document.createElement('div');
  infoLista.classList.add("divDetallePlayList");
  infoLista.innerHTML = `<div class="divPrincipal flexible"><img src="${datosPlay.img}" class="imagenListas"> 
  </div>
  `;
  menuPrincipal.append(infoLista);
  
  let tabla = document.createElement("div");
  tabla.innerHTML = `
  <table id="tablaLista" class="table tablaListado">
      <thead>
          <tr>
          <th scope="col"></th>
              <th scope="col">Nombre</th>
              <th scope="col">Genero</th>
              <th scope="col">Artista</th>
              <th scope="col">Accion</th>
          </tr>
      </thead>

      <tbody id="bodyTabla">
        
      </tbody>
  </table>
`;

    contenidoSecundario.appendChild(tabla);

    let bodyTabla = document.querySelector("#bodyTabla");
    datosPlay.idCanciones = [...new Set( datosPlay.idCanciones)]; 
    datosPlay.idCanciones.forEach((valor) => {
        for(cancion of canciones){
          if (valor === cancion.id) {      
            datosTabla = document.createElement("tr");
            datosTabla.innerHTML = `<tr>
            <th scope="row"></th>
            <td>${cancion.nombre}</td>
            <td>${cancion.genero}</td>
            <td>${cancion.artista}</td>
            <td class="accion">
              <img src="./assets/play.png" width="40px" onClick=reproducirCancion(${cancion.id}) class="imgDetalleLista">
              <img src="./assets/stop.png" width="40px" onClick=pausarAudio(${cancion.id}) class="imgDetalleLista">
            </td>
        </tr>`;
            bodyTabla.appendChild(datosTabla);
          }
        }       
      });
} 

const mostrarCancionesPlayList = (idPlayList) => {
  limpiaDOM();
  const id = idPlayList;
  const datosPlay = playLists.find((el) => el.id === idPlayList);
 
  const titulo = document.querySelector('.titulo');
  titulo.innerHTML = `Play List: ${datosPlay.nombre}`;

  const menuPrincipal = document.querySelector('.menu-principal');
  menuPrincipal.style.display = 'grid';

  let contenidoSecundario = document.querySelector(".menu-secundario");
  contenidoSecundario.innerHTML="";
  const infoLista = document.createElement('div');
  infoLista.classList.add("divPrincipal");
  infoLista.innerHTML = `<div class="divPrincipal flexible"><img src="${datosPlay.img}" class="imagenListasUsuario"> 
  <img src="./assets/delete.png" class="editarPlayList"  onClick=eliminarPlayList(${datosPlay.id})> 
  <img src="./assets/agregar.png" class="editarPlayList"  onClick=editarPlayListPropia(${datosPlay.id})> 
  <img src="./assets/editar.png" class="editarPlayList"  onClick=cambiarNombrePlayList(${datosPlay.id})> 
  </div>
  `;
  menuPrincipal.append(infoLista);
  
  let tabla = document.createElement("div");
  tabla.innerHTML = `
  <table id="tablaLista" class="table tablaListado">
      <thead>
          <tr>
          <th scope="col"></th>
              <th scope="col">Nombre</th>
              <th scope="col">Genero</th>
              <th scope="col">Artista</th>
              <th scope="col">Accion</th>
          </tr>
      </thead>

      <tbody id="bodyTabla">
        
      </tbody>
  </table>
`;

    contenidoSecundario.appendChild(tabla);

    let bodyTabla = document.querySelector("#bodyTabla");
    datosPlay.idCanciones = [...new Set( datosPlay.idCanciones)]; 
    datosPlay.idCanciones.forEach((valor) => {
        for(cancion of canciones){
          if (valor === cancion.id) {      
            datosTabla = document.createElement("tr");
            datosTabla.innerHTML = `<tr>
            <th scope="row"></th>
            <td>${cancion.nombre}</td>
            <td>${cancion.genero}</td>
            <td>${cancion.artista}</td>
            <td class="accion">
              <img src="./assets/delete.png" width="40px" onclick=eliminarCancionListaPropia(${cancion.id},${datosPlay.id}) class="imgDetalleLista">
              <img src="./assets/play.png" width="40px" onClick=reproducirCancion(${cancion.id}) class="imgDetalleLista">
              <img src="./assets/stop.png" width="40px" onClick=pausarAudio(${cancion.id}) class="imgDetalleLista">
            </td>
        </tr>`;
            bodyTabla.appendChild(datosTabla);
          }
        }       
      });
} 

const cambiarNombrePlayList = (idPlayList) => {
  const id = idPlayList;
  const datosPlay = playLists.find((el) => el.id === idPlayList);

  const busqueda = document.querySelector('#busqueda');
  busqueda.innerHTML="";

  let etiqueta = document.createElement('Label')
  let br  = document.createElement('br');
  busqueda.append(br);
  etiqueta.setAttribute("for","nom");
  etiqueta.setAttribute("class","etiqueta");

  etiqueta.innerHTML = "Ingrese el Nuevo Nombre de la PlayList";
  
  busqueda.append(etiqueta);

  let nombre = document.createElement("INPUT");
  nombre.setAttribute("type", "text");
  nombre.setAttribute("id", "nom");  
  nombre.setAttribute("class", "inputCambiaNombre");
  nombre.setAttribute("value", `${datosPlay.nombre}`);
  busqueda.appendChild(nombre);

  let btn = document.createElement("button");
  btn.innerHTML = "Modificar";
  btn.type = "button";
  btn.name = "botonBuscar";
  btn.setAttribute("class", "btnBuscar");  
  busqueda.append(btn);
  btn.addEventListener('click', () => modificarNombre(datosPlay.id));
}

const modificarNombre = (id) => {
  const nvoNombre = document.querySelector('.inputCambiaNombre').value;

  const datosPlay = playLists.find((el) => el.id === id);
  playLists[datosPlay.id].nombre = nvoNombre;
  mostrarCancionesPlayList(datosPlay.id);
}

const eliminarPlayList = (idPlayList) => {
  Swal.fire({
    title: '¿Está Seguro de Eliminar la PlayList?',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'NO Borrar',
    confirmButtonText: 'Si, Eliminar!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Lista Eliminada!',
        '',
        'success'
      )
      const id = playLists.find(idPlay => idPlay.id === Number(idPlayList));
      if (id) {
        let indicePlayList = playLists.findIndex(idPlay => idPlay.id === Number(idPlayList));
        playLists.splice(indicePlayList, 1);
        verPlayListsPropiasUsuario();
      }
    }
  })
}

const buscarCancionPorNombre = () => {
  limpiaDOM();
  const titulo = document.querySelector('.titulo');
  titulo.innerHTML = "Buscar / Reproducir / Eliminar Cancion";


  let etiqueta = document.createElement('Label')
  let br  = document.createElement('br');
  busqueda.append(br);
  etiqueta.setAttribute("for","nom");
  etiqueta.setAttribute("class","etiqueta");

  etiqueta.innerHTML = "Ingrese Nombre de la Canción que desea Buscar";
  
  busqueda.append(etiqueta);

  let nombre = document.createElement("INPUT");
  nombre.setAttribute("type", "text");
  nombre.setAttribute("id", "nom");  
  nombre.setAttribute("class", "inputBuscar");
  busqueda.appendChild(nombre);
  nombre.addEventListener('input', () => mostrarCancion());
  
  let btn = document.createElement("button");
  btn.innerHTML = "Buscar";
  btn.type = "button";
  btn.name = "botonBuscar";
  btn.setAttribute("class", "btnBuscar");  
  busqueda.append(btn);
  btn.addEventListener('click', () => mostrarCancion);

} 

const mostrarCancion =  () => {
  const buscaNombre = document.querySelector('.inputBuscar');
  const resultado = document.querySelector('#resultado')

    resultado.innerHTML = "";
    const texto = buscaNombre.value.toLowerCase();
    for(cancion of canciones){
      let nombre = cancion.nombre.toLowerCase();

      nombre.indexOf(texto) !== -1 ? resultado.innerHTML += `<li class="resultadoLi">${cancion.nombre}
      <button onClick=reproducirCancion(${cancion.id}) class="botonReproducir" id="playpausebtn"><img src="./assets/play.png" width="30px" class ="playpausebtn" id="playpausebtn"></button>
      <button onClick=pausarAudio(${cancion.id}) class="pauseBoton" id="pauseBoton"><img src="./assets/stop.png" width="30px"></button>
      <button onClick=eliminarCancion(${cancion.id}) id="eliminar${cancion.id}" type="button" class="botonEliminar">Eliminar</button>
      </li>` : '';
      
    }

    resultado.innerHTML === '' ? resultado.innerHTML += `<h3 class="etiqueta">No existe cancion</h3>`: '';
}

audio = new Audio();
const reproducirCancion =  (id) => {
  let cancion = canciones.find((el) => el.id === id);

  indiceR = canciones.findIndex((element) => {
    if (element.id === Number(cancion.id)) {
        playPause(cancion.url);
    }
  });
}

const playPause = (cancionUrl) => {
    audio.src = cancionUrl;
    playbtns = document.querySelectorAll(".playpausebtn");
  
    if(audio.paused){
        audio.play();
        for(playbtn of playbtns){
          playbtn.style.background = "url(./assets/pause.png) no-repeat";
        }
      } else {
        audio.pause();
        playbtn.style.background = "url(./assets/play.png) no-repeat";            
    }
}


const pausarAudio = () => {
  audio.pause();
}

const eliminarCancion = (id) => {
  Swal.fire({
    title: '¿Seguro que desea Eliminar la Canción?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'NO Borrar',
    confirmButtonText: 'SI, Eliminar'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Cancion Eliminada!',
        'Se borró el archivo.',
        'success'
      )
        let cancion = canciones.find((el) => el.id === id);

        let indice = canciones.findIndex((element) => {
            if (element.id === Number(cancion.id)) {
                return true;
            }
        });
        canciones.splice(indice, 1);
        audio.pause();
        mostrarCancion();
    }
  })
}


const eliminarCancionListaPropia = (id, idPlayList) => {
  Swal.fire({
    title: '¿Seguro que desea Eliminar la Canción?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'NO Borrar',
    confirmButtonText: 'SI, Eliminar'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Cancion Eliminada!',
        'Se borró el archivo.',
        'success'
      )
        let cancion = canciones.find((el) => el.id === id);

        let indice = canciones.findIndex((element) => {
            if (element.id === Number(cancion.id)) {
                return true;
            }
        });
        audio.pause();
        canciones.splice(indice, 1);
        mostrarCancionesPlayList(idPlayList);
    }
  })
}


const crearListaPropiaUsuario = () => {
  limpiaDOM();
  const titulo = document.querySelector('.titulo');
  titulo.innerHTML = "Agregar Nueva PlayList";

  var fileInput = document.getElementById('inputBuscar');
  fileInput.value = '';
  const nombreLista = document.querySelector('#nombreLista')
  nombreLista.value = '';

  const agregarPlayList = document.querySelector('#agregarPlayList'); 
  agregarPlayList.disabled = true;

  let contenidoSecundario = document.querySelector(".menu-secundario");
  contenidoSecundario.innerHTML="";

  const agregaLista = document.querySelector('.agregaLista');
  agregaLista.style.display = 'block';

  const btnAgrega = document.querySelector('.btnAgrega');
  btnAgrega.addEventListener('click', agregaListaPropia);
}

function guardarImagen(input) {
  var fileInput = document.getElementById('inputBuscar');
  var filePath = fileInput.value;
  var allowedExtensions = /(.jpg|.jpeg|.png)$/i;
  if(!allowedExtensions.exec(filePath)){
    Swal.fire({
      icon: 'error',
      text: 'Seleccione un tipo de archivo válido',
    })
      fileInput.value = '';
      return false;
  }else{
    let file = input.files[0];
    path = 'assets/';
    momentoActual = new Date() 
    hora = momentoActual.getHours() 
    minuto = momentoActual.getMinutes() 
    segundo = momentoActual.getSeconds()
    let date = new Date();
    const fecha = date.toISOString().split('T')[0];
    rutaArchivo = `${path}LiveMusic.png`;
    const agregarPlayList = document.querySelector('#agregarPlayList'); 
    agregarPlayList.disabled = false;
  }
}

const agregaListaPropia = () => {
  const agregarPlayList = document.querySelector('#agregarPlayList'); 
  const idPlayListNvo = playLists.length; 
  const nombreLista = document.querySelector('#nombreLista').value; 
  const img = rutaArchivo;
  
  const idCanciones = [];
  const usuarioLista = JSON.parse(localStorage.getItem('usuarios'));
  
  if (idPlayListNvo != '' && nombreLista != '' && img != '') {
    playLists.push({id: idPlayListNvo, nombre: nombreLista, idCanciones: idCanciones, img: img, idusuario: usuarioLista.id});
    Toastify({
      text: "Se Creo Correctamente la PLayList",
      className: "info",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      }
    }).showToast();
    agregarPlayList.disabled = true;
    mostrarCancionesPlayList(idPlayListNvo);
  } else {
    Swal.fire({
      icon: 'error',
      text: 'Ingrese los Datos Solicitados',
    })
  }
}

const editarPlayListPropia = (idPlayListNvo) => {
  const busqueda = document.querySelector('#busqueda');
  busqueda.innerHTML="";

  let etiqueta = document.createElement('Label');
  let br  = document.createElement('br');
  busqueda.append(br);
  etiqueta.setAttribute("for","nom");
  etiqueta.setAttribute("class","etiqueta");


  etiqueta.innerHTML = "Ingrese Nombre de la Canción que desea Agregar";
  
  busqueda.append(etiqueta);

  let nombre = document.createElement("INPUT");
  nombre.setAttribute("type", "text");
  nombre.setAttribute("id", "nom");  
  nombre.setAttribute("class", "inputBuscar");
  busqueda.appendChild(nombre);
  nombre.addEventListener('input', () => mostrarCancionAgregar(idPlayListNvo));
  
  let btn = document.createElement("button");
  btn.innerHTML = "Buscar";
  btn.type = "button";
  btn.name = "botonBuscar";
  btn.setAttribute("class", "btnBuscar");  
  busqueda.append(btn);
  btn.addEventListener('click', () => mostrarCancionAgregar(idPlayListNvo));
}

const mostrarCancionAgregar = (idPlayListNvo) => {
  const idPLayList = idPlayListNvo;
  const buscaNombre = document.querySelector('.inputBuscar');
  const resultado = document.querySelector('#resultado')
  resultado.innerHTML = "";  

    const texto = buscaNombre.value.toLowerCase();
    for(cancion of canciones){
      let nombre = cancion.nombre.toLowerCase();

      nombre.indexOf(texto) !== -1 ? resultado.innerHTML += `<li class="resultadoLi">${cancion.nombre}
      <img onClick=reproducirCancion(${cancion.id}) src="./assets/play.png" class="imgBusqueda" id ="${cancion.id}" width="34px">
      <img onClick=agregarCancion(${cancion.id},${idPLayList}) class="imgBusqueda" id="agregar${cancion.id}" src="./assets/agregar.png" width="34px">
      <img onClick=pausarAudio(${cancion.id}) class="pauseBoton imgBusqueda" id="pauseBoton"src="./assets/stop.png" width="34px">
      </li>` : '';

    }
    resultado.innerHTML === '' ? resultado.innerHTML += `<h3 class="etiqueta">No existe cancion</h3>`: '';
}

const agregarCancion = (idCancion, idPLayList) => {
    let contenidoSecundario = document.querySelector(".menu-secundario");
    contenidoSecundario.innerHTML="";
    
    let indiceLista = idPLayList;
    let arrayCancionesLista = playLists[idPLayList].idCanciones;
    
    arrayCancionesLista.push(idCancion);
    arrayCancionesLista = [...new Set(arrayCancionesLista)];

    mostrarCancionesPlayList(idPLayList)
}

const eliminarListaPropia = (idPlayList, idCancion) =>{
  let arrayCancionesLista =  [...new Set(playLists[idPlayList].idCanciones)];
  let contenidoSecundario = document.querySelector(".menu-secundario");
  contenidoSecundario.innerHTML=""; 

  let resultado = [...new Set(arrayCancionesLista)]; 

  const canc = arrayCancionesLista.find(can => can === idCancion);
  
  if(canc === undefined){
    Swal.fire('La canción no Existe')
  }else{
    playLists[idPlayList].idCanciones = [...new Set(playLists[idPlayList].idCanciones)];
    let indiceCan = resultado.findIndex(can => can === idCancion);
    playLists[idPlayList].idCanciones.splice(indiceCan, 1);
  }

  for(cancion of canciones){
    playLists[idPlayList].idCanciones.forEach((valor, indice) => { 
      if (cancion.id === valor) {
            let contMenu = document.createElement("div");
            contMenu.innerHTML = `
            <div class="contenido-menuPrincipal">
            <button type="button" onClick=reproducirCancion(${cancion.id})><img src="./assets/logo.png" alt="Reproducir Canción" class="imagenListas"></button>
            <button type="button" onClick=eliminarListaPropia(${idPlayList},${cancion.id})><img src="./assets/delete.png" alt="Eliminar Canción" class="" width="36px"></button>
            <p class="parrafo-playList">${cancion.nombre} </p>    
            </div>`;
          contenidoSecundario.append(contMenu);
      }
    });
  }
}



const verPlayListsPropiasUsuario = () => {
  limpiaDOM();
  const titulo = document.querySelector('.titulo');
  titulo.innerHTML = "Mis Play Lists";

  let contenedor = document.querySelector(".menu-principal");
  contenedor.innerHTML="";

  const objUsuario = JSON.parse(localStorage.getItem('usuarios'));

    for(playList of playLists){
      if (playList.idusuario === objUsuario.id) {
        let cancionNombre = ' - ';
        let contMenu = document.createElement("div");
        playList.idCanciones = [...new Set( playList.idCanciones)];  
        playList.idCanciones.forEach((valor, indice) => {
          for(cancion of canciones){
            if (valor === cancion.id) {
              if (indice <= 4) {
                cancionNombre += cancion.nombre + ' - ';
                break;
              }
            }
          }       
        });
        contMenu.innerHTML = `
        <div class="contenido-menuPrincipal">
          <button onclick=mostrarCancionesPlayList(${playList.id}) type="button" class="imgBoton-${playList.id}"><img src="${playList.img}" alt="${playList.img}" class="imagenListas"></button>
          <h3 class="titulo-plyList">${playList.nombre}</h3>
          <p class="parrafo-playList"> ${cancionNombre}</p>
        </div>`;
  
        contenedor.append(contMenu);
      }
    }
}
