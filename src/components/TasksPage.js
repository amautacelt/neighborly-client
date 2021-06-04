import React, { Component } from "react"; 
import TaskCollection from './TaskCollection';
import FilterBar from './FilterBar'
import {Link} from 'react-router-dom'

// const tasksUrl = 'http://localhost:3000/tasks';

class TasksPage extends Component {

    render() {
        return (
        <div>
            <FilterBar 
                options={this.props.categories} 
                filterTaskCategory={this.props.filterTaskCategory}
                filterHasVolunteer={this.props.filterHasVolunteer}/>
            <Link to={'/tasks/new'}> Add New Task </Link>
            <TaskCollection 
                tasks={this.props.tasks}
                categories={this.props.categories}
                updateTask={this.props.updateTask}
                deleteTask={this.props.deleteTask}
                volunteerForTask={this.props.volunteerForTask}
            />
        </div>
        )
    }


}

export default TasksPage;