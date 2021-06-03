import {Link} from 'react-router-dom'

const NavBar = (props) => {
    return(
        <div>
            <h1>Navigation Links</h1>
            <button><Link to='/tasks'> View All Tasks </Link></button>
            <button><Link to='/home'> Go to Profile </Link></button>
            {props.userLoggedIn ? <button><Link to='/'> Logout </Link></button> :<button><Link to='/login'> Login </Link></button>}
            
            <hr></hr>
        </div>
    )
}

export default NavBar;