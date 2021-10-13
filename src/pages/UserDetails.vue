<template>
  <Navbar/>
  <div class="container-fluid">
    <div class="row">
      <Sidebar currentElement="users"/>
      <div class="col-md-9 ml-sm-auto col-lg-10 p-4">

        <a href="/users"><i class="fa fa-chevron-left" aria-hidden="true"></i> back</a>
        <hr/>
        <h3>User details</h3>
        <hr/>

        <div class="col-lg-6 offset-lg-2">

            <table class="table table-hover text-left">
                <tr>
                    <td></td>
                    <th scope="row">Username</th>
                    <td></td>
                    <td colspan="2" v-if="user.username">{{ this.user.username }}</td>
                    <td colspan="2" v-else v-html="noDataLabel"></td>
                </tr>
                <tr>
                    <td></td>
                    <th scope="row">Email</th>
                    <td></td>
                    <td colspan="2" v-if="user.email">{{ this.user.email }}</td>
                    <td colspan="2" v-else v-html="noDataLabel"></td>
                </tr>
                <tr>
                    <td></td>
                    <th scope="row">Role</th>
                    <td></td>
                    <td colspan="2" v-if="user.role">{{ this.user.role }}</td>
                    <td colspan="2" v-else v-html="noDataLabel"></td>
                </tr>
            </table>

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
            noDataLabel: '<small>no data 😥</small>'
        }
    },
    created () {
        this.userId = this.$route.params.id;
        userService.getOne(this.userId)
            .then(response => {
                this.user.username = response.username
                this.user.email = response.email
                this.user.role = response.role.name
            })
    }
};
</script>
