let opUser
let cuenta = []
let inventario = []
let nArt

// let cuenta = [
//     {
//         user: "admin",
//         pass: "admin"
//     }
// ]

// let inventario = [
//     {
//         id: 1,
//         nombre: "cel",
//         cantidad: 20,
//         precio: 100
//     },
//     {
//         id: 2,
//         nombre: "tablet",
//         cantidad: 50,
//         precio: 350
//     },
//     {
//         id: 3,
//         nombre: "smart",
//         cantidad: 30,
//         precio: 675
//     },
// ]

// LOGIN
class Cuentas {
    constructor(user, pass) {
        this.user = user
        this.pass = pass
    }
}

function crearUser() {
    let user = prompt("Ingrese su nuevo usuario")
    let pass = prompt("Ingrese su nueva contraseña")
    let nuevoUser

    if (user !== "") {
        if (pass == "") {
            alert("Ingrese una contraseña valida")
        } else {
            alert("Usuario creado")
            nuevoUser = new Cuentas(user, pass)
        }
    } else {
        alert("Ingrese un usuario valido")
    }

    return nuevoUser
}

function login() {
    let opcion = prompt("Ingrese su usuario")

    for (let users of cuenta) {
        if (opcion != users.user) {
            alert("Usuario incorrecto")
        } else {
            opcion = prompt(`Bienvenido ${users.user} \nIngrese su contraseña`)
            if (opcion != users.pass) {
                alert("Contraseña incorrecta")
            } else {
                alert(`Acceso permitido`)
                opUser = stock()
            }
        }
    }
    return opcion
}

function menuLog() {
    const op = parseInt(prompt("Ingrese una opcion \n1. Ingresar \n2. Registrate \n3. Salir"))
    return op
}

function menu() {
    opselec = menuLog()

    while (opselec != 3) {
        switch (opselec) {
            case 1:
                opselec = login()
                break

            case 2:
                opUser = crearUser()
                opselec = cuenta.push(opUser)
                break

            default:
                alert("Ingrese una opcion valida")
                break
        }

        opselec = menuLog()
    }
}

// STOCK
class Stock {
    constructor(id, nombre, cantidad, precio) {
        this.id = id
        this.nombre = nombre.toLocaleLowerCase()
        this.cantidad = cantidad
        this.precio = precio
    }

    precioMas = (precio) => (this.precio += precio)
    precioMenos = (precio) => (this.precio -= precio)
    stockMas = (cantidad) => (this.cantidad += cantidad)
    stockMenos = (cantidad) => (this.cantidad -= cantidad)


}

function leerStock(objeto) {
    let texto = ""
    for (const clave in objeto) {
        if (typeof objeto[clave] !== "function")
            texto += clave + " : " + objeto[clave] + "\n"
    }
    return texto
}

function buscarArt() {
    opcion = buscarObj()

    for (let inv of inventario) {
        if (opcion === inv.id) {

            let art = parseInt(prompt(`Selecciono ${opcion} \n 1. Aumentar Stock \n 2. Disminuir stock \n 3. Aumentar precio \n 4. Disminuir precio \n 5. Ver info del articulo \n 6. Volver al menu`))

            switch (art) {
                case 1:
                    const aumStock = parseInt(prompt("Ingrese la cantidad de productos a incorporar"))
                    inv.stockMas(aumStock)
                    alert(`Aumento en ${aumStock} la cantidad total de ${inv.nombre}`)
                    break

                case 2:
                    const disStock = parseInt(prompt("Ingrese la cantidad de productos a eliminar"))
                    inv.stockMenos(disStock)
                    alert(`Se eliminaron ${disStock} productos de ${inv.nombre}`)
                    break

                case 3:
                    const aumPrecio = parseInt(prompt("Ingrese el monto que desea "))
                    inv.stockMas(aumPrecio)
                    alert(`Se eliminaron ${aumPrecio} productos de ${inv.nombre}`)
                    break

                case 4:
                    const disPrecio = parseInt(prompt("Ingrese el monto que desea disminuir"))
                    inv.stockMas(disPrecio)
                    alert(`Se eliminaron ${disPrecio} productos de ${inv.nombre}`)
                    break

                case 5:
                    const leerInfo = leerStock(inv)
                    alert(leerInfo)
                    break

                case 6:
                    nArt = opcion
                    break

                default:
                    alert("ingrese una opcion valida")

            }
        } else {
            alert("Ingrese un articulo correcto")
        }
        opcion = buscarObj()
    }
    return opcion
}

function buscarObj() {
    let listado = []
    let opcion

    for (let inv of inventario) {
        let list = `\n${inv.id}. ${inv.nombre}`
        listado.push(list)
    }

    if (inventario.length < 1) {
        alert("Sin stock")
    } else {
        opcion = parseInt(prompt(`Ingrese el ID del producto ${listado}`))
    }

    return opcion
}


function crearArt() {
    let id = parseInt(prompt("Ingrese el ID del producto"))
    let nombre = prompt("Ingrese el nombre del nuevo producto")
    let cantidad = parseInt(prompt("Cuantos productos desea agregar?"))
    let precio = parseFloat(prompt("Ingrese el precio del producto"))

    let nuevoArt = new Stock(id, nombre, cantidad, precio)
    return nuevoArt
}


function menuStock() {
    let opp = prompt("---------------- Administrador de Stock ---------------- \n♦ Ingrese una opcion, Exit para salir \n1. Agregar nuevo producto \n2. Inventario de Stock ")
    return opp
}

function stock() {
    let opselec = menuStock()
    while (opselec.toLowerCase() != "exit") {
        if (opselec != "") {
            opselec = parseInt(opselec)
            if (!isNaN(opselec)) {

                switch (opselec) {
                    case 1:
                        nArt = crearArt()
                        inventario.push(nArt)
                        break

                    case 2:
                        opselec = buscarArt()
                        break
                }

            } else {
                alert("Ingrese una opcion valida")
            }
        } else {
            alert("Seleccione una opcion")
        }
        opselec = menuStock()
    }
}



function main() {
    menu()
}

main()