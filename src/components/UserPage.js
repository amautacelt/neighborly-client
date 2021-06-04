import { Component } from "react";

class UserPage extends Component {
    state = {
        user: this.props.user
    }
    
    componentDidMount(){
        this.props.getUserTasks();
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserPage;