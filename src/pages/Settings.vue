<template>
  <Navbar/>
  <div class="container-fluid">
    <div class="row">
      <Sidebar currentElement="settings"/>
      <div class="col-md-9 ml-sm-auto col-lg-10 p-4">

        <h3>Settings</h3>
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
