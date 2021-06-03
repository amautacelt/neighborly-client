import { Component } from "react";

export default class Login extends Component{
    state = {
        username: '',
        password: ''
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.login(this.state).then( res => this.props.history.push('/home'))
    }

    render(){
        return(
            <div>
                <form onSubmit={
                    (event) => this.handleSubmit(event)}>
                    <label>Username</label>
                    <input type='text' placeholder='username' name='username' 
                           value={this.state.username} onChange={(e) => this.handleChange(e)} />
                    <br></br>
                    <label>Password</label>
                    <input type='password' placeholder='password' name='password' 
                           value={this.state.password} onChange={(e) => this.handleChange(e)} />
                    <br></br>
                    <input type='submit' value='Submit'/>
                </form>
            </div>
        )
    }
}