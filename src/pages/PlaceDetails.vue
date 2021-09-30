<template>
  <Navbar/>
  <div class="container-fluid">
    <div class="row">
      <Sidebar currentElement="places"/>
      <div class="col-md-9 ml-sm-auto col-lg-10 p-4">

        <a href="/places"><i class="fa fa-chevron-left" aria-hidden="true"></i> back</a>
        <hr/>
        <h3>Place details</h3>
        <hr/>

        <div class="col-lg-6 offset-lg-2">

            <table class="table table-hover text-left">
                <tr>
                    <td></td>
                    <th scope="row">Description</th>
                    <td></td>
                    <td colspan="2" v-if="place.description">{{ this.place.description }}</td>
                    <td colspan="2" v-else v-html="noDataLabel"></td>
                </tr>
                <tr>
                    <td></td>
                    <th scope="row">coordinate X</th>
                    <td></td>
                    <td colspan="2" v-if="place.positionX">{{ this.place.positionX }}</td>
                    <td colspan="2" v-else v-html="noDataLabel"></td>
                </tr>
                <tr>
                    <td></td>
                    <th scope="row">coordinate Y</th>
                    <td></td>
                    <td colspan="2" v-if="place.positionY">{{ this.place.positionY }}</td>
                    <td colspan="2" v-else v-html="noDataLabel"></td>
                </tr>
                <tr>
                    <td></td>
                    <th scope="row">coordinate Z</th>
                    <td></td>
                    <td colspan="2" v-if="place.positionZ">{{ this.place.positionZ }}</td>
                    <td colspan="2" v-else v-html="noDataLabel"></td>
                </tr>
            </table>

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
            noDataLabel: '<small>no data 😥</small>',
            placeId: null,
            place: {
                description: null,
                positionX: null,
                positionY: null,
                positionZ: null
            }
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
    }
};
</script>