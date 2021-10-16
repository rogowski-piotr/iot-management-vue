<template>
  <Navbar/>
  <div class="container-fluid">
    <div class="row">
      <Sidebar currentElement="sensors"/>
      <div class="col-md-9 ml-sm-auto col-lg-10 p-4">

        <h3>Sensors</h3>
        <hr/>
        <a href="/sensors/add" type="button" class="btn btn-warning">Add new sensor</a>
        <AllSensors/>
          
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AllSensors from '../components/AllSensors';

export default {
  components: { Navbar, Sidebar, AllSensors },
};
</script>
<style scoped>
  .btn {
    margin-bottom: 15px;
  }
</style>