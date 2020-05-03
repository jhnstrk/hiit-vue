<template>
  <div id="app">
    <p>Some text in the app template</p>
    <!-- <img src="./assets/logo.png"> -->
    <activity-list/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ActivityList from "./ActivityList.vue";

export default Vue.extend({
  name: 'App',
  components: { ActivityList }
})
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