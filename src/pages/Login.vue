<template>
<div class="alert alert-warning" v-show="responseStatus === 401" role="alert" id="alert-unauthorized">
    <h4 class="alert-heading">Incorrect login details!</h4>
</div>
<div class="alert alert-warning" v-show="responseStatus === 400" role="alert" id="alert-incorrect-data">
    <h4 class="alert-heading">Incorrect login details!</h4>
    <hr>
    <p class="mb-0">Please complete all fields</p>
</div>
<div class="alert alert-warning" v-show="responseStatus != null && responseStatus != 200 && responseStatus != 400 && responseStatus != 401" role="alert" id="alert-unexpected">
    <h4 class="alert-heading">Occurred unexpected error</h4>
    <hr>
    <p class="mb-0">Try again later</p>
</div>
<div class="row">
    <div class="col-md-6 offset-md-3">
        <div>
            <div>
                <h3>Login</h3>
                <hr/>
            </div>
            <div class="form-group">
                <label>Email or Username</label>
                <input type="text" class="form-control" v-model="name"/>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" v-model="password"/>
            </div>
            <div class="my-3">
                <button @click="validateAuth" type="submit" class="btn btn-primary">Login</button>
            </div>
            <a href="">forgot password?</a> or <a href="/signup">signup</a>
        </div>
    </div>
</div>
</template>

<script>
import router from '../router';
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
        name: null,
        password: null,
        responseStatus: null,
    }
  },
  methods: {
    validateAuth() {
        axios.post(
                'http://192.168.0.18:8080/login',
                {"name": this.name,"password": this.password},
                { headers: {'Content-type': 'application/json',}}
            )
            .then(response => {
                if (response.status == 200) {
                    router.push("Signup")
                }
            })
            .catch(error => this.responseStatus = error.response.status)
    },
  }
}
</script>
