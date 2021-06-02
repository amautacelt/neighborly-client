import { Component } from "react";

export default class EditTaskForm extends Component{

    state = {
        name: '',
        duration: '',
        description: '',
        category: ''
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.updateTask(this.state);
    }

    render(){
        return(
            <div>FORM
                <form onSubmit={this.handleSubmit}>
                    <label> Name of Task
                        <input type='text' name='name' placeholder='Name' value={this.state.name} 
                        onChange={(event) => this.setState({name: event.target.value})}/>
                    </label>
                    <br></br>
                    <label> Duration of Task
                        <input type='text' name='duration' placeholder='Duration' value={this.state.duration}
                        onChange={(event) => this.setState({duration: event.target.value})}/>
                    </label>
                    <br></br>
                    <label> Description of Task
                        <input type='text' name='description' placeholder='Description' value={this.state.description}
                        onChange={(event) => this.setState({description: event.target.value})}/>
                    </label>
                    <br></br>
                    <label> Category of Task
                        <select name='category' onChange={(event) => this.setState({category: event.target.value})}>Type of Task
                            <option selected disabled value="">Choose Category</option>
                            {this.props.options.map(option => {
                                return <option key={option} value={option}>{option}</option>
                            })}
                        </select>
                    </label>
                    <br></br>
                    <input type='submit' value='Submit New Task'/>
                </form>
            </div>
        )
    }
}