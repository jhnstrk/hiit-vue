// Required to keep eslint happy.
// Without it expect:
//  error  Unsafe assignment of an `any` value  @typescript-eslint/no-unsafe-assignment
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const component: DefineComponent<object, object, any>;
  export default component;
}
