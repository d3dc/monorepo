import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)

const router = new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard/Index.vue'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/users',
          name: 'users',
          component: () => import(/* webpackChunkName: "demo" */ './views/Users/Index.vue'),
          meta: {
            requiresAdmin: true
          }
        },
        {
          path: '/users/:id',
          name: 'user',
          component: () => import(/* webpackChunkName: "demo" */ './views/Users/User.vue'),
          meta: {
            requiresAuth: true // TODO Requires owner
          }
        },
        {
          path: '/resources',
          name: 'resources',
          component: () => import(/* webpackChunkName: "demo" */ './views/Resources/Index.vue'),
          meta: {
            requiresAdmin: true
          }
        },

        // -------------------
        {
          path: '/icons',
          name: 'icons',
          component: () => import(/* webpackChunkName: "demo" */ './views/Icons.vue'),
          meta: {
            requiresAdmin: true
          }
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import(/* webpackChunkName: "demo" */ './views/UserProfile.vue'),
          meta: {
            requiresAuth: true // TODO Requires owner
          }
        }
      ]
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login/Index.vue')
        },
        {
          path: '/forgot',
          name: 'forgot',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login/Forgot.vue')
        }
        // TODO 401
      ]
    }
  ]
})

// Authed routing
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAdmin)) {
    if (store.getters['system/isAdmin']) {
      next()
      return
    }
    next('/login')
  } else if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['system/isLoggedIn']) {
      next()
      return
    }
    next('/login') 
  } else {
    next()
  }
})

export default router
