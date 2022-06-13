import React from 'react';
import Part from "./Part";

const Content = (props) => {

    let joinedArray = [];
    for (let i = 0; i < props.exercises.length; i++) {
        joinedArray.push({exercises: props.exercises[i], part: props.parts[i]});
    }

    return (
        <div>
            { joinedArray.map(function ({exercises, part}, index) {
                return <Part key={index} part={part} exercises={exercises}/>
            })}
        </div>
    )
}

export default Content;