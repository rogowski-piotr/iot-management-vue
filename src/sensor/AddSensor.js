import React, { Component } from 'react';
import './../App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Button } from 'react-bootstrap';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/'
})

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
                <Form.Group>
                    <Form.Label>Socket</Form.Label>
                    <Form.Control size="sm" type="text" placeholder="Socket" />
                    <br />
                    <Form.Label>Place</Form.Label>
                    <Form.Control size="sm" as="select">
                        <option>Option 1</option>
                        <option>Option 1</option>
                    </Form.Control>
                    <Form.Label>Measurement Frequency</Form.Label>
                    <Form.Control size="sm" as="select">
                        <option>once per minute</option>
                        <option>once per day</option>
                    </Form.Control>
                    <Form.Label>Measurement Type</Form.Label>
                    <Form.Control size="sm" as="select">
                        <option>temperature and humidity</option>
                        <option>temperature</option>
                        <option>humidity</option>
                    </Form.Control>
                </Form.Group>
                <Button type="submit">Add sensor</Button>
            </header>
        </div>
    );
  }
}

export default App;