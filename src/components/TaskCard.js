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
        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="header">{this.props.task.name}</h3>
                            <p>Category: {this.props.task.category}</p>
                            <p>Description: {this.props.task.description}</p>
                            <p>Duration: {this.props.task.duration}</p>
                            <button className="btn btn-outline-warning btn-sm" onClick={this.showEditForm}> {this.state.buttonEditLabel}</button>
                                {
                                    this.state.showEditForm 
                                    ? <EditTaskForm task={this.props.task} 
                                                    options={this.props.categories} 
                                                    updateTask={this.props.updateTask}
                                        /> 
                                    : null
                                }
                            <button className="btn btn-outline-danger btn-sm" onClick={() => this.props.deleteTask(this.props.task)} className="delete-button">
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