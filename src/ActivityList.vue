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
import { activityModel, IActivity } from './data_model';
import { Component } from 'vue-property-decorator';

@Component({
  components: {
    draggable,
  }
})
export default class ActivityList extends Vue {
  myArray?: Array<IActivity>;

  data() { 
    return {
    myArray: activityModel.workout
     } ; 
  }

  updated() {
    console.log(`Udpated ${JSON.stringify(this.myArray)}`);
  } 
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
