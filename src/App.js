import "./App.css";
import React, { Component } from "react";
import TasksPage from "./components/TasksPage";
import FilterBar from "./components/FilterBar";

const tasksUrl = 'http://localhost:3000/tasks';

class App extends Component {

  state = {
    categories: [],
    category: "",
    hasVolunteerFilter: false,
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
  
  filterTaskCategory = (category) => {
    this.setState({category})
  }

  filterHasVolunteer = () => {
    this.setState({hasVolunteerFilter: !this.state.hasVolunteerFilter})
  }
  
  render() {
    return (
      <div className="App">
        <FilterBar options={this.state.categories} 
                   filterTaskCategory={this.filterTaskCategory}
                   filterHasVolunteer={this.filterHasVolunteer}/>
        <TasksPage tasks={
          this.state.tasks.filter(this.state.category !== "" 
                                  ? (task => task.category === this.state.category) 
                                  : (task => task))
                          .filter(this.state.hasVolunteerFilter ? task => !task.has_volunteer : task => task)
        }
        />
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
