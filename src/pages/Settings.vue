<template>
  <Navbar/>
  <div class="container-fluid">
    <div class="row">
      <Sidebar currentElement="settings"/>
      <div class="col-md-9 ml-sm-auto col-lg-10 p-4">

        <h3>Settings</h3>
        <hr/>
        <a href="/settings/add" type="button" class="btn btn-warning">Add new settings</a>
        <AllSettings/>
          
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AllSettings from '../components/AllSettings';

export default {
  components: { Navbar, Sidebar, AllSettings },
};
</script>
<style scoped>
  .btn {
    margin-bottom: 15px;
  }
</style>