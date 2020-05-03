// https://cloud.google.com/text-to-speech/docs/reference/rest/?apix=true

// https://wicg.github.io/speech-api/#tts-section

var msg = new SpeechSynthesisUtterance('Hello World');
window.speechSynthesis.speak(msg);
var voices = window.speechSynthesis.getVoices();
msg.voice = voices[10]; // Note: some voices don't support altering params
// msg.voiceURI = 'native';
msg.volume = 1; // 0 to 1
msg.rate = 1; // 0.1 to 10
msg.pitch = 2; //0 to 2
msg.text = 'Hello World';
msg.lang = 'en-US';

msg.onend = ( (e) => {
  console.log('Finished in ' + e.elapsedTime + ' seconds.');
});

speechSynthesis.speak(msg);