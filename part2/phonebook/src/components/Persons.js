import React from 'react';
import Person from "./Person";

const Persons = ({persons, handleOnClick}) => {
    return (
        <div>
            <h2>Numbers</h2>
            <table>
                <tbody>
                    {persons.map(person =>
                        <Person
                            key={person.id}
                            name={person.name}
                            number={person.number}
                            handleOnClick={() => handleOnClick(person.id, person.name)} />
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Persons;