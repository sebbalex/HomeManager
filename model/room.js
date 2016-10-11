module.exports = function () {
    var GPIO = require('onoff').Gpio;
    var rooms = {};
    rooms["cameretta"] = {name: "cameretta", state: 1, gpioId: 17, lightId: 18, buttOBJ: new GPIO(25, 'in', 'both', {persistentWatch: true, debounceTimeout: 500}),
        loc: [
            {top: "385px", left: "193px"}
        ]};
    rooms["camera"] = {name: "camera", state: 1, gpioId: 22, lightId: 23, loc: [
            {top: "130px", left: "193px"}
        ]};
    rooms["bagnoCamera"] = {name: "bagnoCamera", state: 1, color: "green", loc: [
            {top: "130px", left: "316px"}
        ]};
    rooms["corridoioNotte"] = {name: "corridoioNotte", state: 1, color: "green", loc: [
            {top: "285px", left: "316px"}
        ]};
    rooms["corridoioGiorno"] = {name: "corridoioGiorno", state: 1, color: "green", loc: [
            {top: "285px", left: "396px"}
        ]};
    rooms["cucina"] = {name: "cucina", state: 1, color: "green", loc: [
            {top: "130px", left: "476px"}
        ]};
    rooms["bagno"] = {name: "bagno", state: 1, color: "green", loc: [
            {top: "385px", left: "398px"}
        ]};
    rooms["sala"] = {name: "sala", state: 1, color: "green", loc: [
            {top: "335px", left: "643px"}
        ]};
    rooms["ledsala"] = {name: "ledsala", state: 1, color: "green", loc: [
            {top: "461px", left: "556px"},
            {top: "461px", left: "836px"}
        ]};
    rooms["esterna"] = {name: "esterna", state: 1, color: "green", loc: [
            {top: "500px", left: "636px"},
            {top: "500px", left: "768px"}
        ]};
    rooms["lampioni"] = {name: "lampioni", state: 1, color: "green", loc: [
            {top: "500px", left: "636px"}
        ]};
    rooms["cancello"] = {name: "cancello", state: 1, color: "green", loc: [
            {top: "500px", left: "636px"}
        ]};
    return rooms;
};