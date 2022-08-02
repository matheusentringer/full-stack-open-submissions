import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ notification }) => {
  if (notification === null){
    return null
  }

  return (
    <div className={notification.type === 'success' ? 'success' : 'error'}>
      {notification.message}
    </div>
  )
}

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Person = ({ person, deletePerson }) => {
  return (
    <div>{person.name} {person.number} <Button text="Delete" handleClick={() => deletePerson(person)} /> </div>
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

const PersonList = ({ filterResults, deletePerson }) => (
  filterResults.map(person => <Person key={person.id} person={person} deletePerson={deletePerson} />)
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(personList => {
        setPersons(personList)
      })
  }, [])

  console.log('rendering ', persons.length, ' persons');

  const callNotification = (message, type) => {
    setNotification({
      message,
      type
    })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName,
      number: newNumber,
    }

    let person = persons.find(person => person.name.toUpperCase() === personObj.name.toUpperCase())

    if (person) {
      if (window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`)){
        personService
        .update(person.id, personObj)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
          setNewNumber('')
          setNewName('')
          callNotification(`${returnedPerson.name}'s number was changed to ${returnedPerson.number}`, 'success')
        })
        .catch(error => {
          callNotification(error.response.data.error, 'error')
        })
      }
    } else {
      personService
      .create(personObj)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewNumber('')
        setNewName('')
        callNotification(`${returnedPerson.name} was added to the phonebook`, 'success')
      })
      .catch(error => {
        callNotification(error.response.data.error, 'error')
      })
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)){
      personService
      .remove(person.id)
      .then(response => {
        console.log(response)
        setPersons(persons.filter(p => p.id !== person.id))
        callNotification(`${person.name} was removed from the phonebook`, 'success')
      })
      .catch((error) => {
        callNotification(`Information of ${person.name} has already been removed from the server`, 'error')
        setPersons(persons.filter(p => p.id !== person.id))
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
      <Notification notification={notification} />
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
      <PersonList filterResults={filterResults} deletePerson={deletePerson} />
    </div>
  )
}

export default App
