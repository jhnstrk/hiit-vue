import './style.css';

import * as Vue from 'vue';
import App from './App.vue';
import { theController } from './controller';

// Vue.config.productionTip = false;

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const app = Vue.createApp(App);

app.mount('#app');

window.onload = () => {
  theController.initSound().then(() => {
    //
    console.log('Sound ready');
  }).catch((e) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.error(`Error initializing sound ${e?.message}`);
    throw e;
  });
};
