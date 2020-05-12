// https://cloud.google.com/text-to-speech/docs/reference/rest/?apix=true

// https://wicg.github.io/speech-api/#tts-section

export class TextToSpeech {
  public static say(message: string) {
    const msg = new SpeechSynthesisUtterance(message);
    // const voices = window.speechSynthesis.getVoices();
    // msg.voice = voices[3]; // Note: some voices don't support altering params
    // msg.voiceURI = 'native';
    msg.volume = 1; // 0 to 1
    msg.rate = 1; // 0.1 to 10
    // msg.pitch = 2; //0 to 2
    msg.text = message;
    msg.lang = 'en-US';

    msg.onend = ((e) => {
      console.log(`Finished in ${e.elapsedTime} seconds.`);
    });
    window.speechSynthesis.speak(msg);
  }
}

export { TextToSpeech as default };
