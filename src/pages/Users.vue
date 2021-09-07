<template>
  <Navbar/>
  <div class="container-fluid">
    <div class="row">
      <Sidebar currentElement="users"/>
      <div class="col-md-9 ml-sm-auto col-lg-10 p-4">

        <h3>Users</h3>
        <hr/>
        <AllUsers/>
          
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AllUsers from '../components/AllUsers';

export default {
  components: { Navbar, Sidebar, AllUsers },
};
</script>
