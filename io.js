module.exports = function (rooms, config, lightsMonitor) {
    var io = require('socket.io')(); // yes, no server arg here; it's not required
    var GPIO = require('onoff').Gpio,
            relay = {
                18: new GPIO(18, 'out'),
                23: new GPIO(23, 'out')
            };


    io.on('connection', function (socket) {
        console.log('a user connected');
        socket.on('disconnect', function () {
            console.log('user disconnected');
        });

        socket.on('chat message', function (msg) {
            io.emit('chat message', msg);
            console.log('message: ' + msg);
        });

        socket.on('toggleLight', function (roomSent) {
            console.log("room: " + rooms[roomSent].state + " roomsent " + roomSent);
            rooms[roomSent].state = Number(!rooms[roomSent].state);

            //relay toggle on key pressing on map
            toggleRelay(relay[rooms[roomSent].lightId]);
            //update map with new value will be done directly in lightsMonitor with
            //the auto change status on input pin itself
//            io.emit('toggleLight', room[roomSent]);
            console.log('toggleLight: ' + rooms[roomSent].state);
        });


        socket.on('setLight', function (room) {
            //this just set the light status inside the application
            //after a trigger by the relay
            //IT DOESNT TURN ANY LIGHTS!!
            //Lights turning control is only under the toggleLight manage.
            io.emit('setLight', room);
            //update local rooms copy with newer infos
            rooms[room.name] = room;
            console.log('setLight: ' + room.name + " to: " + room.state);
        });

        socket.on('getLight', function (roomName) {
            //it returns a copy of room object with updated informations
//            io.emit('getLight', rooms);
            var room = rooms[roomName];
            console.log('getLight: ' + room.name + " state: " + room.state);
            return room;
        });

        socket.on('lightStatus', function () {
            lightsMonitor.checkAll();
            console.log('lightStatus: ');
        });
    });
    function toggleRelay(relay) {
        relay.writeSync(1);
        setTimeout(function () {
            relay.writeSync(0);
        }, 500);
    }
    return io;
};
//module.exports = io;