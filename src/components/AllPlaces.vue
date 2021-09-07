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
    }
}
</script>

<style scoped>
</style>