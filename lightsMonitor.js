module.exports = function (rooms) {
    var fs = require('fs');
    var GPIO = require('onoff').Gpio,
//    led = new GPIO(18, 'out'),
            inputs = {
                17: new GPIO(17, 'in', 'both', {persistentWatch: true, debounceTimeout: 500}),
                22: new GPIO(22, 'in', 'both', {persistentWatch: true, debounceTimeout: 500})
            };
//server side client solution
//http://stackoverflow.com/questions/9687561/is-it-possible-to-set-up-a-socket-io-client-running-server-side-on-a-node-js-s
    var client = require("socket.io-client")("http://localhost:3000");

    client.on('error', function (reason) {
        console.error('Unable to connect Socket.IO', reason);
    });
    client.on('connect', function () {
        console.info('successfully established a working connection \\o/');
    });

    fs.watchFile('message.text', function (curr, prev) {
        //test routine
        console.log('the current mtime is: ' + curr.mtime);
//  console.log('the previous mtime was: ' + prev.mtime);
//    client.join('lights');
        client.emit('toggleLight', "cucina");
    });

    for (var i in rooms) {
        var room = rooms[i];
        if ('gpioId' in room) {
            (function (foo) {
                inputs[foo.gpioId].watch(function (err, state) {
                    if (err) {
                        throw err;
                    }
                    console.log(foo.name + ' input changed its status to: ' + state);
                    foo.state = state;
                    room.state=state; //change status to global model
                    client.emit('setLight', foo);
                });
            }(room));
        }
    }

    var my = {};
    my.checkAll = function () {
        console.log("Going to check all rooms status");

        for (var i in rooms) {
            var room = rooms[i];
            if (room.gpioId) {
                rooms[room.name].state = inputs[room.gpioId].readSync();

//                async:
//                inputs[room.gpioId].read(function (err, value) {
//                    if (err) {
//                        throw err;
//                    }
//                    rooms[room.name].state = value;
//                });
            }
            console.log("room: " + room.name);
            client.emit('setLight', room);


        }

    };
    return my;
};