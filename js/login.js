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
let nuevo

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
    nuevo = document.getElementById('nuevo')
}

function initEvents() {
    formLogin.onsubmit = (event) => validLog(event)
    formNew.onsubmit = (event) => validNew(event)
    //nuevo.onclick = (event) => mostrarRegistro(event)
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

function mostrarStock(){

}

function mostrarRegistro(){
    
    registro.onclick = () => {
        const registro = document.createElement("div")
        registro.className = "alert"
        registro.innerHTML = `<h3> ${mensaje} </h3>`
        cartelLog.append(cartel)
        
        cartel.style.display = "none"
       
    }
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
        mostrarStock()
    } else {
        cartel("Datos incorrectos")
    }    
}

function main() {
    initElements()
    initEvents()
}

main()