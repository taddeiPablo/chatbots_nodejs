'use strict';

/**
 * COMO CONSTRUIR UN BOT CON NODEJS
 * EJEMPLOS EN CONSOLA
 **/

// utilizacion del package de botbuilder para construir un bot
var builder = require('botbuilder');
// inicio del bot con esta linea el bot escucha al usuario (canal)
var connector = new builder.ConsoleConnector().listen();
// construccion del bot
var bot = new builder.UniversalBot(connector);

// EJEMPLOS SIMPLES SIN CONCATENACION DE FUNCIONES

/*dialogo PRIMER EJEMPLO*/
bot.dialog('/', [
    function (session) {
        session.send("Hola Mundo !");
    }
]);

/*dialog SEGUNDO EJEMPLO*/
bot.dialog('/', [
    function (session) {
        let msj = session.message.text;
        session.send('Me dijiste :' + msj);
    }
]);

// ############################################

// EJEMPLO CON CONCATENACION DE FUNCIONES

bot.dialog('/', [
    function (session) {
        // aqui el bot pregunta el nombre del usuario y queda a la espera de una respuesta
        // para poder mostrar el proximo mensaje
        builder.Prompts.text(session, "como te llamas ?");
    },
    function (session, results) {
        let msj = results.response;
        session.send("Hola !! " + msj);
    }
]);