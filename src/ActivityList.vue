<script lang="ts">
import * as Vue from 'vue';
// https://www.npmjs.com/package/vuedraggable
import draggable from 'vuedraggable';
import { theController } from './controller';

export default Vue.defineComponent({
  components: {
    draggable,
  },

  data() {
    return {
      drag: false,
      workout: theController.model.workout,
      state: theController.viewModel,
    };
  },

  methods: {
    onAdd() {
      theController.model.newActivity();
    },

    onRemove(id: number) {
      console.log(`remove ${JSON.stringify(id)}`);
      theController.model.removeActivity(id);
    },

    updated() {
      // console.log(`Udpated ${JSON.stringify(theController.model.workout)}`);
      console.log(`Udpated ${JSON.stringify(this.workout)}`);
      if (this.workout !== theController.model.workout) {
        // Draggable creates a copy of the array, rather than mutating.
        if (this.workout) {
          theController.model.workout = this.workout;
        }
      }
    },

    onGo(): void {
      console.log('Go!');
      // Intentionally no await.
      void theController.runActivities();
    },

    onSubmit() {},
  },
});
</script>

<template>
  <div id="outer">
    <form @submit.prevent="onSubmit">
      <div id="thelist">
        <draggable
          v-model="workout"
          item-key="id"
          group="people"
          @start="drag = true"
          @end="drag = false"
          @change="updated"
        >
          <template #item="{ element }">
            <div
              class="list-item"
              :class="{ active: state.activeId === element.id }"
            >
              <input v-model="element.name" :size="element.name.length" />
              <input
                v-model.number="element.durationSec"
                type="number"
                step="5"
                size="3"
              />
              <button :key="element.id" @click="onRemove(element.id)">
                Remove
              </button>
            </div>
          </template>
        </draggable>
      </div>
      <button @click="onAdd">New Item</button>
      <button type="button" @click="onGo">Go</button>
    </form>
  </div>
</template>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}

/*
input {
  width: 5em;
}
*/
input[type='number'] {
  width: 3em;
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
