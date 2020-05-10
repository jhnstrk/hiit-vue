<template>
<div id="outer">
<form @submit.prevent="onSubmit">
  <div  id="thelist">
<draggable v-model="workout" group="people" @start="drag=true" @end="drag=false">
  <div v-for="element in workout" :key="element.id">
     <div class="list-item" v-bind:class="{ active: state.activeId === element.id }">{{element.name}}
     <input v-model.number="element.durationSec" type="number" step="5">
     <button v-on:click="onRemove( element.id )" v-bind:key="element.id">Remove</button>
     </div>
  </div>
</draggable>
  </div>
  <button v-on:click="onAdd">New Item</button>
  <button v-on:click="onGo" type="button">Go</button>
</form>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
// https://www.npmjs.com/package/vuedraggable
import draggable from 'vuedraggable';
import { IActivity } from './data_model';
import { theController } from './controller';
import { Component } from 'vue-property-decorator';

@Component({
  components: {
    draggable,
  }
})
export default class ActivityList extends Vue {
  data() { 
    return {
      workout: theController.model.workout,
      state: theController.viewModel
    }; 
  }

  onAdd() {
      theController.model.newActivity();
  }

  onRemove(id: number) {
    console.log(`remove ${JSON.stringify(id)}`);
    theController.model.removeActivity(id);
  }

  updated() {
    console.log(`Udpated ${JSON.stringify(theController.model.workout)}`);
  } 

  onGo() {
    console.log('Go!');
    theController.runActivities();
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}

input {
  width: 5em;
}

form {
  background-color: lightgray;
  width: fit-content;
}
.active {
  background-color: aqua;
}

#thelist {
  max-height: 500px;
  overflow: scroll;
}

#outer {
    width: 100%;
  /* Firefox */
  display: -moz-box;
  -moz-box-pack: center;
  -moz-box-align: center;
  /* Safari and Chrome */
  display: -webkit-box;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  /* W3C */
  display: box;
  box-pack: center;
  box-align: center;
}
/*
.list-item {
  float: right;
}
*/
</style>
