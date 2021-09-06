<template>
  <Navbar/>
  <div class="container-fluid">
    <div class="row">
      <Sidebar currentElement="places"/>
      <div class="ml-sm-auto col-lg-10 offset-1 p-4">

        <h3>Sensors</h3>
        <hr/>
        <AllPlaces/>
          
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar';
import AllPlaces from '../components/AllPlaces';
import Sidebar from '../components/Sidebar';

export default {
  components: { Navbar, Sidebar, AllPlaces },
};
</script>
