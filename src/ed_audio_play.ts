// const AudioContext = window.AudioContext; // || window.webkitAudioContext;

export class EDAudioPlay {
  private channels = 1; // Mono
  private audioCtx: AudioContext;
  public pingSound?: AudioBuffer;
  public dingSound?: AudioBuffer;

  constructor() {
      this.audioCtx = new AudioContext();
  }

  // Frequency of note N on a standard piano.
  // 49 is A-4. 
  // https://en.wikipedia.org/wiki/Piano_key_frequencies
  private freqOfPianoKey(n: number): number {
    return Math.pow(2., (n - 49.)/12)*440;
  }

  async loadSoundAssets() {
    return new Promise((resolve, reject) => {
      this.pingSound = this.makeTone(this.freqOfPianoKey(51), 0.25);
      this.dingSound = this.makeTone(this.freqOfPianoKey(60), 0.5);
      resolve();
    });
  }

  async getArrayBuffer(url: string): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
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

  // Fill an audio buffer with a simple sin wave.
  public makeTone(freqHz: number, durationSec: number) : AudioBuffer
  {
    const sampleCount = this.audioCtx.sampleRate * durationSec;

    const aBuffer = this.audioCtx.createBuffer(
          this.channels, sampleCount, this.audioCtx.sampleRate);

    // Compute angular frequency, and adjust for sample rate.
    const omega = 2 * Math.PI * freqHz / this.audioCtx.sampleRate;

    // This gives us the actual array that contains the data
    const nowBuffering = aBuffer.getChannelData(0);

    for (let i = 0; i < sampleCount; i++) {
      // audio needs to be in [-1.0; 1.0]
      nowBuffering[i] = Math.sin(omega * i);
    }
    return aBuffer;
  }
}
