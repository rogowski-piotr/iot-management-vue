import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import Signup from '../pages/Signup.vue';
import Dashboard from '../pages/Dashboard.vue';
import Sensors from '../pages/Sensors.vue'
import Places from '../pages/Places.vue';
import Users from '../pages/Users.vue';

const routes = [
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/', component: Dashboard },
    { path: '/sensors', component: Sensors },
    { path: '/places', component: Places },
    { path: '/users', component: Users },
    // { path: '*', redirect: '/' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/signup'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
  
    if (authRequired && !loggedIn) {
      return next({ 
        path: '/login', 
        query: { returnUrl: to.path } 
      });
    }
  
    next();
  })

export default router;