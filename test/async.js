var Q = require('q');
var http = require('http');

var rooms = {};
rooms["cucina"] = {name: "cucina", state: 1, gpioId: 17, lightId: 18,
    loc: [
        {top: "130px", left: "476px"}
    ]};
rooms["camera"] = {name: "camera", state: 1, gpioId: 22, lightId: 23, loc: [
        {top: "130px", left: "193px"}
    ]};

/*
 for (room in rooms) {
 //    if (rooms[room].name.match(/cucina/g)) {
 (function (foo) {
 setTimeout(function () {
 console.log(foo);
 }, 500);
 //    }
 }(room));
 }
 */
//for (room in rooms) {
//   test(room);
//}
//var ciao = function(){
//    console.log("merce");
//};
//function test(foo) {
//        setTimeout(ciao(), 500);
//    };

//var print= function() {
//    console.log("asa " + room);
//};
//for (room in rooms) {
//    setTimeout(print, 1500);
//}
//console.log("prima");

var url = 'http://public.opencpu.org/ocpu/library/';
 url = 'http://10.13.173.8/';
 
var b = function(ress) {
    console.log("try2 " + ress);
    
};
function callback(b, res){
    console.log("try2 " + b.statusCode);
    console.log("try2 " + res);
}
var a = function(res) {
    console.log("try" + res.statusCode);
    http.get(url, function(b){callback(b, res.statusCode)});
};
var e = function(err) {
    console.log("Got error: " + err.message);
};
http.get(url, a).on('error', e);

//var getCode = function () {
//    var q = new Q.defer;
//    http.get(url, q.resolve);
//    return q.promise;
//};
//function printLog(log){
//    console.log('code è: ' + log.statusCode);
//}
//getCode().then(printLog);