<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="px-4">
            <a class="navbar-brand" href="#">IoT Management</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        </div>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item" v-bind:class = "{ active: (this.currentElement==='home') }">
                    <a class="nav-link" href="/">Home</a>
                </li>
                <li class="nav-item" v-bind:class = "{ active: (this.currentElement==='sensors') }">
                    <a class="nav-link" href="/sensors">Sensors</a>
                </li>
                <li class="nav-item" v-bind:class = "{ active: (this.currentElement==='places') }">
                    <a class="nav-link" href="#">Places</a>
                </li>
            </ul>
            <span class="navbar-text">
                <div class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{user.username}}</a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">Users</a>
                        <a class="dropdown-item" href="#">Settings</a>
                        <div class="dropdown-divider"></div>
                        <div class="dropdown-item">
                            <router-link to="/login">Logout</router-link>
                        </div>
                    </div>
                </div>
            </span>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    data () {
        return {
            user: {}
        }
    },
    props: {
        currentElement: String
    },
    created () {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
}
</script>

<style scoped>
</style>