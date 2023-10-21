import './style.css';

import * as Vue from 'vue';
import App from './App.vue';
import { theController } from './controller';

// Vue.config.productionTip = false;

const app = Vue.createApp(App);

app.mount('#app');

window.onload = () => {
  theController.initSound().then(() => {
    //
    console.log('Sound ready');
  });
};
