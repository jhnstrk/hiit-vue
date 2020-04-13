import "./style.css";


  const AudioContext = window.AudioContext; // || window.webkitAudioContext;

  class EDAudioPlay {
    private channels = 2; // Stereo
    private audioCtx: AudioContext;
    private audioSources: Array<AudioBuffer> | null = null;

    constructor() {
        this.audioCtx = new AudioContext();
    }

    public init(): void {

      // Create an empty two second stereo buffer at the
      // sample rate of the AudioContext
      const sampleCount = this.audioCtx.sampleRate * 0.15;

      this.audioSources = new Array<AudioBuffer>();

      for (const sourceIx of [0,1]) {

        const sideArrayBuffer = this.audioCtx.createBuffer(
          this.channels, sampleCount, this.audioCtx.sampleRate);
        this.audioSources.push(sideArrayBuffer);
          // Fill the left or right buffer with white noise;
        // just random values between -1.0 and 1.0
        for (let channel = 0; channel < this.channels; channel++) {
            // This gives us the actual array that contains the data
          const nowBuffering = sideArrayBuffer.getChannelData(channel);

          for (let i = 0; i < sampleCount; i++) {
            // Math.random() is in [0; 1.0]
            // audio needs to be in [-1.0; 1.0]
            let sampleValue = 0;
            if (channel === sourceIx) {
              sampleValue = Math.random() * 2 - 1;
            }
            nowBuffering[i] = sampleValue;
          }
        }

      }
    }

    public playLeft(): void {

      if (!this.audioSources) {
         return;
      }
      if (!this.canPlay()) {
        console.log("Left");
        return;
      }
      // start the source playing
      this.playBuffer(this.audioSources[0]);
      // source.onended = () => {
      //  console.log('White noise finished');
      // }
    }
    public playRight(): void {

      if (!this.audioSources) {
         return;
      }
      if (!this.canPlay()) {
        console.log("Right");
        return;
      }
      // start the source playing
      this.playBuffer(this.audioSources[1]);
      // source.onended = () => {
      //  console.log('White noise finished');
      // }
    }

    public canPlay(): boolean {
      return this.audioCtx && this.audioCtx.state !== 'suspended';
    }

    public resume(): void {
      if (this.audioCtx) {
        this.audioCtx.resume();
      }
    }

    private playBuffer(sideArrayBuffer: AudioBuffer): void {
              // Get an AudioBufferSourceNode.
        // This is the AudioNode to use when we want to play an AudioBuffer
        const source = this.audioCtx.createBufferSource();

        // set the buffer in the AudioBufferSourceNode
        source.buffer = sideArrayBuffer;
        // connect the AudioBufferSourceNode to the
        // destination so we can hear the sound
        source.connect(this.audioCtx.destination);

        source.start();
    }
  }
const myaudio: EDAudioPlay = new EDAudioPlay();
let oldTheta: number | null = null;
let oldSinWt: number | null = null;
let oldTimestamp = 0;

let periodMilli = 3000;
let offsetTime = 0;
let running = false;

function initCanvas(): void {
  const canvas = document.getElementById('mycanvas')  as HTMLCanvasElement;
  canvas.addEventListener('click', ( /* ev */ ) => {
    myaudio.resume();
  });

}

  function draw(timeNow: number): void {
    const canvas = document.getElementById('mycanvas')  as HTMLCanvasElement;
    const canvasDiv = document.getElementById('canvasdiv') as HTMLDivElement;

    // Make canvas fit
    canvas.width = canvasDiv.clientWidth;
    canvas.height = canvasDiv.clientHeight;

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.log("bad context");
      return;
    }
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height); // clear canvas

    const theta0 = 30 * Math.PI / 180;

    const r0 = width * 0.9;
    const omega = 2*Math.PI / periodMilli;
    const wt = omega * (timeNow - offsetTime);
    const theta = theta0 * Math.cos(wt);

    const xOff = r0 * Math.sin(theta);
    const yOff = r0 * Math.cos(theta) - r0 + height/2;
    const sinWt = Math.sin(wt);

    if (oldTheta === null || oldSinWt === null) {
      oldTheta = theta;
      oldSinWt = sinWt;
    }

    if (oldSinWt <= 0 && sinWt > 0) {
      myaudio.playRight();
    } else if (oldSinWt >= 0 && sinWt < 0) {
      myaudio.playLeft();
    }

    const arcLen = Math.abs(theta - oldTheta);
    const colorVal = Math.round(Math.min(255, 55 * (0.1 - arcLen) / 0.1) + 200);
    ctx.strokeStyle = `rgb( ${colorVal}, ${colorVal}, ${colorVal} )`;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.lineWidth = 40.0;
    ctx.arc(width/2, -r0+height/2, r0, -theta+Math.PI/2, -oldTheta+Math.PI/2, (theta < oldTheta));
    ctx.stroke();

    // No arc is drawn above if start and end are the same.
    if (arcLen < 0.01) {
      ctx.fillStyle = "#FFF";
      ctx.beginPath();
      ctx.arc(xOff + width/2, yOff, 20, 0, 2 * Math.PI);
      ctx.fill();
    }
    oldTheta = theta;
    oldSinWt = sinWt;
    oldTimestamp = timeNow;

    if (running) {
      window.requestAnimationFrame(draw);
    }
  }

  function applyNewPeriod(newPeriodMilli: number): void {
    // sin(wt) = const
    // => sin(w1 t) == sin(w2 t)
    // => w1 (t - t1) == w2 ( t - t2)
    // 2p/T1 (t - t1) == 2p/T2 (t - t2)
    // T2( t - t1 ) == T1 ( t - t2 )
    // T2 t - T2 t1 == T1 t - T1 t2
    // t2 = T1 t - T2 t + T2 t1
    // t2 = t ( T1 - T2 ) + T2 t1
    offsetTime = oldTimestamp * (periodMilli - newPeriodMilli) / periodMilli
     + newPeriodMilli * offsetTime / periodMilli;
    periodMilli = newPeriodMilli;
  }

  function initButtons(): void {
    const startButton = document.getElementById("start") as HTMLButtonElement;
    startButton.addEventListener("click", ()=>{
      myaudio.init();
      running = !running;
      startButton.innerText = running ? "Stop" : "Start";
      if (running) {
        offsetTime += (performance.now() - oldTimestamp);
        window.requestAnimationFrame(draw);
      }
    });
    const slowerButton = document.getElementById("slower") as HTMLButtonElement;
    slowerButton.addEventListener("click", ()=>{
      applyNewPeriod( periodMilli * 1.1 );
    });
    const fasterButton = document.getElementById("faster") as HTMLButtonElement;
    fasterButton.addEventListener("click", ()=>{
      applyNewPeriod( periodMilli * 0.9 );
    });}

initCanvas();
initButtons();
draw(0);

import Vue from "vue";
import App from "./Hello";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  template: "<App/>",
  components: { App }
});
