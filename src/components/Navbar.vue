<template>
    <nav class="navbar navbar-light sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a style="color: white" class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">IoT Management</a>
        <span class="navbar-text">
            <div class="nav-item dropdown">
                <a style="color: white" class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{user.username}}</a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#">Settings</a>
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-item">
                        <router-link to="/login">Logout</router-link>
                    </div>
                </div>
            </div>
        </span>
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
    created () {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
}
</script>

<style scoped>
</style>