<template>
  <Navbar/>
  <div class="container-fluid">
    <div class="row">
      <Sidebar currentElement="users"/>

      <div class="col-md-9 ml-sm-auto col-lg-10 p-4">

        <a href="/users"><i class="fa fa-chevron-left" aria-hidden="true"></i> back</a>
        <hr/>
        <h3>Add user</h3>
        <hr/>

        <div v-if="addStatus == false" class="alert alert-warning text-center" role="alert" id="alert-invalid-data">
            <h4 class="alert-heading">❌ Can not add! ❌</h4>
            <hr>
            <p class="mb-0">Fill all fields in the below form or the password is incorrect</p>
        </div>

        <div v-if="addStatus == true" class="alert alert-success text-center" role="alert" id="alert-valid-data">
            <h4 class="alert-heading">✔️ Added correctly! ✔️</h4>
        </div>

        <div class="col-lg-6 offset-lg-2">

            <table class="table table-hover text-left">
                <tr>
                    <td></td>
                    <th scope="row">Username</th>
                    <td></td>
                    <td>
                        <input type="username" class="form-control" v-model="user.username">
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <th scope="row">Email</th>
                    <td></td>
                    <td>
                        <input type="email" class="form-control" v-model="user.email">
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <th scope="row">Role</th>
                    <td></td>
                    <td>
                        <select v-model="user.role">
                            <option v-for="option in optionItemsRoles" v-bind:key="option.id" :value="option.id">
                                {{ option.name }}
                            </option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <th scope="row">Password</th>
                    <td></td>
                    <td>
                        <input type="password" class="form-control" v-model="user.password">
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <th scope="row">Repeat Password</th>
                    <td></td>
                    <td>
                        <input type="password" class="form-control" v-model="repeatedPassword">
                    </td>
                </tr>
            </table>

            <br/>
            <div class="text-center">
                <button @click="add" type="button" class="btn btn-primary">Add</button>
            </div>

        </div>
          
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { userService } from '../services';

export default {
    components: { Navbar, Sidebar },
    data () {
        return {
            user: {
                username: null,
                email: null,
                role: null,
                password: null,
            },
            repeatedPassword: null,
            addStatus: null,
            optionItemsRoles: null,
        }
    },
    created () {
        userService.getAllRoles()
            .then(response => this.optionItemsRoles = response)
    },
    methods: {
        add() {
            if (! this.validatePayload()) {
                this.addStatus = false;
                return;
            }
            userService.add(this.user)
                .then(response => this.addStatus = response.status == 201 ? true : false)
        },
        validatePayload() {
            return this.user.password === this.repeatedPassword
                && this.user.username != null
                && this.user.email != null
                && this.user.role != null
                && this.user.password != null
                && this.repeatedPassword != null
        }
    }
};
</script>
<style scoped>
    select {
        background-color: transparent;
        border: 1px solid #ced4da;
        border-radius: .25rem;
        padding: 0 1em 0 0;
        margin: 0;
        width: 100%;
        height: calc(1.5em + .75rem + 2px);
        font-family: inherit;
        font-size: inherit;
        cursor: inherit;
        line-height: inherit;
    }
</style>