/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare interface Window {
  chrome?: any;
}
declare module '*.css';
declare module '*.scss';
declare module '*.svg';
declare module 'jquery';