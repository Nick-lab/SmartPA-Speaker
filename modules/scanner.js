const { exec } = require('child_process');
const io = require('socket.io-client');

function Connect(port){
    return new Promise((res, rej)=>{
        tryConnect(port).then((result)=>{
            if(result.error){
                //retry connect
            }else if(result.socket){
                res(result.socket);
            }
        })
    })
}

function tryConnect(port){
    return new Promise((res)=>{
        exec('arp -a', (err, stdout, stderr)=>{
            if(err){
                res({error: 'Command Failed'});
            }else{
                connected = false
                while(!connected){
                    devices = stdout.match(/([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)/g);
                    if(devices.length > 1){
                        devices.forEach((device, k) => {
                            if(device){
                                console.log('Testing: ', device);
                                let socket = io('http://'+device+':'+port);
                                socket.on('connect', ()=>{
                                    connected = true;
                                    res({socket: socket});
                                });
                                socket.emit('speaker-connect');
                            }
                        });
                    }else{
                        let addressArr = devices[0].split('.');
                        for(let i = 255; i > 0; i--){
                            let device = addressArr[0]+'.'+addressArr[1]+'.'+addressArr[2]+'.'+i;
                            console.log('Testing: ', device);
                            let socket = io('http://'+device+':'+port);
                            socket.on('connect', ()=>{
                                connected = true;
                                res({socket: socket});
                            });
                            socket.emit('speaker-connect');
                        }
                    }
                }
            }
        });
    })
}

module.exports.connect = Connect;