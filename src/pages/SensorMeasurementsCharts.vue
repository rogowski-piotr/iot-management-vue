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

        <div class="row" justify-content-center>
          <div class="span6 mb-2" style="float: none; margin: auto;">
            <input type="datetime-local" class="mx-2 pb-1" v-model="dateFrom">
            <input type="datetime-local" class="mx-2 pb-1" v-model="dateTo">
          </div>
        </div>

        <div v-if="sensorType === 'SOIL_MOISTURE'">
          <ChartSensor 
            :width="85" :height="40"
            v-bind:info='{sensorId: this.sensorId, type: "SOIL_MOISTURE"}'
            v-bind:dateFrom="new Date(this.dateFrom)" 
            v-bind:dateTo="new Date(this.dateTo)"/>
        </div>

        <div v-if="sensorType === 'TEMPERATURE_AND_HUMIDITY'">
          <ChartSensor 
            :width="85" :height="20"
            v-bind:info='{sensorId: this.sensorId, type: "HUMIDITY"}' 
            v-bind:dateFrom="new Date(this.dateFrom)" 
            v-bind:dateTo="new Date(this.dateTo)"/>

          <ChartSensor 
            :width="85" :height="20"
            v-bind:info='{sensorId: this.sensorId, type: "TEMPERATURE"}'
            v-bind:dateFrom="new Date(this.dateFrom)" 
            v-bind:dateTo="new Date(this.dateTo)"/>
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
            dateFrom: new Date().toISOString().split('T')[0] + 'T00:00',
            dateTo: new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0],
        }
    },
    created () {
      this.sensorId = this.$route.params.id;
      sensorService.getOne(this.sensorId)
        .then(response => this.sensorType = response.measurementType)
    }
};
</script>
