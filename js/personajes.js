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

class Personaje {
    constructor(pj, raza, des, img, cardBg) {
        this.pj = pj
        this.raza = raza
        this.des = des
        this.img = img
        this.cardBg = cardBg
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
    let pj = inPj.value.toUpperCase()
    let raza = inRaza.value.toUpperCase()
    let des = inDes.value
    let imgPj = inImg.value
    let img
    let cardBg

    if (imgPj == 1) {
        img = "https://github.com/FerKovalink/d-d/blob/master/img/pjs/dm2.png?raw=true"
        cardBg = "url('https://github.com/FerKovalink/d-d/blob/master/img/minis/dm.jpg?raw=true')"
    } else if (imgPj == 2) {
        img = "https://github.com/FerKovalink/d-d/blob/master/img/pjs/chulen2.png?raw=true"
        cardBg = "url('https://github.com/FerKovalink/d-d/blob/master/img/minis/enanoo.jpg?raw=true')"
    } else if (imgPj == 3) {
        img = "https://github.com/FerKovalink/d-d/blob/master/img/pjs/pants2.png?raw=true"
        cardBg = "url('https://github.com/FerKovalink/d-d/blob/master/img/minis/mago.png?raw=true')"
    } else if (imgPj == 4) {
        img = "https://github.com/FerKovalink/d-d/blob/master/img/pjs/talon2.png?raw=true"
        cardBg = "url('https://github.com/FerKovalink/d-d/blob/master/img/minis/humano.jpg?raw=true')"
    } else if (imgPj == 5) {
        img = "https://github.com/FerKovalink/d-d/blob/master/img/pjs/drak2.png?raw=true"
        cardBg = "url('https://github.com/FerKovalink/d-d/blob/master/img/minis/dragon4.png?raw=true')"
    }

    const valPj = personajes.some((personaje) => personaje.pj === pj)

    if (personajes.length > 9) {
        cartelPjs("Solo puedes crear 10 personajes")
    } else {
        if (!valPj) {
            let nuevoPj = new Personaje(pj, raza, des, img, cardBg)

            mostrarPjs(nuevoPj)
            personajes.push(nuevoPj)
            formPjs.reset()
            updatePjs()
            minis.style.display = "flex"
            verMinis()

        } else {
            cartelPjs("El nombre ya esta en uso, elije otro")
        }
    }
}


function deleteAlert(personaje) {
    Swal.fire({
        title: `Enviar a ${personaje} al otro mundo?`,
        width: 500,
        imageUrl: 'https://github.com/FerKovalink/dnd/blob/master/img/gif/tumblr_ebd549ae8102ec54e43474ce460d8b3d_8f3b0911_640.gif?raw=true',
        imageWidth: 500,
        imageHeight: 300,
        color: '#0b8062',
        background: "#171717",
        backdrop: `
            rgba(0,0,0,0.5)
            `,
        showCancelButton: true,
        confirmButtonText: "Al inframundo",
        cancelButtonText: "Dado de Salvacion",
        customClass: {
            confirmButton: 'btn btn-primary',
            denyButton: 'btn btn-primary',
            cancelButton: 'btn btn-primary',
          }
    }).then((result) => {
        if (result.isConfirmed) {
            deletePj(personaje)
        }
    })
}

function cartelPjs(mensaje) {
    const cartel = document.createElement("div")
    cartel.className = "alert"
    cartel.innerHTML = `<h3>${mensaje}</h3>`
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
    minis.style.padding = '60px'
    minis.innerHTML = ""
    personajes.forEach((personaje) => {
        let minisCreadas = document.createElement("div")
        minisCreadas.className = "contenedor"
        minisCreadas.id = `minisCreadas-${personaje.pj}`
        minisCreadas.innerHTML = `
            <div class="tarjeta">
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
                    <button class="btn btn-primary" id="btnDelete-${personaje.pj}">Borrar</button>
                </div>
            </div>`
        minisCreadas.style.backgroundImage = `${personaje.cardBg}`

        minis.append(minisCreadas)

        let btnDelete = document.getElementById(`minisCreadas-${personaje.pj}`)
        btnDelete.onclick = () => deleteAlert(personaje.pj)
    })
}

function deletePj(pj) {
    let borrarPj = document.getElementById(`minisCreadas-${pj}`)
    let indexPj = personajes.findIndex((personaje) => personaje.pj === pj)

    personajes.splice(indexPj, 1)
    borrarPj.remove()
    updatePjs()
    verMinis()
}

function getPjs() {
    let pjJSON = sessionStorage.getItem("personajes")
    if (pjJSON) {
        personajes = JSON.parse(pjJSON)
        verMinis()
    }
}

function updatePjs() {
    let pjJSON = JSON.stringify(personajes)
    sessionStorage.setItem("personajes", pjJSON)

}

async function getJson() {
    try {
        const response = await fetch("./personajes.json")
        const pjs = await response.json()
        console.log(pjs)
        personajes = [...pjs]
        verMinis()
    } catch (error) {
        console.log(error)
    }
}

// async function getServer() {
//     try {
//         const response = await fetch("https://6340e131d1fcddf69cbef0fd.mockapi.io/api/personajes")
//         const pjs = await response.json()
//         // console.log(pjs)
//         personajes = [...pjs]

//         verMinis()
//     } catch (error) {
//         console.log(error)
//     }
// }

// async function postServer(personaje) {
//     try {
//         const response = await fetch("https://6340e131d1fcddf69cbef0fd.mockapi.io/api/personajes", {
//             method: "POST",
//             body: JSON.stringify(personaje),
//         })
//         console.log(response)
//         // personajes.push(pjVer())
//         personajes.push(personaje)
//         formPjs.reset()

//         verMinis()
//         minis.style.display = "flex"
//         // cartel
//     } catch (error) {
//         console.log(error)
//     }
// }

function main() {
    initElementos()
    initEventos()
    // getServer()
    getJson()
    getPjs()
}

main()