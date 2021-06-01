import "./App.css";
import React, { Component } from "react";
import TasksPage from "./components/TasksPage";
import FilterBar from "./components/FilterBar";

const tasksUrl = 'http://localhost:3000/tasks';

class App extends Component {

  state = {
    categories: [],
    category: "",
    hasVolunteer: false,
    tasks: [],
  }

  componentDidMount() {
      fetch(tasksUrl)
      .then(res => res.json())
      .then(tasks => {
        this.createCategories(tasks);
        this.setState({tasks})
      })
  }
  
  filterTasks = (filterValue, filterName) => {
    this.setState({[filterName]: filterValue})
  }
  
  render() {
    return (
      <div className="App">
        <FilterBar options={this.state.categories} filterTasks={this.filterTasks}/>
        <TasksPage tasks={this.state.tasks}/>
      </div>
    );
  }

  //helper functions
  
  createCategories = (tasks) => {
    let categories = [];
    tasks.forEach(task => {
      if(!categories.includes(task.category))
      {
        categories.push(task.category)
      }
    })
    this.setState({categories})  
  }
}

export default App;
