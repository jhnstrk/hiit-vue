<template>
  <div id="app">
    <p>Super-dooper HIIT helper</p>
    <!-- <img src="./assets/logo.png"> -->
    <activity-list/>
    <p>{{Math.max(Math.round(remainingTime),0)}}</p>
    <button v-on:click="onExport">Export</button>
    <input v-on:change="onFileChange" type="file" id="file-input" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ActivityList from "./ActivityList.vue";

import { Component } from 'vue-property-decorator';
import { theController } from './controller';
import { Utils } from './utils';

@Component({
  components: {
    ActivityList,
  }
})
export default class App extends Vue {
    data() { 
    return theController.viewModel; 
  }

  onExport() {
    const data = theController.model.toJson();
    Utils.download(data, 'activity.json', 'text/json');
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target){
      return;
    }
    if (!(target.files && target.files.length)) {
      return;
    }
    const file = target.files[0];

    var reader = new FileReader();

      reader.onload = ((e) => {
        console.log(`Read`);
        if (!e.target) return;
        const result = e.target.result as string;
        theController.model.fromJson(result);
      });

      // Read in the data
      reader.readAsText(file);
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>