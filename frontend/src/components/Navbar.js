import React from "react";
import { Link } from 'react-router-dom';

/**
 * A black link for the navbar (simply black text)
 * @param {string} to - The path to link to
 * @param {function} children - The text to display
 */
function NavbarLink(props){
    return (
        <Link to={props.to}>
            <div className="text-white text-xl font-semibold hover:underline transform translate-y-0  relative transition-all duration-200 ease-in-out hover:cursor-pointer hover:-translate-y-1">{props.children}</div>
        </Link>
    );
}

function Navbar(){
    return (
        <div className="flex w-screen py-4 px-2 bg-primary items-center justify-center">
            <div className="flex flex-row items-center justify-between w-full max-w-1600">
                <div className="flex flex-row space-x-6 items-center">
                    <NavbarLink to="/"><h1 className="text-2xl font-bold">WordPath</h1></NavbarLink>
                    <NavbarLink to="/leaderboard"><span className="ml-3">Leaderboard</span></NavbarLink>
                    <NavbarLink to="/gamemodes">Gamemodes</NavbarLink>
                    <NavbarLink to="/register">Register</NavbarLink>
                </div>
                <div className="flex flex-row space-x-4 items-center">
                    <div className="bg-white border-2 border-black rounded-lg items-center justify-center px-2 py-1">
                        <span className="text-md text-black font-semibold">100 EXP</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;