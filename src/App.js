import "./App.css";
import React, { Component } from "react";
import TasksPage from "./components/TasksPage";
import FilterBar from "./components/FilterBar";

class App extends Component {

  state = {
    filterOptions: ["Technology", "Advertising", "Government", "Education", "Other"],
    category: "",
    hasVolunteer: false
  }
  filterTasks = (filterValue, filterName) => {
    // debugger
    console.log(filterName)
    this.setState({[filterName]: filterValue})
  }

  render() {
    return (
      <div className="App">
        <FilterBar options={this.state.filterOptions} filterTasks={this.filterTasks}/>
        <TasksPage />
      </div>
    );
  }
}

export default App;
