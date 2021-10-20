<template>

    
    <div class="alert alert-warning m-0" v-show="errorMessage != null" role="alert" id="alert-incorrect-data">
        <h4 class="alert-heading">Incorrect login details!</h4>
        <div v-for="msg in errorMessage" :key="msg.id">
            <hr>
            {{ msg }}
        </div>
    </div>
    <div class="bg-secondary vh-100"></div>

    <div class="modal fade show" aria-odal="true" style="display: block;">
        <div class="modal-dialog modal-login">
            <div class="modal-content bg-light">
                <div class="modal-header">				
                    <h4 class="modal-title">Login</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <i class="fa fa-user p-1"></i>
                        <label>Email or Username</label>
                        <input type="text" class="form-control" placeholder="Username" v-model="name"/>
                    </div>
                    <div class="form-group">
                        <i class="fa fa-lock p-1"></i>
                        <label>Password</label>
                        <input type="password" class="form-control" placeholder="Password" v-model="password"/>				
                    </div>
                    <div class="form-group">
                        <button @click="validateAuth" type="submit" class="btn btn-primary btn-block btn-lg">Login</button>
                    </div>
                </div>
                <div class="modal-footer">
                    <a href="/signup">signup</a> if you don't have an account
                </div>
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