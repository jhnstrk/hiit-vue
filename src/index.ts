import './style.css';

import Vue from 'vue';
import App from './App.vue';
import { theController } from './controller';

Vue.config.productionTip = false;

const vm = new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});

window.onload = () => {
  theController.initSound()
    .then(() => {
      //
      console.log('Sound ready');
    });
};
