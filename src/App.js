import "./App.css";
import React, { Component } from "react";
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Login from "./components/Login"
import NavBar from "./components/NavBar";
import UserPage from "./components/UserPage"
import TasksPage from "./components/TasksPage";
import AddTaskForm from "./components/AddTaskForm";

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
    user: undefined,
    volunteeredTasks: []
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

  getVolunteers = () => {
    const volunteeredTasks = [...this.state.tasks].filter(task => task.volunteer === this.state.user.id)
    this.setState({ volunteeredTasks })
  }
  
  filterTaskCategory = (category) => {
    this.setState({category})
  }

  filterHasVolunteer = () => {
    this.setState({hasVolunteerFilter: !this.state.hasVolunteerFilter})
  }

  submitNewTask = (newtask) => {
    newtask.user_id = this.state.user.id;
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
    task.volunteer = task.has_volunteer === "true" ? this.state.user.id : null
    console.log(task)
    fetch(`${tasksUrl}/${task.id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({task})
    })
    .then(res => res.json())
    .then(
      (newTask) => {
      this.setState({
        tasks: this.state.tasks.map(t => t.id === newTask.id ? newTask : t),
      })
      }
    )
    .catch(err => console.error(err));
  }

  deleteTask = (task) => {
    fetch(`${tasksUrl}/${task.id}`, {
      method: 'DELETE',
      headers
    })
    .then(() => this.setState({ tasks: [...this.state.tasks].filter((t) => t !== task)}))
    .catch((err) => console.error(err))
  }

  // volunteerForTask = (task) => {
  //   task.has_volunteer = true;
  //   this.updateTask(task);
  //   const volunteer = {
  //     task_id: task.id,
  //     user_id: this.state.user.id
  //   }
  //   fetch(volunteersUrl, {
  //     method: 'POST',
  //     headers,
  //     body: JSON.stringify({volunteer})
  //   })
  //   .then(res => res.json())
  //   .then(volunteeredTask => this.setState({volunteeredTasks: [...this.state.volunteeredTasks, volunteeredTask]}))
  //   .catch(err => console.error(err));
  //}

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar userLoggedIn={this.state.user ? true : false}/>
          <Switch>
            <Route exact path='/' render={this.logout} />
            <Route exact path='/login' render={(props) => <Login {...props} login={this.login}/>}/>
            <Route exact path='/tasks' render={ () => 
            (this.state.user ? 
            <TasksPage 
              tasks={
                this.state.tasks.filter(this.state.category !== "" 
                ? (task => task.category === this.state.category) 
                : (task => task))
                .filter(this.state.hasVolunteerFilter ? task => !task.has_volunteer : task => task)}
              categories={this.state.categories}
              filterTaskCategory={this.filterTaskCategory}
              filterHasVolunteer={this.filterHasVolunteer}
              updateTask={this.updateTask}
              deleteTask={this.deleteTask}
              volunteerForTask={this.volunteerForTask}
                  
              /> 
              : <Redirect to='/login'/> 
                )
              }
            />
            <Route 
              exact path='/tasks/new' 
              render={ (routerProps) => (this.state.user 
                ? <AddTaskForm {...routerProps} options={this.state.categories} 
                  submitTask={this.submitNewTask}/>
                : <Redirect to='/login' />)
              } 
            />
            {/* <Route 
                    exact path='/tasks/edit' 
                    render={ (routerProps) => (this.state.user 
                        ? <EditTaskForm {...routerProps} options={this.state.categories} 
                        updateTask={this.updateTask}
                        deleteTask={this.deleteTask}/>
                        : <Redirect to='/login' />)
                    } 
                /> */}
            <Route 
              exact path='/home' 
              render= { 
                (routerProps) => (this.state.user 
                  ? <UserPage {...routerProps} user={this.state.user} 
                      getVolunteeredTasks={this.getVolunteers}
                      volunteeredTasks={this.state.volunteeredTasks}
                      getUserTasks={this.getTasks}
                      userTasks={this.state.tasks.filter(task => task.user_id === this.state.user.id)}
                    /> 
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
  filterToUserVolunteeredTasks = (volunteeredTasks) => {
    const userVolunteeredTaskIds = volunteeredTasks.map(volunteered => volunteered.task_id);
    const allTasks = this.state.tasks;
    let tasksUserVolunteered = allTasks.filter(task => userVolunteeredTaskIds.includes(task.id))
    this.setState({ volunteeredTasks: tasksUserVolunteered })
  }
}


export default App;
