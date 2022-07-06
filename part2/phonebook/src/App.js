import { useState } from 'react'

const Person = ({person}) => {
  return (
    <div>{person.name} {person.number}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addNewPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
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

  const filterResults = persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      filter shown with
      <input onChange={(event) => setFilter(event.target.value)} />
      <h2>Numbers</h2>
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
        filterResults.map(person => <Person key={person.id} person={person} />)
      }
    </div>
  )
}

export default App
