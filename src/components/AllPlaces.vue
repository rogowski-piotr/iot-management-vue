<template>
    <div>
        <table class="table table-hover text-center">
            <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="place in places" :key="place.id">
                <td>{{ place.description }}</td>
                <td>
                    <a class="btn btn-primary text-white" v-bind:href="'/places/' + place.id"><i class="far fa-eye"></i></a>
                    <a class="btn btn-success text-white mx-1" v-bind:href="'/places/' + place.id + '/edit'"><i class="fas fa-edit"></i></a>
                    <button class="btn btn-danger text-white" @click="deleteOne(place.id)"><i class="far fa-trash-alt"></i></button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { placeService } from '../services';

export default {
    name: 'AllPlaces',
    data () {
        return {
            places: []
        }
    },
    mounted () {
        placeService.getAll()
            .then(response => this.places = response);
    },
    methods: {
        deleteOne(id) {
            placeService.deleteOne(id)
            this.$router.go(0);
        }
    }
}
</script>