import React, { Component } from "react";
import List from "./components/resultList";
import { TextField, Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { AddItemPop } from "./components/addNewAPIItem";
import AddIcon from '@material-ui/icons/Add';
import { API_ACTION_GET_ALL_ITEMS } from "./AppConstants";
import './App.css';

class App extends Component {
  state = {
    APIs: [],
    searchTerm: "",
    results: [],
    displayPop: false,
  };

  editSearchTerm = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  dynamicSearch = (e) => {
    if (e.key === "Enter") {
      this.setState({
        results: this.state.searchTerm
          ? this.state.APIs.filter((api) =>
              api.uniqueTitle
                .toLowerCase()
                .includes(this.state.searchTerm.toLowerCase())
            )
          : this.state.APIs,
      });
    }
  };

  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
    /*
      stop getData() from continuing to run even
      after unmounting this component. Notice we are calling
      'clearTimeout()` here rather than `clearInterval()` 
    */
    clearTimeout(this.intervalID);
  }

  // @todo: push list to cache and query with user data [cache refreshes on every 30 sec - 1 minute]

  getData = () => {
    fetch(API_ACTION_GET_ALL_ITEMS)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ APIs: data, results: data });
        this.intervalID = setTimeout(this.getData.bind(this), 3000);
      })
      .catch(console.log);
  };

  showAddItemPopUp = () => {
    this.setState({ displayPop: true });
  };

  closeAddItemPopUp = () => {
    this.setState({ displayPop: false });
  };

  render() {
    return (
      <div className="app">
        <div className="AddItemButton paddingTop">
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="primary"
            onClick={this.showAddItemPopUp}>
            Add New Item
          </Button>
          <AddItemPop
            pop={this.state.displayPop}
            onClose={this.closeAddItemPopUp}/>
        </div>
        <div className="searchComp paddingTop">
          <Autocomplete
            id="search"
            options={this.state.APIs.map((api) => api.uniqueTitle)}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search"
                value={this.state.searchTerm}
                onChange={this.editSearchTerm}
                onKeyDown={this.dynamicSearch}
              />
            )}
          />
          <br />
          <List apis={this.state.results} />
        </div>
      </div>
    );
  }
}

export default App;
