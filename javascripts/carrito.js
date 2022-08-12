function renderizarProductosCarro() {

    let productos = LSrecibirCarro();
    let contenido = `<p class="text-center  alert alert-danger border border-danger" role="alert"">Ups! No se encontraron productos en el carrito!</p>`


    if (productos.length > 0) {
        contenido = `
        <h1 class="text-center pt-2 pb-4"><b>Carrito de Compras:</b></h1>
        <p class="text-end" id="vaciarcarrito"> 
    <a href="#" class="btn btn-danger bg-danger text-white bg-opacity-50  rounded" onclick="vaciarCarrito()" title="Vaciar Carrito"><b>Vaciar Carrito</b></a></p>
    <table class="Table text-center">`;
        let total = 0;



        for (let producto of productos) {
            let precio = producto.cantidad * producto.precio;
            contenido += `<tr>
        <td class="text-end">
        <img src="IMAGES/${producto.imagen}" alt="${producto.nombre}" class="bg-danger p-1 text-dark bg-opacity-10 rounded" width="100"></td>
        <td class="text-center px-2"><b>${producto.nombre}. x ${producto.cantidad}</b></td>
        <td class="text-end"><b>$${precio}</b></td>
        <td class="text-center bg-opacity-10">
        <a href="#" class="btn btn-danger bg-danger  text-white bg-opacity-50 rounded" onclick="EliminarCarro(${producto.id})">
        <img src="IMAGES/recycle-bin.png" width="24"><b>Quitar Producto</b></a></td></tr>`

            total += precio;
        }
        contenido += `<tr>
        <td>&nbsp,</td>
        <td class="text-end"><b>TOTAL A PAGAR</b></td>
        <td class="text-end"><b>$${total}</b></td></tr>`

        contenido += `</table>`;

    }
    document.getElementById("productosCarro").innerHTML = contenido;
}



btnCarritoRefresh();
renderizarProductosCarro();


function LSrecibirCarro() {
    return JSON.parse(localStorage.getItem("carrito")) || [];

}

function LSguardarCarro(productos) {
    localStorage.setItem("carrito", JSON.stringify(productos));

}

function EliminarCarro(id) {
    let productos_carro = LSrecibirCarro();
    let pos = productos_carro.findIndex(x => x.id == id);
    productos_carro[pos].cantidad -= 1;
    Swal.fire({
        icon: 'info',
        title: "Has quitado un producto del carrito!",
        showConfirmButton: false,
        timer: 1500
    })


    if (productos_carro[pos].cantidad == 0) {
        productos_carro.splice(pos, 1);

    }

    LSguardarCarro(productos_carro);
    renderizarProductosCarro();
    btnCarritoRefresh();


}