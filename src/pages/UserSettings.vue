<template>
  <Navbar/>
  <div class="container-fluid">
    <div class="row">
      <Sidebar/>
      <div class="col-md-9 ml-sm-auto col-lg-10 p-4">

        <h3>User Settings</h3>
        <hr/>
        abc
          
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default {
  components: { Navbar, Sidebar },
};
</script>
