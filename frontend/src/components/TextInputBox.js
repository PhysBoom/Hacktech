import React from 'react';

/**
 * The basic input box for all forms, with a label and a text input (or select).
 * 
 * @param {string} inputName: The label to put on top of the input
 * @param {string} name: The actual name to pass to the input
 * @param {string} className: override for the input box class
 * @param {string} inputClassName: override for the input class
 * @param {string} errors: the errors to display
 * @param {Component[]} children: for select mainly, options. 
 * @returns 
 */
export function TextInputBox(props){
    return (
        <label style={{"width": props.width || "100%"}}>
            <span className={`${props.inputClassName || "text-gray-700"} `}>{props.inputName}</span>
            <input className={`${props.className} ${props.errors && "border-bright-red"} appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-dark-blue leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mt-1`} type={props.type} onChange={props.onChange} maxlength={props.maxlength} name={props.name} placeholder={props.placeholder} value={props.value}/>
            <span className="text-bright-red text-sm whitespace-pre">{props.errors}</span>
        </label>
    )
}

export default TextInputBox;