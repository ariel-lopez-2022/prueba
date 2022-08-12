function btnCarritoRefresh() {
    let productos = LSrecibirCarro();
    let contenido = `<button type="button" class="btn position-relative">
    <a href="carrito.html"><img src="./IMAGES/trolley-cart.png"  class="bg-danger rounded-circle bg-opacity-25 border border-danger" width="45"></a>
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" >0
    <span class="visually-hidden">unread messages</span>
    </span>
    </button>`;
    let total = 0;
    if (productos.length > 0) {
        for (let producto of productos) {
            total += producto.cantidad;

        }
        contenido = `<button type="button" class="btn position-relative onclick =" >
        <a href="carrito.html"><img src=" ./IMAGES/trolley-cart.png"  class="bg-danger rounded-circle bg-opacity-25 border border-danger" width="45"></a>
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" >${total}
        <span class="visually-hidden">unread messages</span>
        </span>
        </button>`;
    }
    document.getElementById("BotonCarro").innerHTML = contenido;
}

function SearchProducto(id) {
    let productos = LSrecibirProductos();
    return productos.find(x => x.id == id);

}

function mensaje() {
    Swal.fire({
        icon: 'success',
        title: "Agregaste este producto, con exito",
        showConfirmButton: false,
        timer: 1500
    })
}

function AgregarCarro(id) {
    let productos_carro = LSrecibirCarro();
    fetch(`../main.json`)
    .then ((res)=> res.json())
    .then((data)=>{
       let producto = data.find(elemento => elemento.id == id);
       producto.cantidad = 1;
       let encontrado = productos_carro.findIndex(elemento => elemento.id == data.id);
          if (encontrado === -1){
            productos_carro.push(producto);
           mensaje();
            LSguardarCarro(productos_carro);
            btnCarritoRefresh();
       }else {
            productos_carro[encontrado].cantidad++;
             mensaje()
            LSguardarCarro(productos_carro);
            btnCarritoRefresh();

          }
     
      });

}










function vaciarCarrito() {
    Swal.fire({
        icon: 'warning',
        title: 'Estas seguro que quieras vaciar todo el carrito?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Si, estoy seguro',
        denyButtonText: `No estoy seguro`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('El carrito ha sido vaciado', '', 'success')
            localStorage.removeItem("carrito");
            renderizarProductosCarro();
            btnCarritoRefresh();
        } else if (result.isDenied) {
            Swal.fire('Cambios conservados', '', 'info')
        }
    })

}
btnCarritoRefresh();