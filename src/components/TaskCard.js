import React, { Component } from "react";
import EditTaskForm from "./EditTaskForm";

class TaskCard extends Component {

    state = {
        showEditForm: false,
        buttonEditLabel: "edit"
    }

    showEditForm = () => {
        this.setState({showEditForm: !this.state.showEditForm, 
            buttonEditLabel: this.state.buttonEditLabel === "hide edit form" ? "edit" : "hide edit form"});
    }

    render() {
        // console.log(this.props.task)
        return (
            <div className="column">
                <div className="card">
                    <h3 className="header">{this.props.task.name}</h3>
                    <p>Category: {this.props.task.category}</p>
                    <p>Description: {this.props.task.description}</p>
                    <p>Duration: {this.props.task.duration}</p>
                    <p>Has Volunteer: {this.props.task.has_volunteer ? "True" : "False"}</p>
                    <button onClick={this.showEditForm}> {this.state.buttonEditLabel}</button>
                        {
                            this.state.showEditForm 
                            ? <EditTaskForm task={this.props.task} 
                                            options={this.props.categories} 
                                            updateTask={this.props.updateTask}
                                /> 
                            : null
                        }
                    <button onClick={() => this.props.deleteTask(this.props.task)} className="delete-button">
                        delete
                    </button>
    
                </div>
            </div>
        )
    }
    
}

export default TaskCard;