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

/*bot.dialog('/', [
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
]);*/

/* NUEVO EJEMPLO DE COMO ALMACENAR DATOS DEL USUARIO 
bot.dialog('/', [
    function (session, results, next) {
        if (!session.userData.nombre) {
            builder.Prompts.text(session, 'Como te llamas ?');
        } else {
            next();
        }
    },
    function (session, results) {
        if (results.response) {
            let msj = results.response;
            session.userData.nombre = msj;
        }
        session.send('Hola ' + session.userData.nombre);
    }
]);*/

/* NUEVO EJEMPLO CON PROMPTS (para pedirle datos al usuario
bot.dialog('/', [
    function (session, results, next) {
        builder.Prompts.text(session, 'Como te llamas ?');
    },
    function (session, results) {
        session.dialogData.nombre = results.response;
        builder.Prompts.number(session, 'Ok, ' + session.dialogData.nombre + 'Cual es tu edad :');
    },
    function (session, results) {
        session.dialogData.edad = results.response;
        builder.Prompts.time(session, 'que hora es ?');
    }
]);*/

/* EJEMPLOS DE PROMPTS 
// dialogos con patron de cascada
bot.dialog('/', [
    function (session, results, next) {
        builder.Prompts.text(session, 'Como te llamas ?');
    },
    function (session, results) {
        session.dialogData.nombre = results.response;
        builder.Prompts.number(session, 'Ok ' + session.dialogData.nombre + 'Cual es tu edad ?');
    },
    function (session, results) {
        session.dialogData.edad = results.response;
        builder.Prompts.time(session, 'Que Hora es ?');
    },
    function (session, results) {
        session.dialogData.hora = builder.EntityRecognizer.resolveTime([results.response]);
        builder.Prompts.choice(session, 'Cual prefieres ?', 'MAR|MONTAÑA');
    },
    function (session, results) {
        session.dialogData.preferencia = results.response.entity;
        builder.Prompts.confirm(session, 'quieres ver un resumen');
    },
    function (session, results) {
        if (results.response) {
            session.endDialog('Me contaste que tu nombre es' + session.dialogData.nombre + 'Tienes' + session.dialogData.edad);
        } else {
            session.endDialog('ADIOS !!');
        }
    }
]);*/

/* EJEMPLO CON CARDS Y CAROUSEL
// cards
bot.dialog('/', [
    function (session) {
        var heroCard = new builder.HeroCard(session)
            .title('Esta es una tarjeta de tipo Hero Card')
            .subtitle('Este es su correspondente subtítulo')
            .text('Sigan a Marcelo Felman en Twitter: @mfelman')
            .images([
                builder.CardImage.create(session, 'https://sec.ch9.ms/ch9/7ff5/e07cfef0-aa3b-40bb-9baa-7c9ef8ff7ff5/buildreactionbotframework_960.jpg')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'https://docs.botframework.com/en-us/', 'Aprende')
            ])
        // Adjuntamos la tarjeta al mensaje
        var msj = new builder.Message(session).addAttachment(heroCard);
        session.send(msj);
    }
]);*/

/* EJEMPLO CON CAROUSEL
// carousel
bot.dialog('/', [
    function (session) {
        var heroCard1 = new builder.HeroCard(session)
            .title('Esta es una tarjeta de tipo Hero Card')
            .subtitle('Este es su correspondente subtítulo')
            .text('Sigan a Marcelo Felman en Twitter: @mfelman')
            .images([
                builder.CardImage.create(session, 'https://sec.ch9.ms/ch9/7ff5/e07cfef0-aa3b-40bb-9baa-7c9ef8ff7ff5/buildreactionbotframework_960.jpg')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'https://docs.botframework.com/en-us/', 'Aprende')
            ]);
        var heroCard2 = new builder.HeroCard(session)
            .title('Esta es una OTRA de tipo Hero Card')
            .subtitle('Este es su correspondente subtítulo')
            .text('Sigan (si no lo hicieron) a Marcelo Felman en Twitter: @mfelman')
            .images([
                builder.CardImage.create(session, 'https://sec.ch9.ms/ch9/7ff5/e07cfef0-aa3b-40bb-9baa-7c9ef8ff7ff5/buildreactionbotframework_960.jpg')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'https://docs.botframework.com/en-us/', 'Aprende')
            ]);
        // Creamos un array de tarjetas
        var tarjetas = [heroCard1, heroCard2];

        // Adjuntamos la tarjeta al mensaje
        var msj = new builder.Message(session).attachmentLayout(builder.AttachmentLayout.carousel).attachments(tarjetas);
        session.send(msj);
    }
]);*/



