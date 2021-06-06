import React, { Component } from 'react';
import './../App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import { ListGroup } from 'react-bootstrap';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/'
})

function getMeasurementURL(id) {
  return '/sensor-measurement/' + id;
}

class App extends Component {

  state = {
    sensors: []
  };

  constructor() {
    super();
    this.getSensors();
  }

  getSensors = async () => {
    try {
      let data = await api.get('sensors/').then(({ data }) => data);
      this.setState({ sensors: data })
    } catch (err) {
      console.log(err)
    }
  }

  createSensor = async () => {
    let res = await api
      .post('sensors/', {  "socket": "192.168.0.22:50007","measurementType": "TEMPERATURE_AND_HUMIDITY","measurementsFrequency": "ONCE_PER_MINUTE","actualPositionPlaceId": "60bb63aedf5c0b2f0fcd689e" })
      .catch(err => console.log(err))
    this.getSensors();
  }

  deleteSensor = async (id) => {
    let data = await api
      .delete(`sensors/${id}`)
      .catch(err => console.log(err))
    this.getSensors();
  }

  updateSensor = async (id, val) => {
    let data = await api
      .put(`sensors/${id}`, {  "socket": "192.168.0.22:50007","measurementType": "TEMPERATURE_AND_HUMIDITY","measurementsFrequency": "ONCE_PER_MINUTE","actualPositionPlaceId": "60bb63aedf5c0b2f0fcd689e" })
      .catch(err => console.log(err))
    this.getSensors()
  }

  
  
  render() {
    return (
        <div className="App">
            <header className="App-header">
                <ListGroup>
                {this.state.sensors
                    .map(sensor =>
                        <ListGroup.Item variant='dark'>
                            <div key={sensor.id}>
                                {sensor.socket}  
                                <button class="btn btn-primary m-1" onClick={()=>this.deleteSensor(sensor.id)}>delete</button>
                                <button class="btn btn-primary m-1" onClick={()=>this.updateSensor(sensor.id)}>update</button>
                                <a href={getMeasurementURL(sensor.id)} class="btn btn-primary m-1">measurements</a>
                            </div>
                        </ListGroup.Item>)}
                </ListGroup>
            </header>
        </div>
    );
  }
}

export default App;
