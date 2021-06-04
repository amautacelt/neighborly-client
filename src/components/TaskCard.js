import React, { Component } from "react";
import EditTaskForm from "./EditTaskForm";
// import {Link} from 'react-router-dom'

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
            <div className="row">
                <div className="col-sm-12">
                    <div className="card h-100 display: flex border-info text-center text-white bg-dark mb-3 max-width: 18rem">
                        <div className="card-body">
                            <h5 className="card-title text-info">{this.props.task.name}</h5>
                            <p className="card-subtitle mb-2 text-muted">Category: {this.props.task.category}</p>
                            <p className="card-text">Description: {this.props.task.description}</p>
                            <p className="card-footer text-muted border-info">Duration: {this.props.task.duration}</p>
                            <p>Has Volunteer: {this.props.task.has_volunteer ? "True" : "False"}</p>
                            <button className="btn btn-outline-warning btn-sm" onClick={this.showEditForm}> {this.state.buttonEditLabel}</button>
                                {
                                    this.state.showEditForm 
                                    ? <EditTaskForm task={this.props.task} 
                                                    options={this.props.categories} 
                                                    updateTask={this.props.updateTask}
                                        /> 
                                    : null
                                }
                            <button className="btn btn-outline-danger btn-sm" onClick={() => this.props.deleteTask(this.props.task)}>
                                delete
                            </button>
                        </div>
                    </div>
                
                        
                </div>
            </div>
    
            
        )
    }
    
}

export default TaskCard;