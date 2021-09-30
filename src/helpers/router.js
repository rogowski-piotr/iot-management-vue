import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import Signup from '../pages/Signup.vue';
import Dashboard from '../pages/Dashboard.vue';
import Sensors from '../pages/Sensors.vue'
import SensorDetails from '../pages/SensorDetails.vue'
import SensorMeasurements from '../pages/SensorMeasurements.vue';
import Places from '../pages/Places.vue';
import PlaceDetails from '../pages/PlaceDetails.vue'
import Users from '../pages/Users.vue';
import UserSettings from '../pages/UserSettings.vue';
import Settings from '../pages/Settings.vue';

const routes = [
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/', component: Dashboard },
    { path: '/sensors', component: Sensors },
    { path: '/sensors/:id', component: SensorDetails },
    { path: '/sensors/:id/measurements', component: SensorMeasurements },
    { path: '/places', component: Places },
    { path: '/places/:id', component: PlaceDetails },
    { path: '/users', component: Users },
    { path: '/user-settings', component: UserSettings },
    { path: '/settings', component: Settings },
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