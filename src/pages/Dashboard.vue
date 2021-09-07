<template>
  <Navbar/>
  <div class="container-fluid">
    <div class="row">
      <Sidebar currentElement="dashboard"/>
      <div class="col-md-9 ml-sm-auto col-lg-10 p-4">

        <h3>Home</h3>
        <hr/>
          <h1>Hi {{user.username}}!</h1>
          <p>You're logged in with Vue.js & Basic HTTP Authentication!!</p>
          <h3>Users from secure api end point:</h3>
          <em v-if="users.loading">Loading users...</em>
          <ul v-if="users.length">
              <li v-for="user in users" :key="user.id">
                  {{user.username}}
              </li>
          </ul>
          <p>
              <router-link to="/login">Logout</router-link>
          </p>
          
      </div>
    </div>
  </div>
</template>

<script>
import { sensorService } from '../services';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default {
  components: { Navbar, Sidebar },
    data () {
        return {
            user: {},
            users: []
        }
    },
    created () {
      this.user = JSON.parse(localStorage.getItem('user'));
      sensorService.getAll()
            .then(response => console.log(response)); //this.users = users);
    }
};
</script>
