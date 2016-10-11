module.exports = function (rooms) {
    var express = require('express');
    var router = express.Router();
    var client = require("socket.io-client")("http://localhost:3000");
    client.on('error', function (reason) {
        console.error('Unable to connect Socket.IO', reason);
    });
    client.on('connect', function () {
        console.info('successfully established a working connection \\o/');
    });
    /* GET home page. */
    router.get('/new', function (req, res) {
        res.sendfile('lights_1.html', {root: './public'});
    });
    router.get('/', function (req, res) {
        res.sendfile('lights.html', {root: './public'});
    });
    router.get('/rooms', function (req, res) {
        res.send({rooms: rooms});
    });

    //get room information
    router.get('/:roomName', function (req, res) {
        res.send({rooms: rooms[req.params.roomName]});
    });

    //get room state
    router.get('/:roomName/state', function (req, res) {
        res.send({rooms: rooms[req.params.roomName].state});
    });

    //set room state, maybe is useless
    //you just don't need to set a defined state
    //without knowing which is the actual one
    router.get('/:roomName/state/:state', function (req, res) {
        var room = rooms[req.params.roomName];
        client.emit('setLight', room);
        res.send({room: room});
    });
    //toggle room state
    router.get('/:roomName/toggle', function (req, res) {
        client.emit('toggleLight', req.params.roomName);
        //doesnt work!
        var room = client.emit('getLight', req.params.roomName);
        res.send({room: room});
    });
    return router;
};