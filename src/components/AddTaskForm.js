import { Component } from "react";

export default class AddTaskForm extends Component{

    state = {
        name: '',
        duration: '',
        description: '',
        category: ''
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitTask(this.state);
        this.props.history.push('/tasks')
    }

    render(){
        return(
            <div className="col">
                <div className="card">
                    <div className="card h-100 display: flex border-info text-center text-white bg-dark mb-3 max-width: 18rem">
                        <div className="card-body">
                            <div><h3>Add New Task</h3>
                                <form onSubmit={this.handleSubmit}>
                                    <label> Name
                                        <input className="col" type='text' name='name' placeholder='task name' value={this.state.name} 
                                        onChange={(event) => this.setState({name: event.target.value})}/>
                                    </label>
                                    <br></br>
                                    <label> Duration
                                        <input className="col" type='text' name='duration' placeholder='how long task will take' value={this.state.duration}
                                        onChange={(event) => this.setState({duration: event.target.value})}/>
                                    </label>
                                    <br></br>
                                    <label> Description
                                        <input className="col" type='text' name='description' placeholder='describe your request' value={this.state.description}
                                        onChange={(event) => this.setState({description: event.target.value})}/>
                                    </label>
                                    <br></br>
                                    <label> Category
                                        <select className="col" name='category' onChange={(event) => this.setState({category: event.target.value})}>Type of Task
                                            <option selected disabled value="">Choose Category</option>
                                            {this.props.options.map(option => {
                                                return <option key={option} value={option}>{option}</option>
                                            })}
                                        </select>
                                    </label>
                                    <br></br>
                                    <input className="btn btn-outline-success btn-sm" type='submit' value='Submit New Task'/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}