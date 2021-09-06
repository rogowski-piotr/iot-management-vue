<template>
    <div>
        <nav class="col-md-1 d-none d-md-block bg-light sidebar" style="position: fixed; font-size: 20px">
            <div class="sidebar-sticky active sticky-top vh-100 bg-light">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link pt-4" v-bind:class = "{ 'text-dark font-weight-bold': (this.currentElement==='home') }" href="/">
                        <i class="fa fa-home" aria-hidden="true"></i>
                        Home
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
            </ul>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Sidebar',
    props: {
        currentElement: String
    },
}
</script>

<style scoped>
</style>