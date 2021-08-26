<template>
    <div class="alert alert-warning" v-show="errorMessage != null" role="alert" id="alert-incorrect-data">
        <h4 class="alert-heading">Incorrect login details!</h4>
        <div v-for="msg in errorMessage" :key="msg.id">
            <hr>
            {{ msg }}
        </div>
    </div>
    <div class="row">
        <div class="col-md-4 offset-md-4">
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
import router from '../helpers/router';
import { userService } from '../services';

export default {
  name: 'Login',
  data() {
    return {
        name: null,
        password: null,
        errorMessage: null,
    }
  },
  created () {
        userService.logout()
    },
  methods: {
    validateAuth() {
        userService.login(this.name, this.password)
                .then(router.push("/"))
                .catch(errorMsg => this.errorMessage = this.parseErrorMsg(errorMsg));
    },
    parseErrorMsg(errorMsg) {
        var msg = [];
        var keys = Object.keys(errorMsg);
        keys.forEach(function(key) {
            msg.push(key + ' ' + errorMsg[key]);
        });
        console.log(msg);
        return msg;
    },
  }
}
</script>
