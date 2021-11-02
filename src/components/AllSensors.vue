<template>
    <div>
        <table class="table table-hover text-center">
            <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Socket</th>
                <th scope="col">Type</th>
                <th scope="col">
                    Active
                    <div class="tooltip">
                        <i class="fa fa-question-circle-o" aria-hidden="true"></i>
                        <span class="tooltiptext">Activity is automatically determined based on the selected settings</span>
                    </div>
                </th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="sensor in sensors" :key="sensor.id">
                <td>{{ sensor.name }}</td>
                <td>{{ sensor.socket }}</td>
                <td>{{ transformMeasurementType(sensor.measurementType) }}</td>
                <td>
                    <div v-if="sensor.isActive" class="badge badge-pill badge-success" style="font-size: 20px">{{ sensor.isActive }}</div>
                    <div v-else class="badge badge-pill badge-danger" style="font-size: 20px">{{ sensor.isActive }}</div>
                </td>
                <td>
                    <a class="btn btn-info text-white" v-bind:href="'/sensors/' + sensor.id + '/measurements/charts'"><i class="fa fa-line-chart"></i></a>
                    <a class="btn btn-secondary text-white mx-1" v-bind:href="'/sensors/' + sensor.id + '/measurements'"><i class="fas fa-align-left"></i></a>
                    <a class="btn btn-primary text-white" v-bind:href="'/sensors/' + sensor.id"><i class="far fa-eye"></i></a>
                    <a class="btn btn-success text-white mx-1" v-bind:href="'/sensors/' + sensor.id + '/edit'"><i class="fas fa-edit"></i></a>
                    <button class="btn btn-danger text-white" @click="deleteOne(sensor.id)"><i class="far fa-trash-alt"></i></button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { sensorService } from '../services';

export default {
    name: 'AllSensors',
    data () {
        return {
            sensors: []
        }
    },
    mounted () {
        sensorService.getAll()
            .then(response => this.sensors = response);
    },
    methods: {
        transformMeasurementType: function(str) {
            switch (str) {
                case 'TEMPERATURE_AND_HUMIDITY':
                    return '🌡💧 Temperature & Humidity';
                case 'TEMPERATURE ':
                    return '🌡 Temperature';
                case 'HUMIDITY':
                    return '💧 Humidity';
                case 'SOIL_MOISTURE':
                    return '🌱💧 Soil Moisture';
                default:
                    return '🤷‍♂️ CAN NOT DEFINE'
            }
        },
        deleteOne(id) {
            sensorService.deleteOne(id)
            this.$router.go(0);
        }
    }
}
</script>