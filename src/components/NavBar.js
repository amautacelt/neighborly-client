import {Link} from 'react-router-dom'

const NavBar = (props) => {
    return(
        <nav className="navbar">
            <h1>NEIGHBORLY</h1>
            <div class="container-fluid">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <button className="btn btn-outline-info btn-md"> <Link to='/tasks'> View All Tasks </Link> </button>
                    </li>
                    <li className="nav-item" >
                        <button className="btn btn-outline-info btn-md"> <Link to='/home'> Go to Profile </Link></button>
                    </li>
                    <li className="nav-item">
                        {props.userLoggedIn ? <button className="btn btn-outline-info btn-md"> <Link to='/'> Logout </Link></button> : <button className="btn btn-outline-info btn-md"> <Link to='/login'> Login </Link></button>}
                    </li>
                </ul>
            </div>
        </nav>

        // <div className="nav">
        //     {/* <h1>Navigation Links</h1> */}
        //     <li className="nav-item">
        //         <button className="nav-link"> <Link to='/tasks'> View All Tasks </Link></button>
        //     </li>
        //     <li className="nav-item">
        //         <button> <Link to='/home'> Go to Profile </Link></button>
        //     </li>
        //     <li className="nav-item">
        //         {props.userLoggedIn ? <button> <Link to='/'> Logout </Link></button> : <button> <Link to='/login'> Login </Link></button>}
        //     </li>

        //     <hr></hr>
        // </div>
    )
}

export default NavBar;