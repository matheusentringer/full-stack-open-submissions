import { useState, useEffect } from 'react'
import personService from './services/persons'


const Person = ({ person }) => {
  return (
    <div>{person.name} {person.number}</div>
  )
}

const Filter = ({ handleFilterChange }) => (
  <div>filter shown with
    <input onChange={handleFilterChange} />
  </div>
)

const PersonForm = ({ addNewPerson, newName, handleNameInputChange, newNumber, handleNumberInputChange }) => (
  <form onSubmit={addNewPerson} >
    <div>
      name: <input value={newName} onChange={handleNameInputChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberInputChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const PersonList = ({ filterResults }) => (
  filterResults.map(person => <Person key={person.id} person={person} />)
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(personList => {
        setPersons(personList)
      })
  }, [])

  console.log('rendering ', persons.length, ' persons');

  const addNewPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName,
      number: newNumber,
    }

    if (persons.find(person => person.name.toUpperCase() === personObj.name.toUpperCase())) {
      alert(`${newName} is already added to phonebook`)
    } else {
      personService
      .create(personObj)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewNumber('')
        setNewName('')
      })
    }
  }

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
    console.log(newName)
  }

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value)
    console.log(newNumber)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filterResults = persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        addNewPerson={addNewPerson}
        newName={newName}
        handleNameInputChange={handleNameInputChange}
        newNumber={newNumber}
        handleNumberInputChange={handleNumberInputChange}
      />
      <h2>Numbers</h2>
      <PersonList filterResults={filterResults} />
    </div>
  )
}

export default App
