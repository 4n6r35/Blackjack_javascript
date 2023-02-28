const app = require('express')()
const express = require('express');
const http = require("http").Server(app);
const io = require('socket.io')(http);
const path = require('path');
const { getRoomUsers, userJoin, userLeaves } = require('./utils/users');
let rooms = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K']

const routes = ['/', '/juego', '/multijugador', '/multijugador/juego', '/multijugador/game']

app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/', function (req, res) {
    try {
        res.sendFile(path.join(process.cwd(), 'public/index.html'))
    } catch (error) {
        next(error)
    }
});

app.get('/juego', function (req, res) {
    try {
        res.sendFile(path.join(process.cwd(), 'public/views/juego.html'))
    } catch (error) {
        next(error)
    }
});

app.get('/multijugador', function (req, res) {
    try {
        res.sendFile(path.join(process.cwd(), 'public/views/multiplayer.html'))
    } catch (error) {
        next(error)
    }
});

app.get('/multijugador/juego', function (req, res) {
    try {
        res.sendFile(path.join(process.cwd(), 'public/views/multiplayer_game.html'))
    } catch (error) {
        next(error)
    }
});

app.get('/multijugador/game', function (req, res) {
    try {
        res.sendFile(path.join(process.cwd(), 'public/views/game.html'))
    } catch (error) {
        next(error)
    }
});


app.use((req, res, next) => {
    try {
        if (!routes.includes(req.path)) throw Error('No se encontro')

        return next()
    } catch (error) {
        res.sendFile(path.join(process.cwd(), 'public/views/notfound.html'))
    }
})

http.listen(process.env.PORT || 9600, function () {
    console.log('Corriendo en el puerto 9600')
})

//Conexion con los socket
//esperando configuracion de las sala 
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, roomid, bidamt, type }) => {
        //Creación de un nuevo usuario
        const user = userJoin(socket.id, username, roomid, bidamt, type);
        socket.join(user.roomid)

        //Enviar usuario y la info de la sala
        io.to(user.roomid).emit('roomUsers',
            {
                roomid: user.roomid,
                users: getRoomUsers(user.roomid)
            });
    })
})

