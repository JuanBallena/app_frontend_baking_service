import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/app/Login.vue')
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '',
    name: 'layout',
    component: () => import('../views/app/Layout.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/boletas',
        name: 'BakeTicketList',
        component: () => import('../views/app/bake_tickets/BakeTicketList.vue')
      },
      {
        path: '/actividades',
        name: 'ActivityList',
        component: () => import('../views/app/activities/ActivityList.vue')
      },
      {
        path: '/locales',
        name: 'PlacesAttentionList',
        component: () => import('../views/app/places_attention/PlaceAttentionList.vue')
      },
      {
        path: '/ajustes',
        name: 'SettingList',
        component: () => import('../views/app/settings/SettingList.vue')
      },
      {
        path: '/reportes',
        name: 'Reports',
        component: () => import('../views/app/Reports.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    const user = localStorage.getItem('username');
    if (user) {
      next();
    } else {
      next({
        name: 'Login'
      });
    }
  } else {
    next();
  }
})

// export function logout() {
//   router.push({ name: 'Login'});
// }

export default router
