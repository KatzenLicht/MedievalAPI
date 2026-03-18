const plantilla_tarjeta = document.querySelector(".ContenedorItem");
const ColeccionItems = document.querySelector("#ColeccionItems");
const PantallaAgregarItem = document.querySelector(".PantallaAgregarItem");

plantilla_tarjeta.remove();

fetch("http://localhost:3000").then(recurso => recurso.json()).then(datos => {
    console.log(datos);

    for (i = 0; i < datos.arreglo.length; i++){
        const clon = plantilla_tarjeta.cloneNode(true);
        ColeccionItems.appendChild(clon);

        const Titulo = clon.querySelector(".Titulo");
        Titulo.innerHTML = datos.arreglo[i].titulo;

        const Descripcion = clon.querySelector(".Descripcion");
        Descripcion.innerHTML = datos.arreglo[i].descripcion;
        
        const Imagen = clon.querySelector(".Imagen");
        Imagen.style.backgroundImage = "url(" + datos.arreglo[i].imagen + ")";

        const Icono_Borrar = clon.querySelector(".Icono_Borrar");
        Icono_Borrar.tag = i;
        Icono_Borrar.addEventListener("click", (evento) => {
            evento.currentTarget
            const objeto_borrar = {
                indice: evento.currentTarget.tag
            }
            
            fetch("http://localhost:3000", {
                method: "DELETE",
                body: JSON.stringify(objeto_borrar)
            }).then(recurso => recurso.json()).then(respuesta => {
                alert(respuesta.mensaje);
                window.location.reload();
            })
        });
        const PanelCreacionItem = clon.querySelector(".PanelCreacionItem")

        const CrearItem_InputTitulo = PanelCreacionItem.querySelector(".CrearItem_InputTitulo");
        const input_descripcion = PanelCreacionItem.querySelector("textarea");
        const ImagenPreview = PanelCreacionItem.querySelector(".ImagenPreview");

        const Icono_Editar = clon.querySelector(".Icono_editar");
        Icono_Editar.addEventoListener("click", function(){
            PanelCreacionItem.style.display = "flex";
            CrearItem_InputTitulo.value = Titulo.innerHTML;
            input_descripcion.value = Descripcion.innerHTML;
            ImagenPreview.src = Imagen.style.backgroundImage.split('""')[1];
        });

        const input_imagen = PanelCreacionItem.querySelector(".input_imagen");
        input_imagen.addEventListener("change", () => {
        const reader = new FileReader();
        reader.readAsDataURL(input_imagen.files[0]);
            reader.onload = () => {
                ImagenPreview.src = reader.result;
            }
        });
        const boton_guardar = PanelCreacionItem.querySelector(".boton_guardar");
        boton_guardar.addEventListener("click", function {
        const objeto_info_tarjeta_modificada = {
            titulo: CrearItem_InputTitulo.value,
            descripcion: input_descripcion.value,
            imagen: ImagenPreview.src
        }
        
        fetch("http://localhost:3000", {
            method: "PUT",
            body: JSON.stringify(objeto_info_tarjeta_modificada);
        }).then(recurso => recurso.json()).then (respuesta => {
            alert(respuesta.mensaje);
            window.location.reload();
        })
    });
    ColeccionItems.appendChild(PantallaAgregarItem);
});

PantallaAgregarItem.addEventListener("click", () => {
    const clon = plantilla_tarjeta.cloneNode(true);
    ColeccionItems.appendChild(clon);
    ColeccionItems.appendChild(PantallaAgregarItem);

    const PanelCreacionItem = clon.querySelector(".PanelCreacionItem");
    PanelCreacionItem.style.display = "flex";

    const CrearItem_InputTitulo = PanelCreacionItem.querySelector(".CrearItem_InputTitulo");

    const input_descripcion = PanelCreacionItem.querySelector("textarea");

    const input_imagen = PanelCreacionItem.querySelector(".input_imagen");
    const ImagenPreview = PanelCreacionItem.querySelector(".ImagenPreview");

    input_imagen.addEventListener("change", () => {
        const reader = new FileReader();
        reader.readAsDataURL(input_imagen.files[0]);
        reader.onload = () => {
            ImagenPreview.src = reader.result;
        }
    });

    const boton_guardar = clon.querySelector(".boton_guardar");
    boton_guardar.addEventListener("click", () => {
        const objeto_info_nueva_tarjeta = {
            titulo: CrearItem_InputTitulo.value,
            descripcion: input_descripcion.value,
            imagen: ImagenPreview.src
        }
        console.log(objeto_info_nueva_tarjeta);

        fetch("http://localhost:3000", {
            method: "POST",
            body: JSON.stringify(objeto_info_nueva_tarjeta)
        }).then(recurso => recurso.json()).then(respuesta => {
            alert(respuesta.mensaje);
            window.location.reload();
        });
    });

    const boton_cancelar = clon.querySelector(".boton_cancelar");
    boton_cancelar.addEventListener("click", () => {
        clon.remove();
    });
});