function renderizarProductos() {

    fetch(`./main.json`)
        .then((res) => res.json())
        .then((data) => {
            let contenido = "";
            for (let producto of data) {
                contenido += `<div class="col-md-4 text-center py-3">
            <div class="card border-0 fondo shadow-lg p-3 rounded">
            <img src="IMAGES/${producto.imagen}" class="card-img-top " alt="${producto.nombre}">
            <div class="card-body ">
                <h5 class="card-title"><strong>${producto.nombre}</strong></h5>
                <p class="card-text">${producto.subnombre}</p>
                <p class="card-text"><b>$${producto.precio}</b></p>
                <p class="card-text"><a href="#" class="btn btncolor text-white shadow-lg" title="Agregar al carrito" onclick="AgregarCarro(${producto.id})"><b>AGREGAR</b></a></p>
            </div>
            </div>
            </div>`;
            }
            document.getElementById("productos").innerHTML = contenido;
        });
}




renderizarProductos();