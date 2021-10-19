<template>
    <div>
        <table class="table table-hover text-center">
            <thead>
            <tr>
                <th scope="col">
                    Name
                    <div class="tooltip">
                        <i class="fa fa-question-circle-o" aria-hidden="true"></i>
                        <span class="tooltiptext">"default" settings must always exist. It is using if system can not find specific settings</span>
                    </div>
                </th>
                <th scope="col">
                    Acceptable Consecutive Failures 
                    <div class="tooltip">
                        <i class="fa fa-question-circle-o" aria-hidden="true"></i>
                        <span class="tooltiptext">Defines the number of failed connections after which it will be classified as not active</span>
                    </div>
                </th>
                <th scope="col">
                    Cycles To Refresh
                    <div class="tooltip">
                        <i class="fa fa-question-circle-o" aria-hidden="true"></i>
                        <span class="tooltiptext">Determines the number of cycles to connect to the sensor if it is not active</span>
                    </div>
                </th>
                <th scope="col">
                    Request Timeout
                    <div class="tooltip">
                        <i class="fa fa-question-circle-o" aria-hidden="true"></i>
                        <span class="tooltiptext">Defines the number of failed connections after which it will be classified as not active</span>
                    </div>
                </th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="sensorSetting in sensorSettings" :key="sensorSetting.id">
                <td><div class="badge badge-info" style="font-size: 20px">{{ sensorSetting.name }}</div></td>
                <td>{{ sensorSetting.acceptableConsecutiveFailures }}</td>
                <td>{{ sensorSetting.cyclesToRefresh }}</td>
                <td>{{ sensorSetting.requestTimeout }} ms</td>
                <td>
                    <a class="btn btn-success text-white mx-1" v-bind:href="'/settings/' + sensorSetting.id + '/edit'"><i class="fas fa-edit"></i></a>
                    <button v-if="sensorSetting.name != 'default'" class="btn btn-danger text-white" @click="deleteOne(sensorSetting.id)"><i class="far fa-trash-alt"></i></button>
                    <a v-else aria-disabled="true" class="btn btn-danger text-white disabled"><i class="far fa-trash-alt"></i></a>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { sensorSettingsService } from '../services';

export default {
    name: 'AllSettings',
    data () {
        return {
            sensorSettings: []
        }
    },
    mounted () {
        sensorSettingsService.getAll()
            .then(response => this.sensorSettings = response);
    },
    methods: {
        deleteOne(id) {
            sensorSettingsService.deleteOne(id)
            this.$router.go(0);
        }
    }
}
</script>