let carros = [];
let compras = [];
const myToast = new bootstrap.Toast(document.getElementById('liveToast'));

let carro = {
    modelo: '',
    marca: '',
    cilindraje: '',
    imagen: '',
    precio: 0,
};

let cajita = document.getElementById('numero');

function registro() {
    agregarcarro();
    limpiar();
}

function comprasvehiculo(pos) {
    compras.push(carros[pos]);
    let carrito = document.getElementById('carrito');
    carrito.innerText = compras.length;
    document.getElementById('mensajetoast').innerText = "Compra realizada con éxito ...";
    myToast.show();
    console.log(compras);
}

function agregarcarro() {
    carro.modelo = document.getElementById('modelo').value;
    carro.marca = document.getElementById('marca').value;
    carro.cilindraje = document.getElementById('cilindraje').value;
    carro.imagen = document.getElementById('imagen').value;
    carro.precio = parseInt(document.getElementById('precio').value);
    carros.push({ ...carro });

    document.getElementById('mensajetoast').innerText = "Registro guardado con éxito ...";
    myToast.show();
}

function limpiar() {
    let marca = document.getElementById('marca');
    marca.value = '';
    document.getElementById('modelo').value = '';
    document.getElementById('cilindraje').value = 0;
    document.getElementById('imagen').value = '';
    document.getElementById('precio').value = 0;
    marca.focus();
}

function visualizarcatalogo() {
    let tarjetas = `<div class="row">`;
    for (let pos in carros) {
        let data = carros[pos];
        tarjetas += `<div class="col-3">
                        <div class="card" style="width: 18rem;">
                            <img src=${data.imagen} class="card-img-top imagen" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${data.marca}</h5>
                                <p><span>Modelo : ${data.modelo}</span>
                                <span>Cilindraje : ${data.cilindraje}</span>
                                <span>Precio : ${data.precio}</span>
                                </p>
                                <button onclick="comprasvehiculo(${pos})" class="btn btn-primary">Comprar</button>
                            </div>
                        </div>
                    </div>`;
    }
    tarjetas += `</div>`;
    document.getElementById('catalogo').innerHTML = tarjetas;
}


function mostrarCarrito() {
    let carritoContenido = `<div class="container"><div class="row">`;
    let total = 0;

    // Itera sobre los carros en el carrito de compras
    compras.forEach((item, index) => {
        // Si el objeto no tiene la propiedad "cantidad", inicialízala en 1
        if (!item.cantidad) {
            item.cantidad = 1;
        }

        // Calcula el subtotal para este vehículo en función de la cantidad
        let subtotal = item.precio * item.cantidad;
        total += subtotal;

        carritoContenido += `
            <div class="col-12 mb-3">
                <div class="d-flex align-items-center">
                    <img src="${item.imagen}" class="imagen me-3" alt="Car Image">
                    <div>
                        <p><strong>Marca:</strong> ${item.marca}</p>
                        <p><strong>Modelo:</strong> ${item.modelo}</p>
                        <p><strong>Cilindraje:</strong> ${item.cilindraje}</p>
                        <p><strong>Precio:</strong> $${item.precio}</p>
                        <p><strong>Subtotal:</strong> $${subtotal}</p>
                        <div class="d-flex align-items-center">
                            <button onclick="cambiarCantidad(${index}, -1)" class="btn btn-secondary btn-sm me-2">-</button>
                            <span>${item.cantidad}</span>
                            <button onclick="cambiarCantidad(${index}, 1)" class="btn btn-secondary btn-sm ms-2">+</button>
                        </div>
                    </div>
                </div>
            </div>`;
    });

    carritoContenido += `
        </div>
        <hr>
        <h4 class="text-end">Total: $${total}</h4>
    </div>`;

    // Inserta el contenido en la ventana modal de factura
    document.querySelector('#factura .modal-body').innerHTML = carritoContenido;
}

// Función para cambiar la cantidad de un vehículo en el carrito
function cambiarCantidad(index, delta) {
    if (compras[index].cantidad + delta > 0) {  // Evita que la cantidad sea menor que 1
        compras[index].cantidad += delta;
        mostrarCarrito();  // Actualiza la vista del carrito
    }
}



