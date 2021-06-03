import React, { Component } from "react"; 
import TaskCollection from './TaskCollection';

// const tasksUrl = 'http://localhost:3000/tasks';

class TasksPage extends Component {
    // state = {
    //     tasks: [],
    // }

    // componentDidMount() {
    //     fetch(tasksUrl)
    //     .then(res => res.json())
    //     .then(tasks => this.setState({tasks}))
    // }

    render() {
        return (
        <div>
    
            <TaskCollection 
                tasks={this.props.tasks}
                categories={this.props.categories}
                updateTask={this.props.updateTask}
            />
        </div>
        )
    }


}

export default TasksPage;