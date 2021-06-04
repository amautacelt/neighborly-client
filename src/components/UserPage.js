import { Component } from "react";

// const volunteersUrl = "http://localhost:3000/volunteers"

class UserPage extends Component {
    state = {
        user: this.props.user,
        // volunteeredTasks: []
    }
    
    componentDidMount(){
        this.props.getUserTasks();
        this.props.getVolunteeredTasks();
        // fetch(volunteersUrl)
        // .then(res => res.json())
        // .then(volunteeredTasks => {
        //     console.log(volunteeredTasks)
        //     const userVolunteeredTasks = volunteeredTasks.filter(task => task.user_id === this.state.user.id)
        //     console.log(userVolunteeredTasks)
        //     // this.setState({ volunteeredTasks: userVolunteeredTasks})
        //     }
        // )
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <div className="card bg-secondary" >
                            <div className="card-block">
                                <div>
                                    <h1 className="text-info">{this.state.user.username}</h1>
                                    <p><strong>Address: </strong>{this.state.user.address}</p>
                                    <img src={this.state.user.avatar} alt={'image of ' + this.state.user.username}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="card bg-dark text-white">
                            <div className="card-block">
                                <ul> <strong className="text-info">Your Tasks</strong>
                                    {this.props.userTasks.map(task => <li key={task.id}>{task.name}</li>)}
                                </ul>
                                <ul> <strong>Tasks You've Volunteered For</strong>
                                    {this.props.volunteeredTasks.map(task => <li key={task.id}>{task.name}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserPage;