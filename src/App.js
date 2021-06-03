import "./App.css";
import React, { Component } from "react";
import TasksPage from "./components/TasksPage";
import AddTaskForm from "./components/AddTaskForm";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import NavBar from "./components/NavBar";
import UserPage from "./components/UserPage"

const tasksUrl = 'http://localhost:3000/tasks';
const headers = {
  'Content-Type': 'application/json',
  Accepts: 'application/json'
}

class App extends Component {

  state = {
    categories: [],
    category: "",
    hasVolunteerFilter: false,
    tasks: [],
    user: 1
  }
  //set up log in function
  //login = (state_from_form) => {
    // fetch('http://localhost:3000/login', {
    //   method: 'POST',
    //   headers,
    //   body: JSON.stringify(state.user)
    // })
    // .then(res => res.json())
    // .then(user => this.setState({user}))
  // }

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

  submitNewTask = (newtask) => {
    newtask.user_id = this.state.user;
    newtask.has_volunteer = false;
    fetch(tasksUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(newtask)
    })
    .then(res => res.json())
    .then((newTask) => this.setState({tasks: [...this.state.tasks, newTask]}))
  }

  
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path='/tasks' render={ () => <TasksPage 
              tasks={
                this.state.tasks.filter(this.state.category !== "" 
                ? (task => task.category === this.state.category) 
                : (task => task))
                .filter(this.state.hasVolunteerFilter 
                  ? task => !task.has_volunteer 
                  : task => task)}
                  options={this.state.categories}
                  filterTaskCategory={this.filterTaskCategory}
                  filterHasVolunteer={this.filterHasVolunteer}
                  />
                }
            />
            <Route 
              exact path='/tasks/new' 
              render={ (routerProps) => <AddTaskForm {...routerProps} options={this.state.categories} 
                  submitTask={this.submitNewTask}/>
              } 
            />
            <Route render={ () => <UserPage user_id={this.state.user}/> }/>
          </Switch>
        </div>
      </BrowserRouter>
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
