const Lame = require('lame');
const Speaker = require('speaker');
const fs = require('fs');
const path = require('path');
var mediaPath = path.join(global.paths.root, 'assets/media');

const speaker = new Speaker({
    channels: 2,          // 2 channels
    bitDepth: 16,         // 16-bit samples
    sampleRate: 44100     // 44,100 Hz sample rate
});;

const decoder = new Lame.Decoder({
  channels: 2,
  bitDepth: 16,
  sampleRate: 44100,
  bitRate: 128,
  outSampleRate: 22050,
  mode: Lame.STEREO
});

function connected(){
    fs.createReadStream(path.join(mediaPath, 'chime.mp3'))
   .pipe(decoder).pipe(speaker);
}

module.exports.connected = connected;