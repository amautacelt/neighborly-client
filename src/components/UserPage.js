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
            <div>
                <h1>{this.state.user.username}</h1>
                <p><strong>Address: </strong>{this.state.user.address}</p>
                <img src={this.state.user.avatar} alt={'image of ' + this.state.user.username}/>
                <ul> <strong>Your Tasks</strong>
                    {this.props.userTasks.map(task => <li key={task.id}>{task.name}</li>)}
                     </ul>
            </div>
        )
    }
}

export default UserPage;