import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import IdleVue from 'idle-vue'

const eventsHub = new Vue()

Vue.config.productionTip = false;

Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  idleTime: 10000
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresLogin)) {
    if (!store.getters.loggedIn) {
      next({ name: 'login' })
    } else {
      next()
    } 
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
