<template>
  <Navbar/>
  <div class="container-fluid">
    <div class="row">
      <Sidebar currentElement="sensors"/>
      <div class="col-md-9 ml-sm-auto col-lg-10 p-4">

        <h3>Sensor Measurements</h3>
        <hr/>
        <a href="/sensors"><i class="fa fa-chevron-left" aria-hidden="true"></i> back</a>
        <hr/>
        
        
          
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
