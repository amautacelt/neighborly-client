import {Link} from 'react-router-dom'

const NavBar = (props) => {
    return(
        // <nav className="navbar">
        //     <h1>NEIGHBORLY</h1>
        //     <div class="container-fluid">
        //         <ul className="navbar-nav">
        //             <li className="nav-item">
        //                 <button className="btn btn-outline-info btn-md"> <Link to='/tasks'> View All Tasks </Link> </button>
        //             </li>
        //             <li className="nav-item" >
        //                 <button className="btn btn-outline-info btn-md"> <Link to='/home'> Go to Profile </Link></button>
        //             </li>
        //             <li className="nav-item">
        //                 {props.userLoggedIn ? <button className="btn btn-outline-info btn-md"> <Link to='/'> Logout </Link></button> : <button className="btn btn-outline-info btn-md"> <Link to='/login'> Login </Link></button>}
        //             </li>
        //         </ul>
        //     </div>
        // </nav>

        <div class="jumbotron jumbotron-billboard">
            <div class="img">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <button className="btn btn-success btn-lg"> <Link className="text-dark" to='/tasks'> View All Tasks </Link> </button>
                                </li>
                                <li className="nav-item" >
                                    <button className="btn btn-success btn-lg"> <Link className="text-dark" to='/home'> Go to Profile </Link></button>
                                </li>
                                {/* <li className="nav-item">
                                    {props.userLoggedIn ? <button className="btn btn-outline-info btn-md"> <Link to='/'> Logout </Link></button> : <button className="btn btn-outline-info btn-md"> <Link to='/login'> Login </Link></button>}
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default NavBar;