import React from "react";

export function ButtonPrimary(props){
    return (
        <button className="bg-primary text-white font-bold py-2 px-4 rounded-lg transform translate-y-0 relative transition-all hover:cursor-pointer hover:-translate-y-1" onClick={props.onClick}>{props.children}</button>
    )
}