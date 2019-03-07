import React, { Component } from 'react';
import NameForm from './components/NameForm';
import RegistrationForm from './components/RegistrationForm';
import './app.css';

class App extends Component {
  render() {
    return (
      <div className="registration-form">
        <RegistrationForm />
      </div>
    );
  }
}

export default App;
