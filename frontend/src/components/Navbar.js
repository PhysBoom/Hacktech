import React from 'react';
import { Link } from 'react-router-dom';

/**
 * A navbar link element
 * @param {string} children: Text to display in the navlink
 * @param {string} to: What to redirect to on click.
 */
function NavLink(props){
    return (
       <Link to={props.to}>
            <span className="text-black text-2xl font-semibold hover:text-underline translate-all duration-200 hover:-translate-y-1">{props.children}</span>            
       </Link> 
    );
}
        

// Nav component
function Navbar(){
    return (
        <NavLink to="/">Test</NavLink>
    )
}

export default Navbar;