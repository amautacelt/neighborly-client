import { Component } from "react";

export default class EditTaskForm extends Component{

    state = {
        id: this.props.task.id,
        name: this.props.task.name,
        duration: this.props.task.duration,
        description: this.props.task.description,
        category: this.props.task.category,
        user_id: this.props.task.user_id,
        volunteer: this.props.task.has_volunteer
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.updateTask(this.state);
    }

    render(){
        return(
            <div>Edit Form
                <form onSubmit={this.handleSubmit}>
                    <label> Name of Task
                        <input class="mb-2 bg-warning text-dark" type='text' name='name' value={this.state.name} 
                        onChange={(event) => this.setState({name: event.target.value})}/>
                    </label>
                    <br></br>
                    <label> Duration of Task
                        <input class="mb-2 bg-warning text-dark" type='text' name='duration' value={this.state.duration}
                        onChange={(event) => this.setState({duration: event.target.value})}/>
                    </label>
                    <br></br>
                    <label> Description of Task
                        <input class="mb-2 bg-warning text-dark" type='text' name='description' value={this.state.description}
                        onChange={(event) => this.setState({description: event.target.value})}/>
                    </label>
                    <br></br>
                    <label> Category of Task
                        <select class="mb-2 bg-warning text-dark" name='category' onChange={(event) => this.setState({category: event.target.value})}>Type of Task
                            <option selected disabled value={this.state.category}>{this.state.category}</option>
                            {this.props.options.map(option => {
                                return <option key={option} value={option}>{option}</option>
                            })}
                        </select>
                    </label>
                    <br></br>
                    <input class="btn btn-outline-warning btn-sm" type='submit' value='submit edit'/>
                </form>
            </div>
        )
    }
}