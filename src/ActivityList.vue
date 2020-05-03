<template>
<div id="thelist">
<draggable v-model="myArray" group="people" @start="drag=true" @end="drag=false">
   <div v-for="element in myArray" :key="element.id">{{element.name}}</div>
</draggable>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
// https://www.npmjs.com/package/vuedraggable
import draggable from 'vuedraggable';
import { IActivity } from './data_model';

export default Vue.extend({
  name:  'ActivityList',
  data: () => { 
    return {
    myArray: [
    { id: 0, name: 'Zero activity', duration_sec: 30 },
    { id: 1, name: 'One activity', duration_sec: 30 },
    { id: 2, name: 'Two activity', duration_sec: 30 },
  ] } ; 
  },
  components: { draggable },
})
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
