<template>
    <div>
        <table class="table table-hover text-center">
            <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">E-Mail</th>
                <th scope="col">Role</th>
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
                    <a class="btn btn-success text-white mx-1"><i class="fas fa-edit"></i></a>
                    <a class="btn btn-danger text-white"><i class="far fa-trash-alt"></i></a>
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
    }
}
</script>

<style scoped>
</style>