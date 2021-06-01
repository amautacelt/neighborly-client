import React, { Component } from "react"; 
import TaskCollection from './TaskCollection';

class TasksPage extends Component {
    state = {
        tasks: [],
    }


    componentDidMount() {
        fetch('http://localhost:3000/tasks')
        .then(res => res.json())
        .then(tasks => this.setState({tasks}))
    }

    render() {
        return (
        <div>
    
            <TaskCollection 
            tasks={this.state.tasks}
            />
        </div>
        )
    }


}

export default TasksPage;