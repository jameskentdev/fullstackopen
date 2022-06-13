import React from 'react';
import Part from "./Part";

const Content = (props) => {

    return (
        <>
            { props.parts.map((obj, index) => {
                return <Part key={index} name={obj.name} exercises={obj.exercises}/>
            })}
        </>
    )
}

export default Content;