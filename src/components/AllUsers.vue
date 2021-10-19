<template>
    <div>
        <table class="table table-hover text-center">
            <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">E-Mail</th>
                <th scope="col">
                    Role
                    <div class="tooltip">
                        <i class="fa fa-question-circle-o" aria-hidden="true"></i>
                        <span class="tooltiptext">The Admin role permit to manage of system users</span>
                    </div>
                </th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in users" :key="user.id">
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role.name }}</td>
                <td>
                    <a class="btn btn-primary text-white" v-bind:href="'/users/' + user.id"><i class="far fa-eye"></i></a>
                    <a class="btn btn-success text-white mx-1" v-bind:href="'/users/' + user.id + '/edit'"><i class="fas fa-edit"></i></a>
                    <button v-if="getCurrentUserId() != user.id" class="btn btn-danger text-white" @click="deleteOne(user.id)"><i class="far fa-trash-alt"></i></button>
                    <a v-else aria-disabled="true" class="btn btn-danger text-white disabled"><i class="far fa-trash-alt"></i></a>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { userService } from '../services';

export default {
    name: 'AllUsers',
    data () {
        return {
            users: []
        }
    },
    mounted () {
        userService.getAll()
            .then(response => this.users = response);
    },
    methods: {
        getCurrentUserId() {
            return userService.getCurrentUser().id
        },
        deleteOne(id) {
            userService.deleteOne(id)
            this.$router.go(0);
        }
    }
}
</script>