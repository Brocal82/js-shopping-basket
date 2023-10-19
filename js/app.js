//Variables 

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito = []; // Este es el arreglo donde se iran agregando los cursos presionados

// Funcion para registrar todos los Eventlistener

cargarEventListeners(); //llamamos funcion
function cargarEventListeners() {
  listaCursos.addEventListener('click', agregarCurso) //Cuando agregas un curso presionando "Agregar al Carrito"

  carrito.addEventListener('click', eliminaCurso) //Elimina cursos del Carrito presionando "X"

  vaciarCarritoBtn.addEventListener('click', () => { //Vaciar el Carrito presionando "vaciar carrito"
    articulosCarrito = []; //resetea el arreglo

    limpiarHTML(); //Eliminamos todo el HTML

  }) 

}

//Funciones

function agregarCurso(e) {

  e.preventDefault(); //Hace que no se suba la pagina cada vez que haces click en "Agregar al carrito"

  if(e.target.classList.contains('agregar-carrito')) {

    const cursoSeleccionado = e.target.parentElement.parentElement;

    leerDatosCurso(cursoSeleccionado);
  
  }

}

//Elimina un curso del Carrito al pulsar la X
function eliminaCurso(e) {
  if(e.target.classList.contains('borrar-curso')) {
    const cursoId = e.target.getAttribute('data-id');

    //Elimina del arreglo de articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId );

    carritoHTML(); //Itera sobre el carrito y muestra su HTML

  }
}


//Lee el contenido del HTML al que le dimos click y extrae la informacion del curso:
function leerDatosCurso(curso) {
  console.log(curso);

  //Creamos objeto con el contenido del curso actual:
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  }

  //Revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);  
  if(existe) {
    //actualizamos la cantidad
    const cursos = articulosCarrito.map(curso => {
      if( curso.id === infoCurso.id ) {
        curso.cantidad++;
        return curso; //retorna el objeto actualizado

      } else {
        return curso; // retorna los objetos que no son los duplicados
      }
    });
    articulosCarrito = [...cursos];

  } else {
    //Agregar elementos al arreglos del carrito:
    articulosCarrito = [...articulosCarrito, infoCurso];
  
    }


  

  console.log(articulosCarrito);

  carritoHTML();

}

//Muestra el Carrito de compras en el HTML
function carritoHTML() {

  //Limpia el HTML
  limpiarHTML();



  //Recorre el carrito y genera el HTML
  articulosCarrito.forEach( curso => {
    const {imagen, titulo, precio, cantidad, id} = curso;
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
      <img src="${imagen}" width="100">
    </td>
    <td>
      ${titulo}
    </td>
    <td>
      ${precio}
    </td>
    <td>
      ${cantidad}
    </td>
    <td>
      <a href='#' class="borrar-curso" data-id="${id}"> X </a>
    </td>    
    `;

    //Agrega el HTMl del carrito en el tbody
    contenedorCarrito.appendChild(row);

  })

}

//Elimina los cursos del tbody
function limpiarHTML() {
  //Forma Lenta
  // contenedorCarrito.innerHTML = '';


  //Esta forma es mas rapida que limpiar con .innerHTML
  while(contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
  }

}



