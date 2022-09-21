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
        formPer.style.display = "block"
    } else {
        cartel("Datos incorrectos")
    }
}

function updateUser() {
    let userJSON = JSON.stringify(cuentas)
    sessionStorage.setItem("usuarios", userJSON)
}

function getUser() {
    let userJSON = sessionStorage.getItem("usuarios")
    if (userJSON) {
        cuentas = JSON.parse(userJSON)
    }
}


let personajes = []
let formPer
let formPjs
let inPj
let inRaza
let inDes
let inImg
let verPjs
let cartelPj

class Personaje{
    constructor(pj, raza, des, img){
        this.pj = pj
        this.raza = raza
        this.des = des
        this.img = img
    }
}

function iniciarElementos(){
    formPer = document.getElementById("formPer")
    formPjs = document.getElementById("formPjs")
    inPj = document.getElementById("inPj")
    inRaza = document.getElementById("inRaza")
    inDes = document.getElementById("inDes")
    inImg = document.getElementById("inImg")
    verPjs = document.getElementById("verPjs")
    cartelPj = document.getElementById("cartelPj")
}

function iniciarEventos(){
    formPjs.onsubmit = (event) => validPjs(event)
}



function validPjs(event){
    event.preventDefault()
    let pj = inPj.value
    let raza = inRaza.value
    let des = inDes.value
    let img = inImg.value

    const valPj = personajes.some((personaje) => personaje.pj === pj)

    if(!valPj){
        let nuevoPj = new Personaje(pj, raza, des, img)

        personajes.push(nuevoPj)
        formPjs.reset()
        // updatePjs()
        mostrarPjs()

    } else {
        cartelPjs("El nombre ya esta en uso, elije otro")
    }

}

function cartelPjs(mensaje) {
    const cartel = document.createElement("div")
    cartel.className = "alert"
    cartel.innerHTML = `<h3> ${mensaje} </h3>`
    cartelPj.append(cartel)
    setTimeout(function () {
        cartel.style.display = "none"
    }, 2000)
}

function delPj(personaje){
    let borrarPj = document.createElementById(`card-${personaje}`)
    let indexPj = personajes.findIndex((personaje) => personaje.pj === personaje)

    personajes.splice(indexPj, 1)
    borrarPj.remove()
    // updatePjs()
}

function mostrarPjs(){
   
    personajes.forEach((personaje) => {
        let card = document.createElement("div")
        card.className = "product-card"
        card.id = `card-${personaje.pj}`
        card.innerHTML = `
                <div class="product-image">
                  <img src="${personaje.img}">
                </div>
                <div class="product-details">
                  <h2>${personaje.pj}</h2>
                  <h3>${personaje.raza}</h3>
                  <p>${personaje.des}</p>
                </div>`
        verPjs.append(card)

        // let btnDel = document.getElementsById(`btnDel-${personaje.pj}`)
        // btnDel.onclick = () => delPj(personaje.pj)
    } )
}

// function updatePjs(){
//     let pjJSON= JSON.stringify(personajes)
//     localStorage.setItem("personajes", pjJSON)
// }

// function getPjs(){
//     let pjJSON= localStorage.getItem("personajes")
//     if(pjJSON){
//         personajes.JSON.parse(pjJSON)
//         mostrarPjs()
//     }
// }

function delAll(){
    localStorage.clear()
    personajes = []
    mostrarPjs()
}



function main() {
    initElements()
    initEvents()
    getUser()

    iniciarElementos()
    iniciarEventos()
    // getPjs()
}

main()