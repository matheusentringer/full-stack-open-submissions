import { useState } from 'react'

const Person = ({person}) => {
  return (
    <div>{person.name} {person.number}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '4002-8922'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addNewPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName,
      number: newNumber
    }

    if (persons.find(person => person.name.toUpperCase() === personObj.name.toUpperCase())) {
      alert(`${newName} is already added to phonebook`)
    }else{
      setPersons(persons.concat(personObj))
      setNewNumber('')
      setNewName('')
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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      {
        persons.map(person => <Person key={person.name} person={person} />)
      }
    </div>
  )
}

export default App
