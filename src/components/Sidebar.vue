<template>
    <div>
        <nav class="col-md-2 d-none d-md-block bg-light sidebar" style="position: fixed; font-size: 20px">
            <div class="sidebar-sticky active sticky-top vh-100 bg-light">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link pt-4" v-bind:class = "{ 'text-dark font-weight-bold': (this.currentElement==='dashboard') }" href="/">
                        <i class="fa fa-home" aria-hidden="true"></i>
                        Dashboard
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link pt-3" v-bind:class = "{ 'text-dark font-weight-bold': (this.currentElement==='sensors') }" href="/sensors">
                        <i class="fa fa-thermometer-quarter" aria-hidden="true"></i>
                        Sensors
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link pt-3" v-bind:class = "{ 'text-dark font-weight-bold': (this.currentElement==='places') }" href="/places">
                        <i class="fa fa-map-marker" aria-hidden="true"></i>
                        Places
                    </a>
                </li>
                <li v-if="checkCurrentUserIsAdmin()" class="nav-item">
                    <a class="nav-link pt-3" v-bind:class = "{ 'text-dark font-weight-bold': (this.currentElement==='users') }" href="/users">
                        <i class="fa fa-users" aria-hidden="true"></i>
                        Users
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link pt-3" v-bind:class = "{ 'text-dark font-weight-bold': (this.currentElement==='settings') }" href="/settings">
                        <i class="fa fa-cog" aria-hidden="true"></i>
                        Settings
                    </a>
                </li>
            </ul>
            </div>
        </nav>
    </div>
</template>

<script>
import { userService } from '../services';

export default {
    name: 'Sidebar',
    props: {
        currentElement: String
    },
    methods: {
        checkCurrentUserIsAdmin() {
            return userService.getCurrentUser().role.name === 'ADMIN'
        }
    }
}
</script>