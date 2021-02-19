import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Section from '@/views/Section.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/:topicId',
    name: 'Section',
    component: Section,
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior(to) {
    if (!to.hash) {
      return { x: 0, y: 0 };
    }
    return {
      selector: to.hash,
      offset: { x: 0, y: 15 },
    };
  },
});

export default router;
