import React, { Component } from 'react';
import List from './components/apis';

import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

class App extends Component {

  state = {
    APIs: [],
    searchTerm: '',
    results: []
  }

  editSearchTerm = (e) => {
    this.setState({searchTerm: e.target.value});

  }

  dynamicSearch = (e) => {
    if (e.key === 'Enter') {
      this.setState({results: this.state.searchTerm ? this.state.APIs.filter(api => api.uniqueTitle.toLowerCase().includes(this.state.searchTerm.toLowerCase())) : this.state.APIs})
    }
  }

  componentDidMount() {
    fetch('http://aas-backend.azurewebsites.net/api/AASItem')
    .then(res => res.json())
    .then((data) => {
      this.setState({ APIs: data, results: data })
    })
    .catch(console.log)
  }

  render() {
    return (
      <div style={{padding: "10%"}}>
      <Autocomplete
        id="search"
        options={this.state.APIs.map((api) => api.uniqueTitle)}
        renderInput={(params) => (
          <TextField {...params}
            placeholder="Search"
            value = {this.state.searchTerm}
            onChange = {this.editSearchTerm}
            onKeyDown = {this.dynamicSearch}
          />
        )}
      />
      <br />
      <List apis={ this.state.results } />
      </div>
    );
  }
}

export default App;