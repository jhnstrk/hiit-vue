import "./style.css";

import Vue from "vue";
import App from "./App";
import { theController } from "./controller";

Vue.config.productionTip = false;

const vm = new Vue({
  el: "#app",
  template: "<App/>",
  components: { App }
});

window.onload = () => {
  theController.initSound()
  .then( ()=> {
     // 
     console.log('Sound ready');
  });
}
