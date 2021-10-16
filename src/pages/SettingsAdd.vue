<template>
  <Navbar/>
  <div class="container-fluid">
    <div class="row">
      <Sidebar currentElement="settings"/>

      <div class="col-md-9 ml-sm-auto col-lg-10 p-4">

        <a href="/settings"><i class="fa fa-chevron-left" aria-hidden="true"></i> back</a>
        <hr/>
        <h3>Add settings</h3>
        <hr/>

        <div v-if="addStatus == false" class="alert alert-warning text-center" role="alert" id="alert-invalid-data">
            <h4 class="alert-heading">❌ Can not add! ❌</h4>
            <hr>
            <p class="mb-0">Fill all fields in the below form or the password is incorrect</p>
        </div>

        <div v-if="addStatus == true" class="alert alert-success text-center" role="alert" id="alert-valid-data">
            <h4 class="alert-heading">✔️ Added correctly! ✔️</h4>
        </div>

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
                    <td>edit <i class="fa fa-pencil" aria-hidden="true"></i></td>
                    <td>
                        <button type="button" @click="sensorSetting.acceptableConsecutiveFailures += diffAcceptableConsecutiveFailures" class="btn btn-success font-weight-bold change-value d-inline">+</button>
                        <input type="number" class="form-control text-center d-inline" v-model="diffAcceptableConsecutiveFailures">
                        <button type="button" class="btn btn-danger font-weight-bold change-value d-inline" 
                            @click="(sensorSetting.acceptableConsecutiveFailures - diffAcceptableConsecutiveFailures >= 0)
                                ? sensorSetting.acceptableConsecutiveFailures -= diffAcceptableConsecutiveFailures
                                : sensorSetting.acceptableConsecutiveFailures">-</button>
                    </td>
                    <td>
                        <button type="button" @click="sensorSetting.cyclesToRefresh += diffCyclesToRefresh" class="btn btn-success font-weight-bold change-value d-inline">+</button>
                        <input type="number" class="form-control text-center d-inline" v-model="diffCyclesToRefresh">
                        <button type="button" class="btn btn-danger font-weight-bold change-value d-inline" 
                            @click="(sensorSetting.cyclesToRefresh - diffCyclesToRefresh >= 0)
                                ? sensorSetting.cyclesToRefresh -= diffCyclesToRefresh
                                : sensorSetting.cyclesToRefresh">-</button>
                    </td>
                    <td>
                        <button type="button" @click="sensorSetting.requestTimeout += diffRequestTimeout" class="btn btn-success font-weight-bold change-value d-inline">+</button>
                        <input type="number" class="form-control text-center d-inline" v-model="diffRequestTimeout">
                        <button type="button" class="btn btn-danger font-weight-bold change-value d-inline" 
                            @click="(sensorSetting.requestTimeout - diffRequestTimeout >= 0)
                                ? sensorSetting.requestTimeout -= diffRequestTimeout
                                : sensorSetting.requestTimeout">-</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input v-if="sensorSetting.name != 'default'" type="text" class="form-control badge badge-info text-center d-inline" v-model="sensorSetting.name">
                        <input v-else disabled type="text" class="form-control badge badge-warning text-center d-inline" v-model="sensorSetting.name">
                    </td>
                    <td>{{ this.sensorSetting.acceptableConsecutiveFailures }}</td>
                    <td>{{ this.sensorSetting.cyclesToRefresh }}</td>
                    <td>{{ this.sensorSetting.requestTimeout }}</td>
                </tr>
            </tbody>
        </table>

        <br/>
        <div class="text-center">
            <button @click="add" type="button" class="btn btn-primary">Add</button>
        </div>
          
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { sensorSettingsService } from '../services';

export default {
    components: { Navbar, Sidebar },
    data () {
        return {
            sensorSetting: {
                name: 'name',
                acceptableConsecutiveFailures: 1,
                cyclesToRefresh: 1,
                requestTimeout: 1000,
            },
            addStatus: null,
            diffAcceptableConsecutiveFailures: 1,
            diffCyclesToRefresh: 1,
            diffRequestTimeout: 100,
        }
    },
    methods: {
        add() {
            if (! this.validatePayload()) {
                this.addStatus = false;
                return;
            }
            sensorSettingsService.add(this.sensorSetting)
                .then(response => this.addStatus = response.status == 201 ? true : false)
        },
        validatePayload() {
            return this.sensorSetting.name != null
                && this.sensorSetting.acceptableConsecutiveFailures != null
                && this.sensorSetting.cyclesToRefresh != null
                && this.sensorSetting.requestTimeout != null
        }
    }
};
</script>
<style scoped>
    .change-value {
        height: 40px;
        width: 40px;
    }
    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    input[type=number] {
        padding-top: 1px;
        width: 70px;
    }
</style>