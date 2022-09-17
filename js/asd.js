let cuentas = []
let formLogin
let formNew
let inUser
let inPass
let inNombre
let inApellido
let inEdad
let inMail
let cartelLog

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
    inPass = document.getElementById('inPass')
    inNombre = document.getElementById('inNombre')
    inApellido = document.getElementById('inApellido')
    inEdad = document.getElementById('inEdad')
    inMail = document.getElementById('inMail')
    cartelLog = document.getElementById('cartelLog')
}

function initEvents() {
    formLogin.onsubmit = (event) => validLog(event)
    formNew.onsubmit = (event) => validNew(event)
}


function validNew(event) {
    event.preventDefault()
    let user = inUser.value
    let pass = inPass.value
    let nombre = inNombre.value
    let apellido = inApellido.value
    let edad = parseInt(inEdad.value)
    let mail = inMail.value

    const valMail = cuentas.some((cuentas) => cuentas.mail === mail)
    if (valMail) {
        let cartel = document.createElement("div")
        cartel.className = "alert"
        cartel.innerHTML = "<h3> E-mail ya registrado, intente con otro </h3>"
        cartelLog.append(cartel)
        setTimeout(function () {
            cartel.style.display = "none"
        }, 2000)
    } else {
        let nuevoUser = new Login(user, pass, nombre, apellido, edad, mail)

        cuentas.push(nuevoUser)
        formNew.reset()

        let cartel = document.createElement("div")
        cartel.className = "alert"
        cartel.innerHTML = "<h3> Cuenta creada </h3>"
        cartelLog.append(cartel)
        setTimeout(function () {
            cartel.style.display = "none"
        }, 2000)


    }
}

function validLog(event) {
    event.preventDefault()
    let user = inUser.value
    let pass = inPass.value

    const valUser = cuentas.some((cuentas) => cuentas.user === user)
    const valPass = cuentas.some((cuentas) => cuentas.pass === pass)
    if (valUser && valPass) {
        let cartel = document.createElement("div")
        cartel.className = "alert"
        cartel.innerHTML = `<h3> Bienvenido ${cuentas.user} </h3>`
        cartelLog.append(cartel)
        setTimeout(function () {
            cartel.style.display = "none"
        }, 2000)
    } else {
        let cartel = document.createElement("div")
        cartel.className = "alert"
        cartel.innerHTML = `<h3> Datos incorrectos </h3>`
        cartelLog.append(cartel)
        setTimeout(function () {
            cartel.style.display = "none"
        }, 2000)
    }
}


function main() {
    initElements()
    initEvents()
}

main()