import React, { Component } from 'react';
import './../App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import { ListGroup, Table } from 'react-bootstrap';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/'
})



class App extends Component {

  state = {
    measurements: []
  };

  constructor() {
    super();
    this.getMeasurements();
  }

    getMeasurements = async () => {
        var pathArray = window.location.pathname.split('/');
        var id = pathArray[2];
        try {
            let data = await api.get('measurements?sensor_id=' + id).then(({ data }) => data);
            this.setState({ measurements: data })
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }
  
  render() {
    return (
        <div className="App">
            <header className="App-header">

            <Table striped bordered hover size="sm" variant="dark">
                <thead>
                    <tr>
                        <th>TYPE</th>
                        <th>VALUE</th>
                        <th>DATE</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.measurements
                        .map(measurement =>
                            <tr key={measurement.id}>
                                <td>{measurement.measurementType}</td>
                                <td>{measurement.value}</td>
                                <td>{measurement.date}</td>
                            </tr>)}
                </tbody>
            </Table>
            </header>
        </div>
    );
  }
}

export default App;
