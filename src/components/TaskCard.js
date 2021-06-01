import React from "react";

const TaskCard = props => {
    return (
        <div className="column">
            <div className="card">
                <h3 className="header">{props.task.name}</h3>
                <p>
                    {props.task.category}
                </p>
            </div>
        </div>
    )
}

export default TaskCard;