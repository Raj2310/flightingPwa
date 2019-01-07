import Vue from './lib/vue';
import mainContainer from './component/mainContainer.js';
import router from './router';
import VueRouter from './lib/vue-router'
import Register from './component/register'
import navbar from './component/navbar'
import Login from './component/login'
import {flightMessages,flightInfo} from './component/flight'
import {saveBookingToLocal} from './service/booking-service'


const routes = [
  { path: '/login', component: Login },
  { path:'/register',component:Register}
]
router.addRoutes(routes);
router.replace('/dashboard')
Vue.use(VueRouter);
const app = new Vue({
  router:router
}).$mount('#app');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
