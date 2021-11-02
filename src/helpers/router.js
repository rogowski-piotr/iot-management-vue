import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import Signup from '../pages/Signup.vue';
import Dashboard from '../pages/Dashboard.vue';
import Sensors from '../pages/Sensors.vue'
import SensorAdd from '../pages/SensorAdd.vue'
import SensorDetails from '../pages/SensorDetails.vue'
import SensorEdit from '../pages/SensorEdit.vue'
import SensorMeasurementsCharts from '../pages/SensorMeasurementsCharts.vue';
import SensorMeasurements from '../pages/SensorMeasurements.vue';
import Places from '../pages/Places.vue';
import PlaceAdd from '../pages/PlaceAdd.vue';
import PlaceDetails from '../pages/PlaceDetails.vue'
import PlaceEdit from '../pages/PlaceEdit.vue'
import Users from '../pages/Users.vue';
import UserAdd from '../pages/UserAdd.vue';
import UserDetails from '../pages/UserDetails.vue';
import UserEdit from '../pages/UserEdit.vue';
import UserSettings from '../pages/UserSettings.vue';
import Settings from '../pages/Settings.vue';
import SettingsAdd from '../pages/SettingsAdd.vue';
import SettingsEdit from '../pages/SettingsEdit.vue';


const routes = [
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/', component: Dashboard },
    { path: '/sensors', component: Sensors },
    { path: '/sensors/add', component: SensorAdd },
    { path: '/sensors/:id', component: SensorDetails },
    { path: '/sensors/:id/edit', component: SensorEdit },
    { path: '/sensors/:id/measurements', component: SensorMeasurements },
    { path: '/sensors/:id/measurements/charts', component: SensorMeasurementsCharts },
    { path: '/places', component: Places },
    { path: '/places/add', component: PlaceAdd },
    { path: '/places/:id', component: PlaceDetails },
    { path: '/places/:id/edit', component: PlaceEdit },
    { path: '/users', component: Users },
    { path: '/users/add', component: UserAdd },
    { path: '/users/:id', component: UserDetails },
    { path: '/users/:id/edit', component: UserEdit },
    { path: '/user-settings', component: UserSettings },
    { path: '/settings', component: Settings },
    { path: '/settings/add', component: SettingsAdd },
    { path: '/settings/:id/edit', component: SettingsEdit },
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