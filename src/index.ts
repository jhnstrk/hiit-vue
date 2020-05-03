import "./style.css";

import { EDAudioPlay } from "./ed_audio_play";
import { ActivityModel } from "./data_model";

const myaudio: EDAudioPlay = new EDAudioPlay();

import Vue from "vue";
import App from "./App";
// import ActivityList from "./ActivityList";

Vue.config.productionTip = false;

const vm = new Vue({
  el: "#app",
  template: "<App/>",
  components: { App }
});

window.onload = () => {
  myaudio.loadSoundAssets()
  .then( ()=> {
    if (myaudio.pingSound)
       myaudio.playBuffer(myaudio.pingSound);
  });
}
