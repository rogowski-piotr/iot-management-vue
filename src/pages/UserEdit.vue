<template>
  <Navbar/>
  <div class="container-fluid">
    <div class="row">
      <Sidebar currentElement="users"/>

      <div class="col-md-9 ml-sm-auto col-lg-10 p-4">

        <a href="/users"><i class="fa fa-chevron-left" aria-hidden="true"></i> back</a>
        <hr/>
        <h3>Edit user</h3>
        <hr/>

        <div v-if="updateStatus != 202 && updateStatus != null" class="alert alert-warning text-center" role="alert" id="alert-invalid-data">
            <h4 class="alert-heading">❌ Can not update! ❌</h4>
            <hr>
            <p class="mb-0">Fill all fields in the below form</p>
        </div>

        <div v-if="updateStatus === 202" class="alert alert-success text-center" role="alert" id="alert-valid-data">
            <h4 class="alert-heading">✔️ Updated correctly! ✔️</h4>
        </div>

        <div class="col-lg-6 offset-lg-2">

            <table class="table table-hover text-left">
                <tr>
                    <td></td>
                    <th scope="row">Username</th>
                    <td></td>
                    <td>
                        <input type="text" id="name" class="form-control" v-model="user.username" disabled>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <th scope="row">Email</th>
                    <td></td>
                    <td>
                        <input type="text" id="name" class="form-control" v-model="user.email" disabled>
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
            </table>

            <br/>
            <div class="text-center">
                <button @click="update" type="button" class="btn btn-primary">Update</button>
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
            userId: null,
            user: {
                username: null,
                email: null,
                role: null
            },
            updateStatus: null,
            optionItemsRoles: null,
        }
    },
    created () {
        this.userId = this.$route.params.id;
        userService.getOne(this.userId)
            .then(response => {
                this.user.username = response.username
                this.user.email = response.email
                this.user.role = response.role.id
            })
        userService.getAllRoles()
            .then(response => {
                this.optionItemsRoles = response
            })
    },
    methods: {
        update() {
            userService.update(this.userId, this.user)
                .then(response => this.updateStatus = response.status)
        },
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