let cuentas = []
let formLogin
let formNew
let inUser
let outUser
let inPass
let outPass
let inNombre
let inApellido
let inEdad
let inMail
let cartelLog
let btnForm
let formArt
let cuentasUser

class Login {
    constructor(user, pass, nombre, apellido, edad, mail) {
        this.user = user.toLowerCase()
        this.pass = pass
        this.nombre = nombre.toLowerCase()
        this.apellido = apellido.toLowerCase()
        this.edad = edad
        this.mail = mail
    }
}

function initElements() {
    formLogin = document.getElementById('formLogin')
    formNew = document.getElementById('formNew')
    inUser = document.getElementById('inUser')
    outUser = document.getElementById('outUser')
    inPass = document.getElementById('inPass')
    outPass = document.getElementById('outPass')
    inNombre = document.getElementById('inNombre')
    inApellido = document.getElementById('inApellido')
    inEdad = document.getElementById('inEdad')
    inMail = document.getElementById('inMail')
    cartelLog = document.getElementById('cartelLog')
    btnForm = document.getElementById('btnForm')
    formArt = document.getElementById('formArt')
    cuentasUser = document.getElementById('cuentasUser')
}

function initEvents() {
    formLogin.onsubmit = (event) => validLog(event)
    formNew.onsubmit = (event) => validNew(event)
    btnForm.onclick = mostrarForm
   
}

function mostrarForm() {
    btnForm.style.display = "none"
    formNew.style.display = "block"
}

function cartel(mensaje) {
    const cartel = document.createElement("div")
    cartel.className = "alert"
    cartel.innerHTML = `<h3> ${mensaje} </h3>`
    cartelLog.append(cartel)
    setTimeout(function () {
        cartel.style.display = "none"
    }, 2000)
}

function validNew(event) {
    event.preventDefault()
    let user = inUser.value
    let pass = inPass.value
    let nombre = inNombre.value
    let apellido = inApellido.value
    let edad = parseInt(inEdad.value)
    let mail = inMail.value

    const valUser = cuentas.some((cuenta) => cuenta.user === user)
    const valMail = cuentas.some((cuenta) => cuenta.mail === mail)
    if (valMail || valUser) {
        cartel("E-mail o usuario registrado, intente con otro")
    } else {
        let nuevoUser = new Login(user, pass, nombre, apellido, edad, mail)

        cuentas.push(nuevoUser)
        formNew.reset()
        updateUser()

        cartel("Cuenta creada")
    }
}

function validLog(event) {
    event.preventDefault()
    let user = outUser.value
    let pass = outPass.value

    const valUser = cuentas.some((cuentas) => cuentas.user === user)
    const valPass = cuentas.some((cuentas) => cuentas.pass === pass)

    if (valUser && valPass) {
        const cartel = document.createElement("div")
        cartel.className = "alert"
        cartel.innerHTML = `<h3>Bienvenido ${user} </h3>`
        cartelLog.append(cartel)
        cuentasUser.style.display = "none"
        formArt.style.display = "block"
    } else {
        cartel("Datos incorrectos")
    }
}

function updateUser(){
    let userJSON = JSON.stringify(cuentas)
    sessionStorage.setItem("usuarios", userJSON)
}

function getUser(){
    let userJSON = sessionStorage.getItem("usuarios")
    if (userJSON){
        cuentas = JSON.parse(userJSON)
    }
}



let productos = []
let formulario
let inputId
let inputNombre
let inputPrecioCompra
let inputPrecioVenta
let inputCantidad
let contenedorProductos

class Producto {
  constructor(id, nombre, precioCompra, precioVenta, cantidad) {
    this.id = id
    this.nombre = nombre.toUpperCase()
    this.precioCompra = precioCompra
    this.precioVenta = precioVenta
    this.cantidad = cantidad
  }
  calcularPrecioCompra = () => this.precioCompra * this.cantidad
  calcularPrecioVenta = () => this.precioVenta * this.cantidad
}

function inicializarElementos() {
  formulario = document.getElementById("formulario")
  inputId = document.getElementById("inputId")
  inputNombre = document.getElementById("inputNombreProducto")
  inputPrecioCompra = document.getElementById("inputPrecioCompra")
  inputPrecioVenta = document.getElementById("inputPrecioVenta")
  inputCantidad = document.getElementById("inputCantidad")
  contenedorProductos = document.getElementById("contenedorProductos")
}

function inicializarEventos() {
  formulario.onsubmit = (event) => validarFormulario(event)
}

function validarFormulario(event) {
  event.preventDefault()
  let idProducto = inputId.value
  let nombre = inputNombre.value
  let precioCompra = parseFloat(inputPrecioCompra.value)
  let precioVenta = parseFloat(inputPrecioVenta.value)
  let cantidad = parseInt(inputCantidad.value)

  const idExiste = productos.some((producto) => producto.id === idProducto)
  if (!idExiste) {
    let producto = new Producto(
      idProducto,
      nombre,
      precioCompra,
      precioVenta,
      cantidad
    )

    productos.push(producto)
    formulario.reset()
    actualizarProductos()
    pintarProductos()

  } else {
    alert("El id ya existe")
  }
}

function eliminarProducto(idProducto) {
  let columnaBorrar = document.getElementById(`columna-${idProducto}`)
  let indiceBorrar = productos.findIndex(
    (producto) => Number(producto.id) === Number(idProducto)
  )
  productos.splice(indiceBorrar, 1)
  columnaBorrar.remove()
  actualizarProductos()
}

function pintarProductos() {
  contenedorProductos.innerHTML = ""
  productos.forEach((producto) => {
    let column = document.createElement("div")
    column.className = "col-md-4 mt-3"
    column.id = `columna-${producto.id}`
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
            </div>`

    contenedorProductos.append(column)

    let botonEliminar = document.getElementById(`botonEliminar-${producto.id}`)
    botonEliminar.onclick = () => eliminarProducto(producto.id)
  })
}

function actualizarProductos(){
    let productosJSON = JSON.stringify(productos)
    localStorage.setItem("productos", productosJSON)
}

function obtenerProductos(){
    let productosJSON = localStorage.getItem("productos")
    if (productosJSON){
        productos = JSON.parse(productosJSON)
        pintarProductos()
    }
}

function delAll(){
    localStorage.clear()
    productos = []
    pintarProductos()

}



function main() {
    inicializarElementos()
    inicializarEventos()
    initElements()
    initEvents()
    getUser()
    obtenerProductos()
}

main()