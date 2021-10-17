<template>
  <Navbar/>
  <div class="container-fluid">
    <div class="row">
      <Sidebar currentElement="sensors"/>
      <div class="col-md-9 ml-sm-auto col-lg-10 p-4">

        <a href="/sensors"><i class="fa fa-chevron-left" aria-hidden="true"></i> back</a>
        <hr/>
        <h3>Sensor details</h3>
        <hr/>

        <div class="col-lg-6 offset-lg-2">

            <table class="table table-hover text-left">
                <tr>
                    <td></td>
                    <th scope="row">Name</th>
                    <td></td>
                    <td colspan="2" v-if="sensor.name">{{ this.sensor.name }}</td>
                    <td colspan="2" v-else v-html="noDataLabel"></td>
                </tr>
                <tr>
                    <td></td>
                    <th scope="row">Socket</th>
                    <td></td>
                    <td colspan="2" v-if="sensor.socket">{{ this.sensor.socket }}</td>
                    <td colspan="2" v-else v-html="noDataLabel"></td>
                </tr>
                <tr>
                    <td></td>
                    <th scope="row">Active</th>
                    <td></td>
                    <td colspan="2" v-if="sensor.isActive != null">{{ this.sensor.isActive }}</td>
                    <td colspan="2" v-else v-html="noDataLabel"></td>
                </tr>
                <tr>
                    <td></td>
                    <th scope="row">Measurement Type</th>
                    <td></td>
                    <td colspan="2" v-if="sensor.measurementType">{{ this.sensor.measurementType }}</td>
                    <td colspan="2" v-else v-html="noDataLabel"></td>
                </tr>
                <tr>
                    <td></td>
                    <th scope="row">Measurements Frequency</th>
                    <td></td>
                    <td colspan="2" v-if="sensor.measurementsFrequency">{{ this.sensor.measurementsFrequency }}</td>
                    <td colspan="2" v-else v-html="noDataLabel"></td>
                </tr>
                <tr>
                    <td></td>
                    <th scope="row">Last Measurment</th>
                    <td></td>
                    <td colspan="2" v-if="sensor.lastMeasurment">{{ this.sensor.lastMeasurment }}</td>
                    <td colspan="2" v-else v-html="noDataLabel"></td>
                </tr>
                <tr>
                    <td></td>
                    <th scope="row">Actual Position</th>
                    <td></td>
                    <td colspan="2" v-if="sensor.actualPositionDescription">{{ this.sensor.actualPositionDescription }}</td>
                    <td colspan="2" v-else v-html="noDataLabel"></td>
                </tr>
            </table>

            <h3 class="d-inline">Settings</h3>
            <a class="btn btn-info ml-3" v-bind:href="'/settings/' + sensor.sensorSettings.id + '/edit'">edit <i class="fa fa-pencil" aria-hidden="true"></i></a>
            <br/><br/>

            <table class="table table-hover text-center">
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Acceptable Consecutive Failures</th>
                    <th scope="col">Cycles To Refresh</th>
                    <th scope="col">Request Timeout</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td v-if="sensor.sensorSettings.name">{{ this.sensor.sensorSettings.name }}</td>
                        <td v-else v-html="noDataLabel"></td>

                        <td v-if="sensor.sensorSettings.acceptableConsecutiveFailures">{{ this.sensor.sensorSettings.acceptableConsecutiveFailures }}</td>
                        <td v-else v-html="noDataLabel"></td>

                        <td v-if="sensor.sensorSettings.cyclesToRefresh">{{ this.sensor.sensorSettings.cyclesToRefresh }}</td>
                        <td v-else v-html="noDataLabel"></td>

                        <td v-if="sensor.sensorSettings.requestTimeout">{{ this.sensor.sensorSettings.requestTimeout }} ms</td>
                        <td v-else v-html="noDataLabel"></td>
                    </tr>
                </tbody>
            </table>

        </div>
          
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { sensorService } from '../services';

export default {
    components: { Navbar, Sidebar },
    data () {
        return {
            sensorId: null,
            sensor: {
                name: null,
                socket: null,
                isActive: null,
                measurementType: null,
                measurementsFrequency: null,
                lastMeasurment: null,
                actualPositionDescription: null,
                sensorSettings: {
                    id: null,
                    name: null,
                    acceptableConsecutiveFailures: null,
                    cyclesToRefresh: null,
                    requestTimeout: null
                },
            },
            noDataLabel: '<small>no data 😥</small>'
        }
    },
    created () {
        this.sensorId = this.$route.params.id;
        sensorService.getOne(this.sensorId)
            .then(response => {
                this.sensor.name = response.name
                this.sensor.socket = response.socket
                this.sensor.isActive = response.isActive
                this.sensor.measurementType = response.measurementType
                this.sensor.measurementsFrequency = response.measurementsFrequency
                this.sensor.lastMeasurment = response.lastMeasurment
                this.sensor.actualPositionDescription = response.actualPosition.description
                this.sensor.sensorSettings.id = response.sensorSettings.id
                this.sensor.sensorSettings.name = response.sensorSettings.name
                this.sensor.sensorSettings.acceptableConsecutiveFailures = response.sensorSettings.acceptableConsecutiveFailures
                this.sensor.sensorSettings.cyclesToRefresh = response.sensorSettings.cyclesToRefresh
                this.sensor.sensorSettings.requestTimeout = response.sensorSettings.requestTimeout
            })
    }
};
</script>
<style scoped>

</style>