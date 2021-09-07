<template>
    <div>
        <table class="table table-hover text-center">
            <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Socket</th>
                <th scope="col">Type</th>
                <th scope="col">Active</th>
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
                    <div v-if="! sensor.isActive" class="badge badge-pill badge-danger" style="font-size: 20px">{{ sensor.isActive }}</div>
                </td>
                <td>
                    <button type="button" class="btn btn-primary"><i class="far fa-eye"></i></button>
                    <button type="button" class="btn btn-success mx-1"><i class="fas fa-edit"></i></button>
                    <button type="button" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
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
        }
  }
}
</script>

<style scoped>
</style>