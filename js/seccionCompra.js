let compraProductos = [
        {
            id: 1,
            nombre:"hamburguesa bomber",
            precio:950,
            img:"/css/imagenes/bomber.jpg"
        },
        {
            id: 2,
            nombre:"hamburguesa triple",
            precio:900,
            img:"/css/imagenes/triple.jpg"
        },
        {
            id: 3,
            nombre:"hamburguesa ultraCheddar",
            precio:890,
            img:"/css/imagenes/ultraCheddar.jpg"
        },
        {
            id: 4,
            nombre:"hamburguesa a la beicon",
            precio:850,
            img:"/css/imagenes/hamburguesaALaBeicon.jpg"
        },
        {
            id: 5,
            nombre:"hamburguesa Picante",
            precio:800,
            img:"/css/imagenes/picante.jpg"
        },
        {
            id: 6,
            nombre:"hamburguesa de pollo",
            precio:790,
            img:"/css/imagenes/dePollo.jpg"
        },
        {
            id: 7,
            nombre:"dona burger",
            precio:500,
            img:"/css/imagenes/dinaBurger.jpg"
        },
        {
            id: 8,
            nombre:"black burger",
            precio:700,
            img:"/css/imagenes/blackBurgers.jpg"
        },
        {
            id: 9,
            nombre:"red burger",
            precio:650,
            img:"/css/imagenes/redBurger.jpg"
        },
]

const listadoCarrito = document.querySelector(".carrito");
const contenedorHamburguesa = document.querySelector(".contenedorHamburguesa");

let carritoLista = [];

// Comienzo

// eventos
document.addEventListener('DOMContentLoaded',()=>{
    fetchData();
    if(localStorage.getItem("carritoLista")){
        carritoLista = JSON.parse(localStorage.getItem("carritoLista"))
        mostrarCarro(carritoLista)    
    }
})
const fetchData = async () =>{
    try{
        const res = await fetch("../js/api.json");
        const data = await res.json();
        mostrarProducto(data);
    } catch(error){
        console.log("error");
    }
}


function mostrarProducto(data){
    
    compraProductos.forEach(producto => {
        const contDivCard = document.createElement("div");
        contDivCard.className ="card-body hamburguesaReseña";
        contDivCard.setAttribute("id",producto.id)


        const imagenComida = document.createElement("img");
        imagenComida.src = producto.img;
        imagenComida.className = "card-img-top imagen1";
        imagenComida.onclick = () =>{
            Swal.fire({
                title:producto.nombre,
                text:"hamburguesa...",
                imageUrl: producto.img,
                imageWidth:400,
                confirmButtonText:"Close",

            })
        }

        const tituloProducto = document.createElement("h4");
        tituloProducto.textContent = producto.nombre;
        tituloProducto.classList.add("titulo-comida");

        const precioProducto = document.createElement("p");
        precioProducto.textContent = `$${producto.precio}`;
        precioProducto.classList.add("precio-producto");

        const btnComprar = document.createElement("button");
        btnComprar.textContent = "Comprar";
        btnComprar.className = "btn btn-primary";
        btnComprar.onclick = () =>{
            agregarCarrito(producto.id);
            Toastify({
                text:`${producto.nombre} agregado correctamente`,
                className:"info",
                duration:2000,
                gravity:"bottom",
            }).showToast();
        }


        // se agrega la imagen,nombre,precio y boton al div card
        contDivCard.appendChild(imagenComida);
        contDivCard.appendChild(tituloProducto);
        contDivCard.appendChild(precioProducto);
        contDivCard.appendChild(btnComprar);

        // se agrega la div card al div col
        // contDivCol1A.appendChild(contDivCard);

        // se agrega la div col al div row
        // contDivRow1.appendChild(contDivCol1A);

        contenedorHamburguesa.appendChild(contDivCard);

        console.log(producto);
        
    })
}


function agregarCarrito(id){
    // A continuacion se se busca el id del producto qye fue seleccionado y se guarda en el array
    const productoAgregado = compraProductos.find(product => product.id === id);
    carritoLista.push(productoAgregado);


    // guardando en el storage
    guardarlocalStorage(carritoLista);

    limpiarHTML();

    mostrarCarro(carritoLista);

    

}

function mostrarCarro(carritoLista){
    carritoLista.forEach(productoAgregado =>{
        listadoCarrito.innerHTML +=`
            <div class="card">
                <h4 class="titulo-comida">${productoAgregado.nombre}</h4>
            </div>
            <div class="card">
                <p class="precio-producto">$${productoAgregado.precio}</p>
            </div>`
            
    })
}


function guardarlocalStorage(lista){
    localStorage.setItem("carritoLista",JSON.stringify(lista));
}

function limpiarHTML(){
    while(listadoCarrito.firstChild){
        listadoCarrito.removeChild(listadoCarrito.firstChild);
    }
}



