function ConfigurarDescripciones(){
    const cajas_descripciones = document.querySelectorAll(".Descripcion");

    for(i = 0; i < cajas_descripciones.length; i++){
        
        cajas_descripciones[i].addEventListener("mouseover", function(evento){
            evento.currentTarget.style.bottom = "0px";
        });

        cajas_descripciones[i].addEventListener("mouseleave", function(evento){
            evento.currentTarget.style.bottom = (-evento.currentTarget.offsetHeight + 60) + "px";
        });
    }
}