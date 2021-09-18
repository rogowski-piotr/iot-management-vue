<template>
  <Navbar/>
  <div class="container-fluid">
    <div class="row">
      <Sidebar currentElement="dashboard"/>
      <div class="col-md-9 ml-sm-auto col-lg-10 p-4">

        <h2>Dashboard</h2>
        <hr/>

        <h3>Active sensors</h3>
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="row">
                <div class="col-md-4">
                  <ChartSensor v-bind:info='{sensorId: 2, type: "TEMPERATURE"}' :width="100" :height="100"/>
                </div>
                <div class="col-md-4">
                  <ChartSensor v-bind:info='{sensorId: 2, type: "HUMIDITY"}' :width="100" :height="100"/>
                </div>
                <div class="col-md-4">
                  <ChartSensor v-bind:info='{sensorId: 1, type: "SOIL_MOISTURE"}' :width="100" :height="100"/>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="row">
                <div class="col-md-4">
                  <ChartSensor v-bind:info='{sensorId: 2, type: "TEMPERATURE"}' :width="100" :height="100"/>
                </div>
                <div class="col-md-4">
                  <ChartSensor v-bind:info='{sensorId: 2, type: "HUMIDITY"}' :width="100" :height="100"/>
                </div>
                <div class="col-md-4">
                  <ChartSensor v-bind:info='{sensorId: 1, type: "SOIL_MOISTURE"}' :width="100" :height="100"/>
                </div>
              </div>
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>

        <div class="row">
          <div class="col-md-4">
            <h3>Last Measurements</h3>
            <LastMeasurementTable/>
          </div>
          <div class="col-md-8">
            <h3>Requests today</h3>
            <SuccessfulRequestRatioChart/>
          </div>
        </div>
          
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ChartSensor from '../components/ChartSensor';
import SuccessfulRequestRatioChart from '../components/SuccessfulRequestRatioChart';
import LastMeasurementTable from '../components/LastMeasurementTable';

export default {
  components: { Navbar, Sidebar, ChartSensor, SuccessfulRequestRatioChart, LastMeasurementTable },
};
</script>
