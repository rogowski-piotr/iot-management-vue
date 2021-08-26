<template>
  <navbar currentElement="home"/>
  <div class="row">
      <div class="col-md-6 offset-md-3">
          <div>
              <div>
                  <h3>Home</h3>
                  <hr/>
              </div>
              <div>
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
  </div>
</template>

<script>
import { sensorService } from '../services';
import Navbar from '../components/Navbar';

export default {
  components: { Navbar },
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
