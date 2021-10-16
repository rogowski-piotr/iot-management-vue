<template>
  <Navbar/>
  <div class="container-fluid">
    <div class="row">
      <Sidebar currentElement="sensors"/>

      <div class="col-md-9 ml-sm-auto col-lg-10 p-4">

        <a href="/sensors"><i class="fa fa-chevron-left" aria-hidden="true"></i> back</a>
        <hr/>
        <h3>Add sensor</h3>
        <hr/>

        <div v-if="addStatus == false" class="alert alert-warning text-center" role="alert" id="alert-invalid-data">
            <h4 class="alert-heading">❌ Can not add! ❌</h4>
            <hr>
            <p class="mb-0">Fill all fields in the below form</p>
        </div>

        <div v-if="addStatus == true" class="alert alert-success text-center" role="alert" id="alert-valid-data">
            <h4 class="alert-heading">✔️ Added correctly! ✔️</h4>
        </div>

        <div class="col-lg-6 offset-lg-2">

            <table class="table table-hover text-left">
                <tr>
                    <td></td>
                    <th scope="row">Name</th>
                    <td></td>
                    <td>
                        <input type="text" id="name" class="form-control" v-model="sensor.name">
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <th scope="row">Socket</th>
                    <td></td>
                    <td>
                        <input type="text" id="name" class="form-control" v-model="sensor.socket">
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <th scope="row">Measurement Type</th>
                    <td></td>
                    <td>
                        <select v-model="sensor.measurementType">
                            <option v-for="option in optionItemsMeasurementType" v-bind:key="option" :value="option">
                                {{ option }}
                            </option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <th scope="row">Measurements Frequency</th>
                    <td></td>
                    <td>
                        <select v-model="sensor.measurementsFrequency">
                            <option v-for="option in optionItemsMeasurementFrequencies" v-bind:key="option" :value="option">
                                {{ option }}
                            </option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <th scope="row">Actual Position</th>
                    <td></td>
                    <td>
                        <select v-model="sensor.actualPositionPlaceId">
                            <option v-for="option in optionItemsPlaces" v-bind:key="option.id" :value="option.id">
                                {{ option.description }}
                            </option>
                        </select>
                    </td>
                </tr>
            </table>

            <br/>
            <div class="text-center">
                <button @click="add" type="button" class="btn btn-primary">Add</button>
            </div>

        </div>
          
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { sensorService, measurementParamService, placeService } from '../services';

export default {
    components: { Navbar, Sidebar },
    data () {
        return {
            optionItemsMeasurementType: null,
            optionItemsMeasurementFrequencies: null,
            optionItemsPlaces: null,

            addStatus: null,

            sensor: {
                name: null,
                socket: null,
                measurementType: null,
                measurementsFrequency: null,
                actualPositionPlaceId: null
            },
        }
    },
    created () {
        measurementParamService.getAllTypes()
            .then(response => this.optionItemsMeasurementType = response)

        measurementParamService.getAllFrequencies()
            .then(response => this.optionItemsMeasurementFrequencies = response)

        placeService.getAll()
            .then(response => this.optionItemsPlaces = response)
    },
    methods: {
        add() {
            if (! this.validatePayload()) {
                this.addStatus = false;
                return;
            }
            sensorService.add(this.sensor)
                .then(response => {
                    this.addStatus = response.status == 201 ? true : false;
                })
        },
        validatePayload() {
            return this.sensor.name != null
                && this.sensor.socket != null
                && this.sensor.measurementType != null
                && this.sensor.measurementsFrequency != null
                && this.sensor.actualPositionPlaceId != null
        }
    }
};
</script>
<style scoped>
    select {
        background-color: transparent;
        border: 1px solid #ced4da;
        border-radius: .25rem;
        padding: 0 1em 0 0;
        margin: 0;
        width: 100%;
        height: calc(1.5em + .75rem + 2px);
        font-family: inherit;
        font-size: inherit;
        cursor: inherit;
        line-height: inherit;
    }
</style>