let inventario = []
let formStock
let inId = 0
let inNombre
let inCantidad
let inPrecio
let inImg
let seeStock

class Stock {
    constructor(id, nombre, cantidad, precio) {
        this.id = id
        this.nombre = nombre
        this.cantidad = cantidad
        this.precio = precio
        this.img = img
    }
    precioMas = (precio) => (this.precio += precio)
    precioMenos = (precio) => (this.precio -= precio)
    stockMas = (cantidad) => (this.cantidad += cantidad)
    stockMenos = (cantidad) => (this.cantidad -= cantidad)
}

function initElements() {
    formStock = document.getElementById('formStock')
    inId = document.getElementById('inId')
    inNombre = document.getElementById('inNombre')
    inCantidad = document.getElementById('inCantidad')
    inPrecio = document.getElementById('inPrecio')
    inImg = document.getElementById('inImg')
    seeStock = document.getElementById("seeStock")
}

function initEvents() {
    formStock.onsubmit = (event) => validStock(event)
}

function cartel(mensaje){
    const cartel = document.createElement("div")
        cartel.className = "alert"
        cartel.innerHTML = `<h3> ${mensaje} </h3>`
        cartelLog.append(cartel)
        setTimeout(function () {
            cartel.style.display = "none"
        }, 2000)
 }

 function idMas(id) {
    let id = inventario.length
    id++

    return id
}

function validStock(event) {
    event.preventDefault()
    let id = idMas(id)
    let nombre = inNombre.value
    let cantidad = parseInt(inCantidad.value)
    let precio = parseFloat(inPrecio.value)
    let img = inImg.value

    const matchId = inventario.some((articulo) => articulo.id === id)
    const matchNombre = inventario.some((articulo) => articulo.nombre === nombre)

    if (matchNombre) {
        cartel("Articulo ya registrado")
    } else {
        let nuevoArt = new Stock(id, nombre, cantidad, precio)
        inventario.push(nuevoArt)
        formStock.reset()

        cartel("Producto agregado")
    }
}

function eliminarProducto(idProducto) {
    let columnaBorrar = document.getElementById(`columna-${idProducto}`);
    let indiceBorrar = productos.findIndex(
      (producto) => Number(producto.id) === Number(idProducto)
    );
  
    productos.splice(indiceBorrar, 1);
    columnaBorrar.remove();
  }

  function pintarProductos() {
    contenedorProductos.innerHTML = "";
    productos.forEach((producto) => {
      let column = document.createElement("div");
      column.className = "col-md-4 mt-3";
      column.id = `columna-${producto.id}`;
      column.innerHTML = `
              <div class="card">
                  <div class="card-body">
                  <p class="card-text">ID:
                      <b>${producto.id}</b>
                  </p>
                  <p class="card-text">Nombre:
                      <b>${producto.nombre}</b>
                  </p>
                  <p class="card-text">Precio compra:
                      <b>${producto.precioCompra}</b>
                  </p>
                  <p class="card-text">Precio venta:
                      <b>${producto.precioVenta}</b>
                  </p>
                  <p class="card-text">Cantidad:
                      <b>${producto.cantidad}</b>
                  </p>
                  </div>
                  <div class="card-footer">
                      <button class="btn btn-danger" id="botonEliminar-${producto.id}" >Eliminar</button>
                  </div>
              </div>`;
  
      contenedorProductos.append(column);
  
      let botonEliminar = document.getElementById(`botonEliminar-${producto.id}`);
      botonEliminar.onclick = () => eliminarProducto(producto.id);
    });
  }
  



