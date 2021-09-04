<template>
  <Navbar currentElement="sensors"/>
  <div class="row">
      <div class="col-md-6 offset-md-3">
          <div>
              <div>
                  <h3>Sensors</h3>
                  <hr/>
              </div>
              <AllSensors/>
          </div>
      </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar';
import AllSensors from '../components/AllSensors';

export default {
  components: { Navbar, AllSensors },
};
</script>
