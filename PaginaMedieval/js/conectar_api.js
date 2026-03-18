const tarjeta = document.querySelector(".ContenedorItem");
tarjeta.remove();
 
const ColeccionItems= document.querySelector("#ColeccionItems");
const pantallaAgregarItem = document.querySelector(".PantallaAgregarItem");
 
 
fetch("http://localhost:3000").then(recurso => recurso.json())
.then(datos => {
   
    console.log(datos);
 
    for(i=0; i<datos.arreglo.length; i++){
        const clon = tarjeta.cloneNode(true);
        ColeccionItems.appendChild(clon);
 
       
        const titulo = clon.querySelector(".Titulo");
        titulo.innerHTML = datos.arreglo[i].titulo;
 
        const descripcion = clon.querySelector(".Descripcion");
        descripcion.innerHTML = datos.arreglo[i].descripcion;
 
        const imagen = clon.querySelector(".Imagen");
        imagen.style.backgroundImage = "url('" + datos.arreglo[i].imagen + "')";
 
        const Icono_Borrar = clon.querySelector(".Icono_Borrar");
        Icono_Borrar.tag = i;
        Icono_Borrar.addEventListener("click", (evento)=>{
           
            const objeto_borrar = {
                indice: evento.currentTarget.tag
            }
 
            fetch("http://localhost:3000/", {
                method: "DELETE",
                body: JSON.stringify(objeto_borrar)
            })
            .then(recurso => recurso.json())
            .then(respuesta => {
                alert(respuesta.mensaje);
                window.location.reload();
            });
        });
 
        const PanelCreacionItem = clon.querySelector(".PanelCreacionItem");
        const Icono_Editar = clon.querySelector(".Icono_Editar");
        Icono_Editar.tag = i;
        indice = i;
 
        const CrearItem_InputTitulo = PanelCreacionItem.querySelector(".CrearItem_InputTitulo");
        const input_descripcion = PanelCreacionItem.querySelector("textarea");
        const input_imagen = PanelCreacionItem.querySelector(".input_imagen");
        const ImagenPreview = PanelCreacionItem.querySelector(".ImagenPreview");
 
        Icono_Editar.addEventListener("click", (evento)=>{
            PanelCreacionItem.style.display = "flex";
           
            CrearItem_InputTitulo.value = datos.arreglo[evento.currentTarget.tag].titulo;
            input_descripcion.value = datos.arreglo[evento.currentTarget.tag].descripcion;
            input_imagen.value = "";
            ImagenPreview.src = datos.arreglo[evento.currentTarget.tag].imagen;
 
            const boton_cancelar = clon.querySelector(".boton_cancelar");
            boton_cancelar.addEventListener("click", ()=>{
                PanelCreacionItem.style.display = "none";
            });
 
            const boton_guardar = clon.querySelector(".boton_guardar");
            boton_guardar.addEventListener("click", ()=>{
                const objeto_info_tarjeta_modificada = {
                    indice: indice,
                    titulo: CrearItem_InputTitulo.value,
                    descripcion: input_descripcion.value,
                    imagen: ImagenPreview.src
                }
 
                fetch("http://localhost:3000/", {
                    method: "PUT",
                    body: JSON.stringify(objeto_info_tarjeta_modificada)
                }).then(recurso => recurso.json())
                .then(respuesta => {
                    alert(respuesta.mensaje);
                    window.location.reload();
                });
            });
 
            input_imagen.addEventListener("change", ()=>{
            const reader = new FileReader();
            reader.readAsDataURL(input_imagen.files[0]);
            reader.onload = ()=>{
            ImagenPreview.src = reader.result;
                }
 
            });
        });
 
    }
    ColeccionItems.appendChild(pantallaAgregarItem);
});
 
pantallaAgregarItem.addEventListener("click", ()=>{
   
    const clon = tarjeta.cloneNode(true);
    ColeccionItems.appendChild(clon);
 
    ColeccionItems.appendChild(pantallaAgregarItem);
 
    const PanelCreacionItem = clon.querySelector(".PanelCreacionItem");
    PanelCreacionItem.style.display = "flex";
 
    //referencias de input
    const CrearItem_InputTitulo = PanelCreacionItem.querySelector(".CrearItem_InputTitulo");
    const input_descripcion = PanelCreacionItem.querySelector("textarea");
    const input_imagen = PanelCreacionItem.querySelector(".input_imagen");
    const ImagenPreview = PanelCreacionItem.querySelector(".ImagenPreview");
 
    input_imagen.addEventListener("change", ()=>{
        const reader = new FileReader();
        reader.readAsDataURL(input_imagen.files[0]);
        reader.onload = ()=>{
            ImagenPreview.src = reader.result;
        }
    });
 
    const boton_guardar = clon.querySelector(".boton_guardar");
    boton_guardar.addEventListener("click", ()=>{
        const objeto_info_nueva_tarjeta = {
            titulo: CrearItem_InputTitulo.value,
            descripcion: input_descripcion.value,
            imagen: ImagenPreview.src
        };
        fetch("http://localhost:3000/", {
            method: "POST",
            body: JSON.stringify(objeto_info_nueva_tarjeta)
        }).then(recurso => recurso.json())
        .then(respuesta => {
            alert(respuesta.mensaje);
            window.location.reload();
        });
    });
    const boton_cancelar = clon.querySelector(".boton_cancelar");
    boton_cancelar.addEventListener("click", ()=>{
        clon.remove();
    });
 
});