import {useState} from 'react'
import Numbers from "./components/Numbers";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChanged = (event) => {
        setNewFilter(event.target.value)
    }

    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter))

    const handleSubmit = (event) => {
        event.preventDefault()
        const personObject = {
            id: persons.length + 1,
            name: newName,
            number: newNumber,
        }

        const person = persons.find(person => person.name === personObject.name)
        if (person !== undefined) {
            alert(`${newName} is already in the phonebook`)
        } else {
            setPersons(persons.concat(personObject))
            setNewName('')
            setNewNumber('')
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter
                newFilter={newFilter}
                handleFilterChanged={handleFilterChanged}
            />

            <h2>Add a new</h2>

            <PersonForm
                handleSubmit={handleSubmit}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />
            <Numbers persons={filteredPersons}/>
        </div>
    )
}

export default App