

import Vue from 'vue';
import App from './app.vue';
console.log(App)
import "normalize.css/normalize.css";
import "chartist/dist/chartist.min.css"
import "./latex.css"

Vue.use(require('vue-chartist'))



new Vue({ render: createElement => createElement(App) }).$mount('#app');

