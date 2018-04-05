import './firebase';
import Vue from 'vue'
import App from './App.vue'
import VueFire from 'vuefire'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
 
Vue.use(Vuetify);

Vue.use(VueFire);

new Vue({
  el: '#app',
  render: h => h(App)
})
