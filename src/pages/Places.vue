<template>
  <Navbar currentElement="places"/>
  <div class="row">
      <div class="col-md-6 offset-md-3">
          <div>
              <div>
                  <h3>Places</h3>
                  <hr/>
              </div>
              <AllPlaces/>
          </div>
      </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar';
import AllPlaces from '../components/AllPlaces';

export default {
  components: { Navbar, AllPlaces },
};
</script>
