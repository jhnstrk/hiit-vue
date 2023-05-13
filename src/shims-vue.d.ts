// Required to import .vue files from typescript.
// Without it expect:
// TS2307: Cannot find module './App.vue' or its corresponding type declarations.
declare module '*.vue' {
  import { defineComponent } from 'vue';

  const component: ReturnType<typeof defineComponent>;
  export default component;
}
