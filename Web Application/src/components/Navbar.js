import React from "react";
import { Link } from "react-router-dom";
/*<ul className="navbar-nav mr-auto">
                    
                    <li className="nav-item">
                        <Link to="/Signin"
                         className="nav-link" href="#">Sign in
                        </Link>
                    </li>
                    
                
                </ul>
                */

const Navbar = () =>{ 
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#">Administrator</a>
            

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    
                    <li className="nav-item">
                        <Link to ="/home" className="nav-link" href="#">Security Management </Link>
                    </li>
                    
                
                </ul>
                
            
            </div>
        </nav>
    );
};

export default Navbar;