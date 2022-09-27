let personajes = []
let formPer
let formPjs
let inPj
let inRaza
let inDes
let inImg
let verPjs
let cartelPj
let minis
let tarjeta
let bgg

class Personaje {
    constructor(pj, raza, des, img) {
        this.pj = pj
        this.raza = raza.toUpperCase()
        this.des = des
        this.img = img
    }
}

function initElementos() {
    formPer = document.getElementById("formPer")
    formPjs = document.getElementById("formPjs")
    inPj = document.getElementById("inPj")
    inRaza = document.getElementById("inRaza")
    inDes = document.getElementById("inDes")
    inImg = document.getElementById("inImg")
    verPjs = document.getElementById("verPjs")
    cartelPj = document.getElementById("cartelPj")
    minis = document.getElementById("minis")
    tarjeta = document.getElementById("tarjeta")
}

function initEventos() {
    formPjs.onsubmit = (event) => validPjs(event)
}

function validPjs(event) {
    event.preventDefault()
    let pj = inPj.value
    let raza = inRaza.value
    let des = inDes.value
    let imgPj = inImg.value
    let img

    if (imgPj == 1) {
        img = "https://github.com/FerKovalink/d-d/blob/master/img/pjs/dm2.png?raw=true"
        bgg = 1
    } else if (imgPj == 2) {
        img = "https://github.com/FerKovalink/d-d/blob/master/img/pjs/chulen2.png?raw=true"
        bgg = 2
    } else if (imgPj == 3) {
        img = "https://github.com/FerKovalink/d-d/blob/master/img/pjs/pants2.png?raw=true"
        bgg = 3
    } else if (imgPj == 4) {
        img = "https://github.com/FerKovalink/d-d/blob/master/img/pjs/talon2.png?raw=true"
        bgg = 4
    } else if (imgPj == 5) {
        img = "https://github.com/FerKovalink/d-d/blob/master/img/pjs/drak2.png?raw=true"
        bgg = 5
    }

    const valPj = personajes.some((personaje) => personaje.pj === pj)

    if (personajes.length > 7) {
        cartelPjs("Solo puedes crear hasta 8 personajes")
    } else {
        if (!valPj) {
            let nuevoPj = new Personaje(pj, raza, des, img)

            mostrarPjs(nuevoPj)
            personajes.push(nuevoPj)
            formPjs.reset()
            updatePjs()
            verMinis()

        } else {
            cartelPjs("El nombre ya esta en uso, elije otro")
        }
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

function mostrarPjs(personaje) {

    verPjs.innerHTML = ""
    verPjs.style.margin = '60px'
    const card = document.createElement("div")
    card.id = `card-${personaje.pj}`
    card.innerHTML = `
            <div class="product-card">
            <div class="product-image">
                <img src=${personaje.img}>
            </div>
            <div class="product-details">
                <h2>${personaje.pj}</h2>    
                <h3>${personaje.raza}</h3>
                <p>${personaje.des}</p>
            </div>`
    verPjs.append(card)
}

function verMinis() {
    minis.style.padding = '10px'
    minis.innerHTML = ""
    personajes.forEach((personaje) => {
        let minisCreadas = document.createElement("div")
        minisCreadas.className = "contenedor"
        minisCreadas.id = `minisCreadas-${personaje.pj}`
        minisCreadas.innerHTML = `
            <div id="tarjeta">
                <div class="imgBx">
                    <img src="${personaje.img}">
                </div>
                <div class="pj">
                    <h2>${personaje.pj}</h2>
                    <div class="raza">
                        <h3>${personaje.raza}</h3>
                    </div>
                    <div class="descript">
                        <h3>${personaje.des}</h3>
                    </div>
                    <button class="btn btn-primary" id="btnDel-${personaje.pj}">Eliminar</button>
                    <button class="btn btn-primary" id="">Comprar</button>
                </div>
            </div>`
        
        minis.append(minisCreadas)

        let btnDel = document.getElementById(`minisCreadas-${personaje.pj}`)
        btnDel.onclick = () => delPj(personaje.pj)
        
        // bg = document.querySelector(`#minisCreadas-${personaje.pj} #tarjeta`)
        bg = document.getElementById(`minisCreadas-${personaje.pj}`)
        if (bgg == 1) {
            bg.style.backgroundImage = "url('https://github.com/FerKovalink/d-d/blob/master/img/minis/dm.jpg?raw=true')"
        } else if (bgg == 2) {
            bg.style.backgroundImage = "url('https://github.com/FerKovalink/d-d/blob/master/img/minis/enanoo.jpg?raw=true')"
        } else if (bgg == 3) {
            bg.style.backgroundImage = "url('https://github.com/FerKovalink/d-d/blob/master/img/minis/mago.png?raw=true')"
        } else if (bgg == 4) {
            bg.style.backgroundImage = "url('https://github.com/FerKovalink/d-d/blob/master/img/minis/humano.jpg?raw=true')"
        } else if (bgg == 5) {
            bg.style.backgroundImage = "url('https://github.com/FerKovalink/d-d/blob/master/img/minis/dragon4.png?raw=true')"
        }

    })

}

function delPj(pj) {
    let borrarPj = document.getElementById(`card-${pj}`)
    let indexPj = personajes.findIndex((personaje) => personaje.pj === pj)

    personajes.splice(indexPj, 1)
    borrarPj.remove()
    updatePjs()
    verMinis()
}

function updatePjs() {
    let pjJSON = JSON.stringify(personajes)
    sessionStorage.setItem("personajes", pjJSON)
}

function getPjs() {
    let pjJSON = sessionStorage.getItem("personajes")
    if (pjJSON) {
        personajes.JSON.parse(pjJSON)
        verMinis()
    }
}

function delAll() {
    sessionStorage.clear()
    personajes = []
    verMinis()
}

function main() {
    initElementos()
    initEventos()
    getPjs()
}

main()