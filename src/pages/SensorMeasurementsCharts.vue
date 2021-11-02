<template>
  <Navbar/>
  <div class="container-fluid">
    <div class="row">
      <Sidebar currentElement="sensors"/>
      <div class="col-md-9 ml-sm-auto col-lg-10 p-4">

        <h3>Sensor Measurements Charts</h3>
        <hr/>
        <a href="/sensors"><i class="fa fa-chevron-left" aria-hidden="true"></i> back</a>
        <hr/>
        <div v-if="sensorType === 'SOIL_MOISTURE'">
          <ChartSensor v-bind:info='{sensorId: this.sensorId, type: "SOIL_MOISTURE"}' :width="85" :height="40"/>
        </div>
        <div v-if="sensorType === 'TEMPERATURE_AND_HUMIDITY'">
          <ChartSensor v-bind:info='{sensorId: this.sensorId, type: "HUMIDITY"}' :width="85" :height="20"/>
          <ChartSensor v-bind:info='{sensorId: this.sensorId, type: "TEMPERATURE"}' :width="85" :height="20"/>
        </div>
          
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ChartSensor from '../components/ChartSensor';
import { sensorService } from '../services';

export default {
  components: { Navbar, Sidebar, ChartSensor },
  data () {
        return {
            sensorId: null,
            sensorType: null,
        }
    },
    created () {
      this.sensorId = this.$route.params.id;
      sensorService.getOne(this.sensorId)
        .then(response => this.sensorType = response.measurementType)
    }
};
</script>
