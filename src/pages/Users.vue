<template>
  <Navbar/>
  <div class="container-fluid">
    <div class="row">
      <Sidebar currentElement="users"/>
      <div class="col-md-9 ml-sm-auto col-lg-10 p-4">

        <h3>Users</h3>
        <hr/>
        <a href="/users/add" type="button" class="btn btn-warning">Add new user</a>
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
<style scoped>
  .btn {
    margin-bottom: 15px;
  }
</style>