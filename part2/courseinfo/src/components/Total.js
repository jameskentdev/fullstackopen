import React from 'react';

const Total = ({parts}) => {

    const calculateTotal = () => {
        return parts.reduce((prev, curr) => prev + curr.exercises, 0);
    }

    return (
        <div>
            <p><b>total of {calculateTotal()} exercises</b></p>
        </div>
    )
}

export default Total;