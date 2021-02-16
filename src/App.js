import React, { Component } from "react";
import List from "./components/resultList";
import { TextField, Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { AddItemPop } from "./components/addNewAPIItem";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { API_ACTION_GET_ALL_ITEMS } from "./AppConstants";

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
      <>
        <Grid justify="space-between" container spacing={3}>
          <Grid direction="row-reverse" item xs={6} sm={3}>
            <div className=" AddItemButton">
              <Button
                variant="outlined"
                color="primary"
                onClick={this.showAddItemPopUp}
              >
                Add New Item
              </Button>
              <AddItemPop
                pop={this.state.displayPop}
                onClose={this.closeAddItemPopUp}
              ></AddItemPop>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{ padding: "10%" }}>
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
          </Grid>
        </Grid>
      </>
    );
  }
}

export default App;
