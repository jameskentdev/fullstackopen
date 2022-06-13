import React from 'react';

const Total = (props) => {
    let total_exercises = 0;
    for (let i = 0; i < props.exercises.length; i++) {
        total_exercises += props.exercises[i];
    }

    return (
        <div>
            <p>Number of exercises {total_exercises}</p>
        </div>
    )
}

export default Total;