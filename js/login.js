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
let registro

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
    registro = document.getElementById('registro')
}

function initEvents() {
    formLogin.onsubmit = (event) => validLog(event)
    formNew.onsubmit = (event) => validNew(event)
    
}

function mostrarForm() {
    
    const formulario = document.createElement("div")
    formulario.class = "formulario"
    formulario.innerHTML = `<form id="formNew">
    <div class="mb-4">
        <label class="form-label">Usuario</label>
        <input type="text" class="form-control" id="inUser" required minlength="3"/>
    </div>

    <div class="mb-4">
        <label class="form-label">Contraseña</label>
        <input type="password" class="form-control" id="inPass" required minlength="3"/>
    </div>

    <div class="mb-4">
        <label class="form-label">Nombre</label>
        <input type="text" class="form-control" id="inNombre" required minlength="3"/>
    </div>

    <div class="mb-4">
        <label class="form-label">Apellido</label>
        <input type="text" class="form-control" id="inApellido" required minlength="3"/>
    </div>

    <div class="mb-4">
        <label class="form-label">Edad</label>
        <input type="number" class="form-control" id="inEdad" />
    </div>

    <div class="mb-4">
        <label class="form-label">E-mail</label>
        <input type="email" class="form-control" id="inMail" />
    </div>

    <div class="mb-4">
        <button type="submit" class="btn btn-primary">Registrarme</button>
        

    </div>
</form>`

    registro.append(formulario)
    btnForm.style.display = "none"
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
        cartel(`Bienvenido ${user}`)
    } else {
        cartel("Datos incorrectos")
    }
}

function main() {
    initElements()
    initEvents()
}

main()