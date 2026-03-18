const http = require("node:http");
const puerto = 3000;
const fs = require("node:fs");

var tarjetas;
fs.readFile("./json/tarjetas.json", (err, archivo) => {
    if(!err) {
        tarjetas = JSON.parse(archivo.toString());
    }
});

const server = http.createServer((request, response) => {

    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

    switch (request.method){
        case "GET":
            response.statusCode = 200;
            response.setHeader("Content-Type", "application/json");
            response.end(JSON.stringify(tarjetas));
        break;
        case "POST":
            var informacion = "";
            request.on("data", chunk => {
                informacion += chunk;
            });
            request.on("end", () => {
                const objeto_nueva_tarjeta = JSON.parse(informacion.toString());
                tarjetas.arreglo.push(objeto_nueva_tarjeta);

                fs.writeFile("./json/tarjetas.json", JSON.stringify(tarjetas), err => {
                    if(!err) {
                        response.statusCode = 201;
                        response.setHeader("Content-Type", "application/json");
                        const objeto_respuesta = {
                            mensaje: "Item guardado satisfactoriamente"
                        }
                        response.end(JSON.stringify(objeto_respuesta));
                    }
                });


            })
        break;
        case "PUT":
            var informacion = "";
            request.on("data", chunk => {
                informacion += chunk;
            });

            request.on("end", () => {
                const objeto_tarjeta_modificada = JSON.parse(informacion);
                
                const objeto_modificado = {
                    titulo: objeto_tarjeta_modificada.titulo,
                    descripcion: objeto_tarjeta_modificada.descripcion,
                    imagen: objeto_tarjeta_modificada.imagen
                }

                tarjetas.arreglo[objeto_tarjeta_modificada.indice] = objeto_modificado;

                fs.writeFile("./json/tarjetas.json", JSON.stringify(tarjetas), err => {
                    if(!err) {
                        response.statusCode = 200;
                        response.setHeader("Content-Type", "application/json");
                        const objeto_respuesta = {
                            mensaje: "Elemento modificado correctamente"
                        }
                        response.end(JSON.stringify(objeto_respuesta));
                    }
                });
            });

        break;
        case "DELETE":
            request.on("data", info => {
                const objeto_borrar = JSON.parse(info);
                tarjetas.arreglo.splice(objeto_borrar.indice, 1);

                fs.writeFile("./json/tarjetas.json", JSON.stringify(tarjetas), err => {
                    if(!err) {
                        response.statusCode = 200;
                        response.setHeader("Content-Type", "application/json");
                        const objeto_respuesta = {
                            mensaje: "Elemento borrado correctamente"
                        }
                        response.end(JSON.stringify(objeto_respuesta));
                    }
                });
            });

        break;
        case "OPTIONS":
            response.writeHead(204);
            response.end();
        break;
    }




});

server.listen(3000, () => {
    console.log("Servidor a la escucha en http://localhost:" + puerto);
});