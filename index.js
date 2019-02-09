const io = require('socket.io-client');
const find = require('local-devices');

global.paths = {
    root: __dirname
};

const scanner = require('./modules/scanner');
const audio = require('./modules/audio');
const port = 3000;

scanner.connect(port).then((socket)=>{
    audio.connected();
    socket.on('*', (data)=>{

    });
});


