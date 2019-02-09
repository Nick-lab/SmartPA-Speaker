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
                rows = stdout.split('\r\n');
                rows.forEach((row, k) => {
                    let device = row.match(/([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)/g);
                    if(device){
                        console.log('Testing: ', device);
                        let socket = io('http://'+device+':'+port);
                        socket.on('connect', ()=>{
                            res({socket: socket});
                        });
                        socket.emit('speaker-connect');
                    }
                    if(k == rows.length - 1){
                        setTimeout(()=>{
                            res({error: 'No connection found'});
                            
                        }, 2000);
                    }
                });
            }
        });
    })
}

module.exports.connect = Connect;