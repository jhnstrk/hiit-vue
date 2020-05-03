// const AudioContext = window.AudioContext; // || window.webkitAudioContext;

export class EDAudioPlay {
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
