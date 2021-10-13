<template>
  <Navbar/>
  <div class="container-fluid">
    <div class="row">
      <Sidebar currentElement="places"/>

      <div class="col-md-9 ml-sm-auto col-lg-10 p-4">

        <a href="/places"><i class="fa fa-chevron-left" aria-hidden="true"></i> back</a>
        <hr/>
        <h3>Edit place</h3>
        <hr/>

        <div v-if="updateStatus != 202 && updateStatus != null" class="alert alert-warning text-center" role="alert" id="alert-invalid-data">
            <h4 class="alert-heading">❌ Can not update! ❌</h4>
            <hr>
            <p class="mb-0">Fill all fields in the below form</p>
        </div>

        <div v-if="updateStatus === 202" class="alert alert-success text-center" role="alert" id="alert-valid-data">
            <h4 class="alert-heading">✔️ Updated correctly! ✔️</h4>
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
                <button @click="update" type="button" class="btn btn-primary">Update</button>
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
            placeId: null,
            place: {
                description: null,
                positionX: null,
                positionY: null,
                positionZ: null
            },
            updateStatus: null,
        }
    },
    created () {
        this.placeId = this.$route.params.id;
        placeService.getOne(this.placeId)
            .then(response => {
                this.place.description = response.description
                this.place.positionX = response.positionX
                this.place.positionY = response.positionY
                this.place.positionZ = response.positionZ
            })
    },
    methods: {
        update() {
            placeService.update(this.placeId, this.place)
                .then(response => this.updateStatus = response.status)
        },
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