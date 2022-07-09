import { useState, useEffect } from "react";
import personService from "./services/persons";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notification, setNotification] = useState({
    message: "",
    error: false,
  });

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChanged = (event) => {
    setNewFilter(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter)
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const foundPerson = persons.find(
      (person) => person.name === personObject.name
    );

    if (foundPerson !== undefined) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with the new one?`
        )
      ) {
        const updatedPersonObject = {
          ...foundPerson,
          number: newNumber,
        };

        personService
          .update(updatedPersonObject.id, updatedPersonObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== updatedPersonObject.id ? person : returnedPerson
              )
            );
          })
          .catch(() => {
            const message = {
              message: `Information of ${updatedPersonObject.name} has already been removed from the server`,
              error: true,
            };
            setNotification(message);
            setTimeout(() => {
              const message = {
                message: "",
                error: true,
              };
              setNotification(message);
            }, 3000);
          });
      }
    } else {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        const message = {
          message: `Added ${returnedPerson.name}`,
          error: false,
        };
        setNotification(message);
        setTimeout(() => {
          const message = {
            message: "",
            error: true,
          };
          setNotification(message);
        }, 3000);
      });
    }
  };

  const handleOnClick = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id).then((response) => {
        console.log(response);
        setPersons(persons.filter((n) => n.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter newFilter={newFilter} handleFilterChanged={handleFilterChanged} />

      <h2>Add a new</h2>

      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Persons persons={filteredPersons} handleOnClick={handleOnClick} />
    </div>
  );
};

export default App;
