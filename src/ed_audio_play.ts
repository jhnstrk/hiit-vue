// const AudioContext = window.AudioContext; // || window.webkitAudioContext;

const beepPingAsset = require('../assets/beep-ping.mp3');
const dingAsset = require('../assets/robot-blip2.mp3');

export class EDAudioPlay {
  private channels = 2; // Stereo
  private audioCtx: AudioContext;
  public pingSound?: AudioBuffer;
  public dingSound?: AudioBuffer;

  constructor() {
      this.audioCtx = new AudioContext();
  }

  async loadSoundAssets() {
    this.pingSound = await this.loadSound(beepPingAsset.default);
    this.dingSound = await this.loadSound(dingAsset.default);
  }

  async getArrayBuffer(url: string): Promise<ArrayBuffer> {
    return new Promise(function (resolve, reject) {
        const xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function () {
            var status = xhr.status;
            if (status == 200) {
                resolve(xhr.response);
            } else {
                reject({status});
            }
        };
        xhr.send();
    });
  }

  public async loadSound(url: string): Promise<AudioBuffer> {
    const abuffer = await this.getArrayBuffer(url);
  
    // Decode asynchronously
    return this.audioCtx.decodeAudioData(abuffer);
  }
  
  public canPlay(): boolean {
    return this.audioCtx && this.audioCtx.state !== 'suspended';
  }

  public resume(): void {
    if (this.audioCtx) {
      this.audioCtx.resume();
    }
  }

  public playBuffer(thebuffer: AudioBuffer, time?: number): void {
      // Get an AudioBufferSourceNode.
      // This is the AudioNode to use when we want to play an AudioBuffer
      const source = this.audioCtx.createBufferSource();

      // set the buffer in the AudioBufferSourceNode
      source.buffer = thebuffer;
      // connect the AudioBufferSourceNode to the
      // destination so we can hear the sound
      source.connect(this.audioCtx.destination);

      source.start(time);
  }

  public now() : number {
    return this.audioCtx.currentTime;
  }
}
