import React from "react";
import EditTaskForm from "./EditTaskForm";

const TaskCard = props => {

    const editButton = () => {
        // debugger
        // console.log("hello")
        <EditTaskForm />
    }

    return (
        <div className="column">
            <div className="card">
                <h3 className="header">{props.task.name}</h3>
                <p>Category: {props.task.category}</p>
                <p>Description: {props.task.description}</p>
                <p>Duration: {props.task.duration}</p>
                <button className="edit-button" onClick={editButton}>
                    edit
                </button>
                <button className="delete-button">
                    delete
                </button>

            </div>
        </div>
    )
}

export default TaskCard;