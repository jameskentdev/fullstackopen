import React from 'react';

const Number = ({name, number}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{number}</td>
        </tr>
    )
}
export default Number;