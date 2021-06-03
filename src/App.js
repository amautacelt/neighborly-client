import "./App.css";
import React, { Component } from "react";
import TasksPage from "./components/TasksPage";
import AddTaskForm from "./components/AddTaskForm";
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import NavBar from "./components/NavBar";
import UserPage from "./components/UserPage"
import Login from "./components/Login"

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
    user: undefined
  }
  //set up log in function
  login = (userLoggingIn) => {
    return fetch('http://localhost:3000/login', {
      method: 'POST',
      headers,
      body: JSON.stringify(userLoggingIn)
    })
    .then(res => res.json())
    .then(response => {
      if(response.error)
      {
        alert(response.error)
      } else {
        this.setState({user: response.user})
      }
    })
  }

  componentDidMount() {
      this.getTasks();
  }

  getTasks = () => {
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
    newtask.user_id = this.state.user.id;
    // console.log()
    newtask.has_volunteer = false;
    fetch(tasksUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(newtask)
    })
    .then(res => res.json())
    .then((newTask) => this.setState({tasks: [...this.state.tasks, newTask]}))
  }

  
  // logout = () => {
  //   this.setState({user: undefined})
  // }

  updateTask = (task) => {
    fetch(`${tasksUrl}/${task.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({task})
    })
    .then(res => res.json())
    .then((newTask) => {
      this.setState({
        tasks: this.state.tasks.map((t) => (t.id === newTask.id ? newTask : t)),
      });
    })
    .catch(err => console.error(err));
  }


  deleteTask = (task) => {
    fetch(`${tasksUrl}/${task.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(() => 
        this.setState({
          tasks: [...this.state.tasks.filter((t) => t !== task)],
        })
      )
      .catch((err) => console.log(err))
  }


  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar userLoggedIn={this.state.user ? true : false}/>
          <Switch>
            <Route exact path='/' render={this.logout} />
            <Route exact path='/login' render={(props) => <Login {...props} login={this.login}/>}/>
            <Route exact path='/tasks' render={ () => <TasksPage 
              tasks={
                this.state.tasks.filter(this.state.category !== "" 
                ? (task => task.category === this.state.category) 
                : (task => task))
                .filter(this.state.hasVolunteerFilter 
                  ? task => !task.has_volunteer 
                  : task => task)}
                  categories={this.state.categories}
                  filterTaskCategory={this.filterTaskCategory}
                  filterHasVolunteer={this.filterHasVolunteer}
                  updateTask={this.updateTask}
                  />
                }
            />
            <Route 
              exact path='/tasks/new' 
              render={ (routerProps) => <AddTaskForm {...routerProps} options={this.state.categories} 
                  submitTask={this.submitNewTask}/>
              } 
            />
            <Route 
              exact path='/home' 
              render= { 
                (routerProps) => (this.state.user 
                  ? <UserPage {...routerProps} user={this.state.user} 
                      getUserTasks={this.getTasks}
                      userTasks={this.state.tasks.filter(task => task.user_id === this.state.user.id)}/> 
                  : <Redirect to='/login' />) } 
            />
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
