import React from 'react';

const Person = ({name, number, handleOnClick}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{number}</td>
            <td>
                <button onClick={handleOnClick}>
                    delete
                </button>
            </td>
        </tr>
    )
}
export default Person;