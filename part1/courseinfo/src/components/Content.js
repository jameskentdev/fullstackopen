import React from 'react';

const Content = (props) => {

    let joinedArray = [];
    for (let i = 0; i < props.exercises.length; i++) {
        joinedArray.push({exercises: props.exercises[i], part: props.parts[i]});
    }

    return (
        <div>
            { joinedArray.map(function ({exercises, part}, index) {
                return <p key={index}>{part} {exercises} </p>
            })}
        </div>
    )
}

export default Content;