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
let sweet
let btnForm
let formArt
let cuentasUser
let btnSwal

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
    btnSwal = document.getElementById("btnSwal")

}

function initEvents() {
    formLogin.onsubmit = (event) => validLog(event)
    formNew.onsubmit = (event) => validNew(event)
    btnForm.onclick = mostrarForm
    btnSwal.onclick = alertLogin

}

function mostrarForm() {
    btnForm.style.display = "none"
    formNew.style.display = "block"
}

function alertLogin(icono, mensaje) {
    const cartel = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    cartel.fire({
        icon: `${icono}`,
        title: `${mensaje}`,
        background: "#171717",
        color: '#0b8062',
    })
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
        alertLogin("error", "E-mail o usuario registrado, intente con otro")
    } else {
        let nuevoUser = new Login(user, pass, nombre, apellido, edad, mail)

        cuentas.push(nuevoUser)
        formNew.reset()
        updateUser()

        alertLogin("success", "Cuenta creada")
    }
}

function validLog(event) {
    event.preventDefault()
    let user = outUser.value
    let pass = outPass.value

    const valUser = cuentas.some((cuentas) => cuentas.user === user)
    const valPass = cuentas.some((cuentas) => cuentas.pass === pass)

    if (valUser && valPass) {
        alertLogin("info", "Usuario correcto")
        const cartel = document.createElement("div")
        cartel.className = "alert"
        cartel.innerHTML = `<h3>Bienvenido ${user}</h3>`
        cartelLog.append(cartel)
        cuentasUser.style.display = "none"
        formPer.style.display = "block"
    } else {
        alertLogin("error", "Datos incorrectos")
    }
}


function getUser() {
    let userJSON = localStorage.getItem("usuarios")
    if (userJSON) {
        cuentas = JSON.parse(userJSON)
    }
}

function updateUser() {
    let userJSON = JSON.stringify(cuentas)
    localStorage.setItem("usuarios", userJSON)
}

function main() {
    initElements()
    initEvents()
    getUser()
}

main()