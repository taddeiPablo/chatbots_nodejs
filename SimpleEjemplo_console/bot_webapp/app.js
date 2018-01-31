'use strict';

var restify = require('restify');
var builder = require('botbuilder');

// armando el server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// credenciales para conectar los canales
var connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

/* mismo codigo utilizado para la app de consola la usamos en la app web
   ---- primer ejemplo de como crear un dialog simple
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
]);*/

// SEGUNDO EJEMPLO DIALOGOS
/*bot.dialog('/', [
    function (session) {
        session.beginDialog('/preguntarLugar');
    }
]);

bot.dialog('/preguntarLugar', [
    function (session) {
        builder.Prompts.text(session, 'Donde estas ?');
    },
    function (session, results) {
        let lugar = results.response;
        session.endDialog('Saludos por :' + lugar);
    },
    function (session, results) {
        session.endDialogWithResult(results);
    }
]);*/

/* SEGUNDO EJEMPLO CON BEGINDIALOG
bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, 'Hola como te llamas');
    },
    function (session, results) {
        let msj = results.response;
        session.send('Hola !! ' + msj);

        session.beginDialog('/preguntarLugar');
    }
]);

bot.dialog('/preguntarLugar', [
    function (session) {
        builder.Prompts.text(session, 'De donde sos ?');
    },
    function (session, results) {
        let msj = results.response;
        session.endDialog('Saludos por :' + msj);
    }
]);*/

bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, 'Como te llamas ?');
    },
    function (session, results) {
        let msj = results.response;
        session.send('Hola ' + msj + '!!');

        session.beginDialog('/preguntarLugar');
    },
    function (session, results) {
        session.send('saludos por ' + results.response);
    }
]);

bot.dialog('/preguntarLugar', [
    function (session) {
        builder.Prompts.text(session, 'De donde sos ??');
    },
    function (session, results) {
        session.endDialogWithResult(results);
    }
]);

