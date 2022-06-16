import React from 'react';
import Number from "./Number";

const Numbers = ({persons}) => {
    return (
        <div>
            <h2>Numbers</h2>
            <table>
                <tbody>
                    {persons.map(person =>
                        <Number key={person.id} name={person.name} number={person.number} />
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Numbers;