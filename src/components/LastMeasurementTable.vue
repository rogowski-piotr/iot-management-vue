<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">

                <div v-if="this.sensorId">
                    <table class="table table-hover text-center">
                        <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Type</th>
                            <th scope="col">Value</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="measurement in lastMeasurements" :key="measurement.id">
                            <td><div class="time-text">{{ this.getTime(measurement.date) }}</div><br/>{{ this.getDate(measurement.date) }}</td>
                            <td>{{ measurement.measurementType + " " + this.transformSensorName(measurement.measurementType, "") }}</td>
                            <td><div class="font-weight-bold">{{ this.transformValue(measurement.measurementType, measurement.value) }}</div></td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div v-else>
                    <table class="table table-hover text-center">
                        <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Sensor</th>
                            <th scope="col">Value</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="measurement in lastMeasurements" :key="measurement.id">
                            <td><div class="time-text">{{ this.getTime(measurement.date) }}</div><br/>{{ this.getDate(measurement.date) }}</td>
                            <td>{{ this.transformSensorName(measurement.measurementType, measurement.sensorName) }}</td>
                            <td><div class="font-weight-bold">{{ this.transformValue(measurement.measurementType, measurement.value) }}</div></td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { measurementService } from '../services';

export default {
    name: 'LastMeasurementTable',
    props: {
        sensorId: String,
        dateFrom: Date,
        dateTo: Date,
    },
    data () {
        return {
            lastMeasurements: [],
        }
    },
    mounted () {
        if (this.sensorId && (this.dateFrom || this.dateTo)) {
            measurementService.getLastMeasurementsInDateRange(this.sensorId, this.dateFrom, this.dateTo)
                .then(response => this.lastMeasurements = response);

        } else if (this.dateFrom || this.dateTo) {
            measurementService.getLastMeasurementsAllInDateRange(this.dateFrom, this.dateTo)
                .then(response => this.lastMeasurements = response);

        } else if (this.sensorId) {
            measurementService.getLastMeasurements(this.sensorId)
                .then(response => this.lastMeasurements = response);

        } else {
            measurementService.getLastMeasurementsAll()
                .then(response => this.lastMeasurements = response);
        }
    },
    methods: {
        getTime: function(datetime) {
            let _datetime = new Date(datetime)
            return _datetime.toLocaleTimeString("pl-PL");
        },
        getDate: function(datetime) {
            let _datetime = new Date(datetime)
            return _datetime.toLocaleDateString("pl-PL");
        },
        transformSensorName: function(type, name) {
            switch (type) {
                case 'TEMPERATURE':
                    return '🌡 ' + name;
                case 'HUMIDITY':
                    return '💧 ' + name;
                case 'SOIL_MOISTURE':
                    return '🌱💧 ' + name;
                default:
                    return '🤷‍♂️ CAN NOT DEFINE'
            }
        },
        transformValue: function(type, value) {
            switch (type) {
                case 'TEMPERATURE':
                    return Math.round(value * 100) / 100 + ' °C';
                case 'HUMIDITY':
                    return Math.round(value * 100) / 100 + ' %';
                case 'SOIL_MOISTURE':
                    return Math.round(value * 100) / 100;
                default:
                    return '🤷‍♂️ CAN NOT DEFINE'
            }
        },
  }
}
</script>

<style scoped>
br {
  content: "";
  margin: 0.5em;
  display: block;
}
.time-text {
    font-size: 130%;
}
</style>