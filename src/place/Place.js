import React, { Component } from 'react';
import './../App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import { ListGroup } from 'react-bootstrap';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/'
})

class App extends Component {

  state = {
    places: []
  };

  constructor() {
    super();
    this.getPlaces();
  }

  getPlaces = async () => {
    try {
      let data = await api.get('places/').then(({ data }) => data);
      this.setState({ places: data })
    } catch (err) {
      console.log(err)
    }
  }

  createPlace = async () => {
    let res = await api
      .post('places/', {  "socket": "192.168.0.22:50007","measurementType": "TEMPERATURE_AND_HUMIDITY","measurementsFrequency": "ONCE_PER_MINUTE","actualPositionPlaceId": "60bb63aedf5c0b2f0fcd689e" })
      .catch(err => console.log(err))
    this.getPlaces();
  }

  deletePlace = async (id) => {
    let data = await api
      .delete(`places/${id}`)
      .catch(err => console.log(err))
    this.getPlaces();
  }

  updatePlace = async (id, val) => {
    let data = await api
      .put(`places/${id}`, {  "socket": "192.168.0.22:50007","measurementType": "TEMPERATURE_AND_HUMIDITY","measurementsFrequency": "ONCE_PER_MINUTE","actualPositionPlaceId": "60bb63aedf5c0b2f0fcd689e" })
      .catch(err => console.log(err))
    this.getPlaces()
  }
  
  render() {
    return (
        <div className="App">
            <header className="App-header">
                <ListGroup>
                {this.state.places
                    .map(place =>
                        <ListGroup.Item variant='dark'>
                            <div key={place.id}>
                                {place.description}  
                                <button class="btn btn-primary m-1" onClick={()=>this.deletePlace(place.id)}>delete</button>
                                <button class="btn btn-primary m-1" onClick={()=>this.updatePlace(place.id)}>update</button>
                            </div>
                        </ListGroup.Item>)}
                </ListGroup>
            </header>
        </div>
    );
  }
}

export default App;