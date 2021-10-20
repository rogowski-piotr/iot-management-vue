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
                    <h4 class="modal-title">Signup</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <i class="fa fa-user p-1"></i>
                        <label>Name and Surname</label>
                        <input type="text" class="form-control" placeholder="Enter name & surname" v-model="registerPayload.username"/>
                    </div>
                    <div class="form-group">
                        <i class="fa fa-envelope p-1"></i>
                        <label>Email</label>
                        <input type="email" class="form-control" placeholder="Enter email" v-model="registerPayload.email"/>
                    </div>
                    <div class="form-group">
                        <i class="fa fa-lock p-1"></i>
                        <label>Password</label>
                        <input type="password" class="form-control" placeholder="Password" v-model="registerPayload.password"/>				
                    </div>
                    <div class="form-group">
                        <i class="fa fa-lock p-1"></i>
                        <label>Repeat password</label>
                        <input type="password" class="form-control" placeholder="Repeat password" v-model="repeatedPassword"/>				
                    </div>
                    <div class="form-group">
                        <button @click="validateAuth" type="submit" class="btn btn-primary btn-block btn-lg">Register</button>
                    </div>
                </div>
                <div class="modal-footer">
                    <a href="/login">Login</a> if you already have an account
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from '../helpers/router';
import { userService } from '../services';

export default {
  name: 'Signup',
  data() {
    return {
        registerPayload: {
            username: null,
            email: null,
            password: null,
        },
        repeatedPassword: null, 
        errorMessage: null,
    }
  },
  created () {
        userService.logout()
    },
  methods: {
    validateAuth() {
        if (! this.isValidPassword()) {
            this.errorMessage = ['Passwords are not the same'];
            return;
        }
        userService.register(this.registerPayload)
                .then(response => {
                    if (response.status === 201) {
                        router.push("/login")
                    } else {
                        return response.json()
                    }
                })
                .then(errorMsg => this.errorMessage = this.parseErrorMsg(errorMsg))
    },
    parseErrorMsg(errorMsg) {
        if (errorMsg === undefined) return;
        var msg = [];
        var keys = Object.keys(errorMsg);
        keys.forEach(function(key) {
            msg.push(key + ' ' + errorMsg[key]);
        });
        return msg;
    },
    isValidPassword() {
        return this.registerPayload.password == this.repeatedPassword
    }
  }
}
</script>