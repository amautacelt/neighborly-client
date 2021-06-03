import "./App.css";
import React, { Component } from "react";
import TasksPage from "./components/TasksPage";
import FilterBar from "./components/FilterBar";
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
    showForm: false,
    buttonLabel: "Add Task"
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

  submitNewTask = (newtask) => {
    newtask.user_id = 1;
    newtask.has_volunteer = false;
    fetch(tasksUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(newtask)
    })
    .then(res => res.json())
    .then(console.log)
    // debugger
  }

  showForm = () => {
    console.log('showing form');
    this.setState({showForm: !this.state.showForm, buttonLabel: this.state.buttonLabel === "Add Task" ? "Hide Form" : "Add Task"});

    // <AddTaskForm options={this.state.categories} submitTask={this.submitNewTask}/>
  }
  

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
      <div className="App">
        <button onClick={this.showForm}> {this.state.buttonLabel}</button>
        {this.state.showForm ? <AddTaskForm options={this.state.categories} submitTask={this.submitNewTask}/> : null}

        <FilterBar options={this.state.categories}
                  filterTaskCategory={this.filterTaskCategory}
                  filterHasVolunteer={this.filterHasVolunteer}/>
        <TasksPage categories={this.state.categories}
                  updateTask={this.updateTask}
                  tasks={ this.state.tasks.filter(this.state.category !== "" 
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
