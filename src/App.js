import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar,Nav,NavDropdown } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Sensor from './sensor/Sensor';
import AddSensor from './sensor/AddSensor';
import Place from './place/Place';
import SensorMeasurement from './measurement/SensorMeasurement';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">IoT managment app</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/measurements">Measurements</Nav.Link>
                <NavDropdown title="Sensors" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/sensor">Show</NavDropdown.Item>
                  <NavDropdown.Item href="/add-sensor">Add Sensor</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Places" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/place">Show</NavDropdown.Item>
                  <NavDropdown.Item href="#add-place">Add Place</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        <Router>
          <Switch>
            <Route path="/sensor" component={ Sensor } />
            <Route path="/add-sensor" component={ AddSensor } />
            <Route path="/place" component={ Place } />
            <Route path="/sensor-measurement/:id" component={ SensorMeasurement } />
          </Switch>
        </Router>
        <header className="App-header"></header>
      </div>
    );
  }
}

export default App;
