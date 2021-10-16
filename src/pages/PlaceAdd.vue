<template>
  <Navbar/>
  <div class="container-fluid">
    <div class="row">
      <Sidebar currentElement="places"/>

      <div class="col-md-9 ml-sm-auto col-lg-10 p-4">

        <a href="/places"><i class="fa fa-chevron-left" aria-hidden="true"></i> back</a>
        <hr/>
        <h3>Add place</h3>
        <hr/>

        <div v-if="addStatus == false" class="alert alert-warning text-center" role="alert" id="alert-invalid-data">
            <h4 class="alert-heading">❌ Can not add! ❌</h4>
            <hr>
            <p class="mb-0">Fill the description* field in the below form</p>
        </div>

        <div v-if="addStatus == true" class="alert alert-success text-center" role="alert" id="alert-valid-data">
            <h4 class="alert-heading">✔️ Added correctly! ✔️</h4>
        </div>

        <div class="col-lg-6 offset-lg-2">

            <table class="table table-hover text-left">
                <tr>
                    <td></td>
                    <th scope="row">Description</th>
                    <td></td>
                    <td>
                        <input type="text" id="name" class="form-control" v-model="place.description">
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <th scope="row">Position X</th>
                    <td></td>
                    <td>
                        <input type="number" id="name" class="form-control" v-model="place.positionX">
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <th scope="row">Position Y</th>
                    <td></td>
                    <td>
                        <input type="number" id="name" class="form-control" v-model="place.positionY">
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <th scope="row">Position Z</th>
                    <td></td>
                    <td>
                        <input type="number" id="name" class="form-control" v-model="place.positionZ">
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
import { placeService } from '../services';

export default {
    components: { Navbar, Sidebar },
    data () {
        return {
            place: {
                description: null,
                positionX: null,
                positionY: null,
                positionZ: null
            },
            addStatus: null,
        }
    },
    methods: {
        add() {
            if (! this.validatePayload()) {
                this.addStatus = false;
                return;
            }
            placeService.add(this.place)
                .then(response => {
                    this.addStatus = response.status == 201 ? true : false;
                })
        },
        validatePayload() {
            return this.place.description != null
        }
    }
};
</script>