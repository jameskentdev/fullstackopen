import React from 'react';

const Total = (props) => {
    console.log(props);
    let total_exercises = 0;
    for (let i = 0; i < props.parts.length; i++) {
        total_exercises += props.parts[i].exercises;
    }

    return (
        <>
            <p>Number of exercises {total_exercises}</p>
        </>
    )
}

export default Total;