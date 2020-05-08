<template>
  <div id="app">
    <p>Some text in the app template</p>
    <!-- <img src="./assets/logo.png"> -->
    <activity-list/>
    <p>{{Math.max(Math.round(remainingTime),0)}}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ActivityList from "./ActivityList.vue";

import { Component } from 'vue-property-decorator';
import { theController } from './controller';

@Component({
  components: {
    ActivityList,
  }
})
export default class App extends Vue {
    data() { 
    return theController.viewModel; 
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