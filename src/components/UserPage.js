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
            <div>
                <h1>{this.state.user.username}</h1>
                <p><strong>Address: </strong>{this.state.user.address}</p>
                <img src={this.state.user.avatar} alt={'image of ' + this.state.user.username}/>
                <ul> <strong>Your Created Tasks</strong>
                    {this.props.userTasks.map(task => <li key={task.id}>{task.name}</li>)}
                </ul>
                <ul> <strong>Tasks You've Volunteered For</strong>
                    {this.props.volunteeredTasks.map(task => <li key={task.id}>{task.name}</li>)}
                </ul>
            </div>
        )
    }
}

export default UserPage;