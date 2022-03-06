import React, {useContext} from "react";
import { Link } from 'react-router-dom';
import AuthContext from "../context/auth-context";
import {ButtonSecondary} from "../components/Buttons";
import {useHistory} from "react-router-dom";

function FooterLinks(props){
    return (
        <Link to={props.to}>
            <div className="text-white text-xl font-semibold hover:underline transform translate-y-0 relative transition-all duration-200 ease-in-out hover:cursor-pointer hover:-translate-y-1">{props.children}</div>
        </Link>
    );
}

function Footer(){
    return (
        <div className="flex w-screen py-4 px-2 bg-primary items-center justify-center bottom-1">
            <div className="flex flex-row items-center justify-between w-full max-w-1200">
                <div className="flex flex-row justify-center space-x-6 items-center w-full">
                    <h1 className="text-white">Made by Dhruv Kulkarni and Matthew Chak, 2022</h1>
                </div>
            </div>
        </div>
    );
}

export default Footer;