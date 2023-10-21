// Required to import .vue files from typescript.
// Without it expect:
// TS2307: Cannot find module './App.vue' or its corresponding type declarations.
declare module '*.vue' {
  import type {DefineComponent} from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const component: DefineComponent<object, object, any>
  export default component;
}
