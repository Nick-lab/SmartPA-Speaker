const io = require('socket.io-client');
const find = require('local-devices');
const scanner = require('./modules/scanner');
const port = 3000;

console.log('connect');
scanner.connect(port).then((socket)=>{
    socket.on('*', (data)=>{

    });
});


