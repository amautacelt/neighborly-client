import {Link} from 'react-router-dom'

const NavBar = (props) => {
    return(
        <div>
            <h1>Navigation Links</h1>
            <Link to='/tasks'> View All Tasks </Link>
            <Link to={`/users/${props.user_id}`}> Go to Profile </Link>
            <hr></hr>
        </div>
    )
}

export default NavBar;